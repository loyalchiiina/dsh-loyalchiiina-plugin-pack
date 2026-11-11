# dsh-loyalchiiina-plugin-pack

仓库：[loyalchiiina/dsh-loyalchiiina-plugin-pack](https://github.com/loyalchiiina/dsh-loyalchiiina-plugin-pack) · 欢迎 Star ⭐

DSH（DeepSeek Harness）**插件聚合 bundle 包**：一条安装命令把 15 个独立插件一起挂上，也可以只挑其中一个单独装。

- 本包**自身不含任何行为**：`lib/index.js` 只有 `export {}`，不注册服务 / 工具 / 路由 / UI。
- 全部功能来自 `cordis.patch.yml`（`dsh.bundle.patch`）里 `insert:` 的 15 个独立 npm 子包。
- 适配 DSH 内核 `0.2.2-rc.1`。

> 形态参考：官方 `@deepseek-ai/dsh-experimental-agent-team-profile`（同样是「bundle 包 = 一份 patch + 一份 dependencies」，`lib/index.js` 只有 `export {}`）。

> **私有组件说明**：本仓库的开发副本里还挂了第 16 个私有组件 `dsh-skill-guard`（GitHub private，仅作者本机可用）。它**不发布到 npm，也不包含在公开安装包内**；公开用户安装到的始终是上表 15 个组件。因此作者本机详情页可能显示 16 个，公开用户看到 15 个，属预期差异。

---

## 一、包含的 15 个组件

| # | 包名 | 作用（简述） | 聚合条目 id | GitHub / Star |
|---|---|---|---|---|
| 1 | `dsh-artifact-linker` | 产物路径联动：常驻注入「产物路径铁律」+ 正文文件名渲染成可点芯片（侧栏预览 / 系统默认程序打开 / 复制绝对路径） | `suite-artifact-linker` | [loyalchiiina/dsh-artifact-linker](https://github.com/loyalchiiina/dsh-artifact-linker) · ⭐ 2 |
| 2 | `dsh-browser-hub` | 侧边栏浏览器增强：搜索引擎选择、书签收藏、多级文件夹、导入 360/Chrome 书签 | `suite-browser-hub` | [loyalchiiina/dsh-browser-hub](https://github.com/loyalchiiina/dsh-browser-hub) · ⭐ 1 |
| 3 | `dsh-chat-image-lightbox` | 对话图片灯箱：全屏缩放/平移/下载/翻页、缩略图网格、TIFF·HEIC 转码、防盗链自动转存，并注入「图片投递铁律」 | `suite-chat-image-lightbox` | [loyalchiiina/dsh-chat-image-lightbox](https://github.com/loyalchiiina/dsh-chat-image-lightbox) · ⭐ 2 |
| 4 | `dsh-console-sentinel` | 控制台哨兵（Windows）：一键清理任务栏控制台窗口与空壳，预览后执行、持久白名单、DSH 宿主与 Fluent/MPI 求解器硬保护 | `suite-console-sentinel` | [loyalchiiina/dsh-console-sentinel](https://github.com/loyalchiiina/dsh-console-sentinel) · ⭐ 0 |
| 5 | `dsh-deepseek-web-free` | 非官方 DeepSeek 网页端提供方：把网页端当模型用 + 内嵌网页面板（侧栏标签 / 鲸鱼悬浮球） | `suite-deepseek-web-free` | [loyalchiiina/dsh-deepseek-web-free](https://github.com/loyalchiiina/dsh-deepseek-web-free) · ⭐ 4 |
| 6 | `dsh-font-enhancer` | 字体 DIY：「字」悬浮球 + 分区独立调字体/颜色/字号/行高，方案管理、8 款字体、130 款皮肤 | `suite-font-enhancer` | [loyalchiiina/dsh-font-enhancer](https://github.com/loyalchiiina/dsh-font-enhancer) · ⭐ 5 |
| 7 | `dsh-lit-fetch` | 学术文献检索与 PDF 下载：DOI(Crossref)·关键词(OpenAlex) 检索，8 个 Sci-Hub 镜像 + Unpaywall 兜底，生成批量获取清单 HTML | `suite-lit-fetch` | [loyalchiiina/dsh-lit-fetch](https://github.com/loyalchiiina/dsh-lit-fetch) · ⭐ 1 |
| 8 | `dsh-skill-browser` | 技能浏览器：把技能库变成可浏览/检索/治理的资产（浏览、调用台账、MCP 管理、快速上手 + 130 款皮肤） | `suite-skill-browser` | [loyalchiiina/dsh-skill-browser](https://github.com/loyalchiiina/dsh-skill-browser) · ⭐ 1 |
| 9 | `dsh-agent-team-auto-orchestrator` | 智能体团队自动编排：每轮常驻注入团队编排铁律 + 工具层硬门（只认真派活） | `suite-agent-team-auto-orchestrator` | [loyalchiiina/dsh-agent-team-auto-orchestrator](https://github.com/loyalchiiina/dsh-agent-team-auto-orchestrator) · ⭐ 2 |
| 10 | `dsh-todo-float-ball` | Todo 悬浮球：实时显示当前会话 `todo_write` 进度环与清单，可多会话并排、130 款共享皮肤 | `suite-todo-float-ball` | [loyalchiiina/dsh-todo-float-ball](https://github.com/loyalchiiina/dsh-todo-float-ball) · ⭐ 1 |
| 11 | `dsh-voice-alert` | 语音提醒：回合结束自动播报「完成 / 失败」，内置 20 个音效（零配置），可克隆音色 | `suite-voice-alert` | [loyalchiiina/dsh-voice-alert](https://github.com/loyalchiiina/dsh-voice-alert) · ⭐ 2 |
| 12 | `dsh-archive-favorites-forge` | 对话收藏与归档工坊：收藏任意会话、复制 session id 与 transcript 绝对路径、单条永久删除（带守卫）、按闲置 N 小时批量归档、过滤/导出清单 | `suite-archive-favorites-forge` | [loyalchiiina/dsh-archive-favorites-forge](https://github.com/loyalchiiina/dsh-archive-favorites-forge) · ⭐ 1 |
| 13 | `dsh-model-fold` | 三级级联模型面板：来源 / 模型 / 强度三列并排，识图与思考开关，逐模型真实测活 | `suite-model-fold` | [loyalchiiina/dsh-model-fold](https://github.com/loyalchiiina/dsh-model-fold) · ⭐ 3 |
| 14 | `dsh-schedule-calendar` | 日程中心：侧边栏日程表、多城市天气、节假日、提醒、工作待办、休息日与上下班倒计时 | `suite-schedule-calendar` | [loyalchiiina/dsh-schedule-calendar](https://github.com/loyalchiiina/dsh-schedule-calendar) · ⭐ 0 |
| 15 | `dsh-sidebar-media-player` | 侧边栏音视频播放器：统一播放 mp4/webm/mov/m4v/ogv 与 mp3/wav/flac/ogg/opus/m4a/aac，拖动进度条（Range 206）、实时频谱与音准、字幕/歌词 | `suite-sidebar-media-player` | [loyalchiiina/dsh-sidebar-media-player](https://github.com/loyalchiiina/dsh-sidebar-media-player) · ⭐ 0 |

> Star 数为 2026-11-12 抓取快照；点仓库链接可直接 Star。
> 版本口径以 `package.json` 的 `dependencies` 为准：15 个子包全部取自 **npm 已发布版本**（caret 范围），不含任何 `link:` / `file:` 本地路径依赖。

---

## 二、怎么装

### 方式 A · 装整包（15 个一起）

```powershell
# 只做依赖安装（不改任何 profile 配置）
pnpm add dsh-loyalchiiina-plugin-pack
```

要真正挂进 DSH，还需要把聚合包列进 **profile 的 `dsh.profile.bundles`**（它的 `dsh.bundle.patch` 才会被合并）：

```json
// ~/.dsh/profiles/<profile>/package.json
"dsh": {
  "profile": {
    "bundles": ["dsh-loyalchiiina-plugin-pack"]
  }
}
```

> 桌面端（desktop profile）由 Electron 独占管理，CLI 直接拒绝 `dsh plugin --profile desktop`，只能手改 `profiles/desktop/package.json` 后用 pnpm 安装。

### 方式 B · 只装其中一个

聚合包不是必需的中间层。想只要某几个能力，直接单独装对应子包：

```powershell
pnpm add dsh-todo-float-ball
```

然后把**该子包自己的包名**（不是 `suite-*`）列进 `dsh.profile.bundles` —— 因为每个子包自带 `dsh.bundle.patch`，可以独立安装、独立启用。

### 🔴 不要同时启用两者

同一个 profile 里**不要**把 `dsh-loyalchiiina-plugin-pack` 和它包含的某个子包**同时**列进 `dsh.profile.bundles`：那样同一个插件会被两个 bundle 层各挂一次，插件会注册两遍。
（entry id 因为统一加了 `suite-` 前缀而不会撞 `duplicate loader entry id`，但重复注册本身仍然是错的。）

### 改完怎么生效

| 改动位置 | 生效方式 |
|---|---|
| `package.json` / `cordis.patch.yml` / profile 的 bundles 与 node_modules / 预设 | **彻底退出 DSH 客户端再启动**（宿主是 Node 进程，没有热重载） |
| 子包的 `lib/client.js`（客户端 bundle） | 装好后 **Ctrl+Shift+R 硬刷新**（Ctrl+R 只从内存缓存重载，会让人误判「改了没用」） |

---

## 三、组件开关（可开关）

层顺序为 `bundle:*` → `user-patch` → `home-patch`，后层按 id **last-wins** 覆盖。因此关掉单个组件有两条路：

**① 在 profile 的 `cordis.patch.yml` 里按 entry id 关掉（推荐，改动可逆、不进包）**

```yaml
- id: suite-voice-alert
  disabled: true
```

**② 直接改本包 `cordis.patch.yml`** 给对应条目加 `disabled: true`（等价于「插件默认关闭」）。

**调参**：本包**不写任何 `config:` 覆盖**，15 个组件一律跑各自默认值。要调参数，在 profile 层按 entry id 追加 `config:`，字段名参考各子包自己的 `cordis.patch.yml` / README。

---

## 四、目录结构

```
dsh-loyalchiiina-plugin-pack/
├── package.json          # dsh.bundle.patch + 15 个 dependencies
├── cordis.patch.yml      # dsh.bundle.patch 指向它：- insert: 15 条 entry
├── lib/
│   └── index.js          # export {} —— 聚合包不是插件
├── locale/
│   ├── zh.json
│   └── en.json
├── icon.svg
├── README.md
└── README_EN.md
```

---

## 五、bundle 规范要点（为什么长这样）

1. **聚合包声明 `dsh.bundle.patch`**：`package.json` 的 `dsh.bundle.patch` 指向 `cordis.patch.yml`，DSH 依据它把 entry 插进 loader。缺这一项会被判 `declares no dsh.bundle`。
2. **聚合包自己不是插件**：没有 `apply` / `inject`，`lib/index.js` 只有 `export {}`；聚合包本身不会被当成 entry 加载（它不出现在自己的 `insert:` 列表里）。
3. **子包各自独立可装**：15 个子包都各自声明了 `dsh.bundle.patch`（这是它们能单独安装的前提）。所以「聚合」不等于「子包不能单独用」，也不等于要删掉子包的 bundle 声明。
4. **entry id 唯一且不与子包冲突**：子包自带 patch 的 id 就是**自己的包名**，所以本包统一用 `suite-<短名>`，任何情况下都不会与子包 id 相同，从根上避免 `duplicate loader entry id`。
5. **一个组件一条 entry**：15 条 entry ↔ 15 个组件，`name` 一律写子包名（不写路径、不写版本号）。
6. **无 BOM**：`package.json` / `cordis.patch.yml` / `lib/index.js` / locale 全部 UTF-8 **无 BOM**（BOM 会让 JSON/YAML 解析当场失败）。

---

## 六、版本策略

- 聚合包自身版本 `0.2.1`；子包用 **caret 范围**（`^x.y.z`），允许补丁级更新。
- 聚合包**不锁死**子包版本：修 bug 直接 `pnpm update` 即可，不必等聚合包发版。
- 子包出现 breaking change 时，聚合包升 **minor** 并在 CHANGELOG 写清影响。

## 七、状态与许可

- 当前版本 `0.2.1`。
- License: MIT。

---

## 八、发布前必跑（维护者）

本仓库的本地开发树里额外挂了一条**本地私有组件**（源码不进 npm，只靠本机目录联结合成解析）。发布副本里绝不能带它，否则 npm 用户会加载到一个不存在的包。为此本仓库带两个脚本，**缺一不可**：

| 顺序 | 命令 | 角色 | 作用 |
|---|---|---|---|
| 1 | `node scripts/strip-private.mjs --stage` | **剥离** | 从 `cordis.patch.yml` / `package.json` 删掉那条私有 entry，产出可发布副本 `.private-build/stage/`（只写新目录，绝不改本地原件） |
| 2 | `node scripts/prepublish-check.mjs --dir .private-build/stage` | **门禁** | 断言 A：patch yml 里私有组件 entry id 出现次数 = 0；断言 B：敏感串（本机用户名、本机绝对路径、私有组件名等，清单见脚本 `SENSITIVE_STRINGS`）在「即将进包的文件」里命中 = 0 处 |

**只有第 2 步输出 `PREPUBLISH-CHECK: PASS`（退出码 0）才允许发版**；输出 `FAIL`（退出码 1）即硬性禁止发布，先回到第 1 步。

- 「即将进包的文件」= `package.json` 的 `files` 白名单展开后的文本文件，脚本会把实际扫描清单逐行打印出来供核对。
- 想先自查本地工作树，可跑 `node scripts/prepublish-check.mjs --dir .`：本地私有组件仍在，**这一步预期输出 `FAIL`** —— 不是脚本坏了，而正是门禁生效的证据：它只对「剥离后的发布副本」放行。
- 两个脚本只随本 GitHub 仓库分发（不在 npm 包的 `files` 白名单内），npm 用户拿到的包不含维护脚本。

> 剥离与门禁是**两个动作**：`strip-private` 负责产出干净的发布副本，`prepublish-check` 负责证明它真的干净。只跑前者、不跑后者，等于「改了但没验」。

---

## English

`dsh-loyalchiiina-plugin-pack` is an **aggregate bundle package** for DSH (DeepSeek Harness): install 15 standalone DSH plugins with one command, or pick any single one on its own.

- The bundle itself ships **no behaviour**: `lib/index.js` is only `export {}` — no services, tools, routes or UI.
- All functionality comes from the 15 child packages inserted by `cordis.patch.yml` (declared as `dsh.bundle.patch`).
- The bundle declares `dependencies` on published npm versions only (caret ranges), never `link:` / `file:` paths.
- Every child package carries its own `dsh.bundle.patch`, so each one can still be installed and enabled independently.
- Bundle entry ids use the `suite-<short-name>` prefix so they can never collide with a child package's own entry id (`duplicate loader entry id`).
- No `config:` overrides are set here: all 15 components run their default configuration. Disable one by its entry id in the profile's `cordis.patch.yml`.
- Adapts DSH kernel `0.2.2-rc.1`.

**Install**

```powershell
pnpm add dsh-loyalchiiina-plugin-pack
```

Then list it in the profile's `dsh.profile.bundles` array so its `dsh.bundle.patch` gets merged. Changes to `package.json` / `cordis.patch.yml` / profile bundles take effect after a **full DSH client restart**; a child package's client bundle only needs a **Ctrl+Shift+R** hard refresh.

| # | Package | What it does | Bundle entry id |
|---|---|---|---|
| 1 | `dsh-artifact-linker` | Turns declared artifact paths into one-click chips; resident absolute-path rules | `suite-artifact-linker` |
| 2 | `dsh-browser-hub` | Sidebar browser upgrade: search engines, bookmarks, folders, 360/Chrome bookmark import | `suite-browser-hub` |
| 3 | `dsh-chat-image-lightbox` | Full-screen image lightbox, thumbnail grid, TIFF/HEIC transcoding, delivery rule | `suite-chat-image-lightbox` |
| 4 | `dsh-console-sentinel` | Windows console-window sentinel: preview-then-close, whitelist, solver protection | `suite-console-sentinel` |
| 5 | `dsh-deepseek-web-free` | Unofficial DeepSeek Web provider + embedded web panel | `suite-deepseek-web-free` |
| 6 | `dsh-font-enhancer` | Per-region font/colour/line-height DIY with presets and themes | `suite-font-enhancer` |
| 7 | `dsh-lit-fetch` | Literature search + PDF download (Crossref/OpenAlex/Sci-Hub/Unpaywall) | `suite-lit-fetch` |
| 8 | `dsh-skill-browser` | Browse, search and govern the local skill library | `suite-skill-browser` |
| 9 | `dsh-agent-team-auto-orchestrator` | Team-orchestration law injection plus a tool-level gate | `suite-agent-team-auto-orchestrator` |
| 10 | `dsh-todo-float-ball` | Floating todo progress ring and list for the current session | `suite-todo-float-ball` |
| 11 | `dsh-voice-alert` | Spoken turn-completion / failure alerts with 20 built-in sounds | `suite-voice-alert` |
| 12 | `dsh-archive-favorites-forge` | Session favourites, transcript paths, guarded deletion, bulk archive by idle time | `suite-archive-favorites-forge` |
| 13 | `dsh-model-fold` | Three-column cascading model panel with live per-model probes | `suite-model-fold` |
| 14 | `dsh-schedule-calendar` | Sidebar calendar, multi-city weather, holidays, reminders, work todos, countdowns | `suite-schedule-calendar` |
| 15 | `dsh-sidebar-media-player` | Sidebar audio/video player with Range-206 seeking, spectrum, pitch, subtitles/lyrics | `suite-sidebar-media-player` |

See [README_EN.md](README_EN.md) for the full English version of this document. License: MIT.
