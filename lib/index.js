/**
 * dsh-loyalchiiina-suite — 聚合 bundle 包（bundle-only）。
 *
 * 本文件刻意只有一个 `export {}`，这是聚合包的规范形态：
 *   · 行为全部由 `cordis.patch.yml`（package.json 的 `dsh.bundle.patch`）里
 *     insert 的 14 个独立子包提供；
 *   · 本包自己不是插件，不会被 loader 当成 entry 加载，因此不能导出
 *     `name` / `apply` / `inject` 之类的插件契约；
 *   · 保留 `main` + 本文件，只为满足「包有入口」的清单要求与打包一致性。
 *
 * 参考形态：@deepseek-ai/dsh-experimental-agent-team-profile（同一个套路）。
 */
export {};
