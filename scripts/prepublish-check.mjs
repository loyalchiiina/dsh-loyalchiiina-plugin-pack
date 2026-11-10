#!/usr/bin/env node
/**
 * prepublish-check.mjs — 公开发布「门禁」，与 strip-private.mjs 配对使用。
 *
 * 为什么需要它
 *   本地开发树里多挂了一条私有组件（源码不进 npm、只靠本机 junction 解析）。
 *   公开发布前必须由 strip-private.mjs 把它剥离掉。但「记得跑 strip」是人的事，
 *   靠不住；本脚本把「剥离后应当为空」变成机器断言，让发版前多一道硬闸。
 *
 * 两条断言（任一失败即禁止发布）
 *   A. patch yml 里私有组件 id 出现次数 = 0
 *   B. 敏感串在「即将进包的文件」里命中 = 0
 *
 * 「即将进包的文件」怎么判定
 *   - 读 package.json 的 `files` 白名单，展开其中的目录与 * / ** 通配；
 *   - 没有 `files` 字段时，退化为「目录内非 node_modules / 非 .git / 非 .private-build 的文件」；
 *   - 再按文本扩展名过滤（.md .yml .js .mjs … ），但 cordis.patch.yml / package.json /
 *     README.md 这类「点名文件」无论扩展名如何都必查。
 *
 * 与 strip-private.mjs 的配对关系（缺一不可）
 *   strip-private  = 生产者，产出剥离后的可发布副本（.private-build/stage）
 *   prepublish-check = 验收者，对「准备发布的那份」断言 A/B 全零
 *   正确顺序：strip → 对本工作树检查（此处**应当 FAIL**，因为本地仍有私有组件）
 *             → 对剥离产物 .private-build/stage 检查（此处**应当 PASS**）→ 才能发布
 *
 * 用法
 *   node scripts/prepublish-check.mjs                              # 检查当前工作树（本地含私有组件 → 应 FAIL）
 *   node scripts/prepublish-check.mjs --dir .private-build/stage   # 检查剥离后的发布副本（应 PASS）
 *   node scripts/prepublish-check.mjs --dir . --json               # 机器可读输出
 *
 * 退出码：0 = A/B 全过（允许发布）；1 = 有断言失败（禁止发布）；2 = 用法或环境错误。
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { resolve, join, relative, extname, sep } from 'node:path'

/** 把片段拼成完整串：让本脚本源码自身不含任何字面敏感串（否则它会被自己抓） */
const S = (...parts) => parts.join('')

// ── 断言 A 的唯一对象：私有组件的 patch entry id ────────────────────────────
const PRIVATE_PATCH_ID = S('suite-', 'skill-guard')

// ── 断言 B 的敏感串清单（片段拼接，逐条可读）─────────────────────────────────
const SENSITIVE_STRINGS = [
  S('nhtpul', 'fn'),
  S('C:', '\\Users'),
  S('E:', '\\DSH', 'skills-test'),
  S('E:', '\\DSH', 'skills'),
  S('_库', '\\台账'),
  S('SKILL', '-INDEX'),
  S('_dev-experien', 'ce-inbox'),
  PRIVATE_PATCH_ID,
]

/** 参与文本 grep 的扩展名（覆盖 tasks 点名的 .md/.yml/.js/.mjs，并含同族的 json/svg 等） */
const TEXT_EXTS = new Set([
  '.md', '.markdown', '.yml', '.yaml', '.js', '.mjs', '.cjs',
  '.json', '.svg', '.txt', '.html', '.css', '.ts',
])

/** 不论扩展名、不看白名单写法，这些文件必须被检查 */
const ALWAYS_CHECK = new Set([
  'cordis.patch.yml',
  'cordis.patch.public.yml',
  'package.json',
  'package.public.json',
  'README.md',
])

/** 遍历白名单时跳过的目录（构建产物不算「即将进包」） */
const SKIP_DIRS = new Set(['node_modules', '.git', '.private-build'])

const MAX_BYTES = 2 * 1024 * 1024
const EXCERPT = 120

// ── 参数 ────────────────────────────────────────────────────────────────────
function parseArgs(argv) {
  const out = { dir: process.cwd(), json: false, help: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--dir' || a === '-d') {
      const v = argv[++i]
      if (!v) throw new Error('--dir 需要一个目录参数')
      out.dir = resolve(v)
    } else if (a === '--json') {
      out.json = true
    } else if (a === '--help' || a === '-h') {
      out.help = true
    } else {
      throw new Error(`未知参数：${a}`)
    }
  }
  return out
}

// ── 文件收集 ────────────────────────────────────────────────────────────────
function walkFiles(dir, acc = []) {
  let entries
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    return acc
  }
  for (const e of entries) {
    const p = join(dir, e.name)
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue
      walkFiles(p, acc)
    } else if (e.isFile()) {
      acc.push(p)
    }
  }
  return acc
}

function globToRe(glob) {
  let re = ''
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i]
    if (c === '*') {
      if (glob[i + 1] === '*') {
        re += '.*'
        i++
      } else {
        re += '[^/]*'
      }
    } else if ('\\^$.|?+()[]{}'.includes(c)) {
      re += '\\' + c
    } else {
      re += c
    }
  }
  return new RegExp('^' + re + '$')
}

/** 展开 package.json 的 files 白名单 → 真实文件绝对路径 */
function expandWhitelist(dir, patterns) {
  const out = new Set()
  const missing = []
  for (const raw of patterns) {
    if (typeof raw !== 'string' || !raw.trim()) continue
    const pat = raw.trim().replace(/\\/g, '/').replace(/^\.\//, '').replace(/\/+$/, '')
    if (!pat) continue
    if (pat.includes('*')) {
      const re = globToRe(pat)
      let hit = 0
      for (const f of walkFiles(dir)) {
        const rel = relative(dir, f).split(sep).join('/')
        if (re.test(rel)) {
          out.add(f)
          hit++
        }
      }
      if (!hit) missing.push(raw)
    } else {
      const p = join(dir, pat)
      if (!existsSync(p)) {
        missing.push(raw)
        continue
      }
      const st = statSync(p)
      if (st.isDirectory()) for (const f of walkFiles(p)) out.add(f)
      else out.add(p)
    }
  }
  return { files: [...out], missing }
}

function pickFirst(dir, names) {
  for (const n of names) {
    const p = join(dir, n)
    if (existsSync(p) && statSync(p).isFile()) return p
  }
  return null
}

/** 判定「即将进包的文件」清单 */
function collectTargets(dir) {
  const pkgPath = pickFirst(dir, ['package.json', 'package.public.json'])
  const notes = []
  let files = []
  let source = ''

  if (pkgPath) {
    let pkg = null
    try {
      pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
    } catch (err) {
      throw new Error(`package.json 解析失败（${pkgPath}）：${err.message}`)
    }
    const wl = Array.isArray(pkg.files) ? pkg.files : null
    if (wl) {
      source = `${pkgPath} 的 files 白名单`
      files = expandWhitelist(dir, wl).files
    } else {
      source = `目录内非 node_modules/.git/.private-build 的文件（package.json 无 files 字段）`
      files = walkFiles(dir)
    }
  } else {
    if (!existsSync(dir)) throw new Error(`目录不存在：${dir}`)
    source = `目录内非 node_modules/.git/.private-build 的文件（未找到 package.json）`
    files = walkFiles(dir)
  }

  const scanned = []
  const skipped = []
  for (const f of files) {
    const base = f.split(/[\\/]/).pop()
    const keep = ALWAYS_CHECK.has(base) || TEXT_EXTS.has(extname(base).toLowerCase())
    if (!keep) continue
    const rel = relative(dir, f).split(sep).join('/')
    const st = statSync(f)
    if (st.size > MAX_BYTES) {
      skipped.push({ file: rel, reason: `>${MAX_BYTES} bytes` })
      continue
    }
    const buf = readFileSync(f)
    if (buf.subarray(0, Math.min(4096, buf.length)).includes(0)) {
      skipped.push({ file: rel, reason: 'binary' })
      continue
    }
    let text = buf.toString('utf8')
    if (text.charCodeAt(0) === 0xfeff) text = text.slice(1)
    scanned.push({ rel, abs: f, text, bytes: st.size })
  }

  notes.push(...skipped.map((s) => `跳过 ${s.file}（${s.reason}）`))
  return { pkgPath, ymlPath: pickFirst(dir, ['cordis.patch.yml', 'cordis.patch.public.yml']), scanned, source, notes }
}

// ── 扫描工具 ────────────────────────────────────────────────────────────────
function linesOf(text) {
  return text.split(/\r?\n/)
}

function countOccurrences(text, needle) {
  let n = 0
  let i = 0
  for (;;) {
    const at = text.indexOf(needle, i)
    if (at === -1) break
    n++
    i = at + needle.length
  }
  return n
}

function excerpt(s) {
  const t = s.trim()
  return t.length > EXCERPT ? t.slice(0, EXCERPT) + '…' : t
}

// ── 主流程 ──────────────────────────────────────────────────────────────────
function main() {
  let args
  try {
    args = parseArgs(process.argv.slice(2))
  } catch (err) {
    console.error(`[prepublish-check] ${err.message}`)
    return 2
  }
  if (args.help) {
    console.log('用法: node scripts/prepublish-check.mjs [--dir <目录>] [--json]')
    console.log('  --dir   被检查的包目录（默认 process.cwd()）')
    console.log('  --json  以 JSON 输出结论')
    return 0
  }

  let targets
  try {
    targets = collectTargets(args.dir)
  } catch (err) {
    console.error(`[prepublish-check] 环境错误：${err.message}`)
    return 2
  }

  if (!targets.ymlPath) {
    console.error(
      `[prepublish-check] 环境错误：在 ${args.dir} 下找不到 cordis.patch.yml（或 cordis.patch.public.yml）；` +
        '断言 A 无对象可查。若要检查剥离产物，请指向 .private-build/stage。',
    )
    return 2
  }

  // ---- 断言 A：私有组件在 patch yml 中出现次数 = 0 ----
  const ymlText = readFileSync(targets.ymlPath, 'utf8').replace(/^\uFEFF/, '')
  const ymlRel = relative(args.dir, targets.ymlPath).split(sep).join('/')
  const hitsA = []
  let countA = 0
  linesOf(ymlText).forEach((line, idx) => {
    const n = countOccurrences(line, PRIVATE_PATCH_ID)
    if (n > 0) {
      countA += n
      hitsA.push({ file: ymlRel, line: idx + 1, text: excerpt(line) })
    }
  })
  const okA = countA === 0

  // ---- 断言 B：敏感串在「即将进包的文件」里零命中 ----
  const hitsB = []
  const perString = []
  for (const needle of SENSITIVE_STRINGS) {
    let total = 0
    for (const f of targets.scanned) {
      linesOf(f.text).forEach((line, idx) => {
        const n = countOccurrences(line, needle)
        if (n > 0) {
          total += n
          hitsB.push({ string: needle, file: f.rel, line: idx + 1, text: excerpt(line) })
        }
      })
    }
    perString.push({ string: needle, count: total })
  }
  const countB = hitsB.length
  const okB = countB === 0

  const verdict = okA && okB ? 'PASS' : 'FAIL'

  // ---- 输出 ----
  if (args.json) {
    const payload = {
      dir: args.dir,
      patchYml: ymlRel,
      packagesScanned: targets.scanned.map((f) => f.rel),
      targetSource: targets.source,
      assertA: { check: `patch yml 中「${PRIVATE_PATCH_ID}」出现次数 = 0`, count: countA, pass: okA, hits: hitsA },
      assertB: { check: '敏感串命中 = 0', count: countB, pass: okB, perString, hits: hitsB },
      notes: targets.notes,
      verdict,
    }
    console.log(JSON.stringify(payload, null, 2))
    console.log(`PREPUBLISH-CHECK: ${verdict}`)
    return verdict === 'PASS' ? 0 : 1
  }

  console.log(`[prepublish-check] dir       : ${args.dir}`)
  console.log(`[prepublish-check] patch yml : ${ymlRel}`)
  console.log(`[prepublish-check] pkg json  : ${targets.pkgPath || '(未找到)'}`)
  console.log(`[prepublish-check] 目标来源  : ${targets.source}`)
  console.log(`[prepublish-check] 扫描文件  : ${targets.scanned.length} 个`)
  for (const f of targets.scanned) console.log(`                     - ${f.rel}`)
  for (const n of targets.notes) console.log(`[prepublish-check] 附注      : ${n}`)

  console.log('')
  console.log('── 断言 A：私有组件在 patch yml 中出现次数 = 0 ──')
  console.log(`  ${ymlRel} 中「${PRIVATE_PATCH_ID}」出现 ${countA} 次（要求 0）  → ${okA ? 'PASS' : 'FAIL'}`)
  for (const h of hitsA) console.log(`    ${h.file}:${h.line}  ${h.text}`)

  console.log('')
  console.log('── 断言 B：敏感串在即将进包的文件里命中 = 0 ──')
  console.log(`  清单 ${SENSITIVE_STRINGS.length} 条，命中 ${countB} 处（要求 0）  → ${okB ? 'PASS' : 'FAIL'}`)
  for (const h of hitsB) console.log(`    [${h.string}] ${h.file}:${h.line}  ${h.text}`)
  if (okB) {
    console.log(`  逐条计数：${perString.map((p) => `${p.string}=${p.count}`).join('  ')}`)
  }

  console.log('')
  console.log(`  断言 A = ${okA ? 'PASS' : 'FAIL'}（${countA} 次命中，要求 0）`)
  console.log(`  断言 B = ${okB ? 'PASS' : 'FAIL'}（${countB} 处命中，要求 0）`)
  if (verdict === 'FAIL') {
    console.log('  处置：先跑 node scripts/strip-private.mjs --stage，再对 .private-build/stage 复检；')
    console.log('        本地工作树含私有组件时，本门禁必定 FAIL —— 这正是它存在的意义。')
  }
  console.log(`PREPUBLISH-CHECK: ${verdict}`)
  return verdict === 'PASS' ? 0 : 1
}

process.exit(main())
