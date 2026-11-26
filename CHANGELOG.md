# Changelog

## 0.2.5 — 2026-11-26

- 成员插件更新跟进两处：`dsh-sidebar-media-player` `^1.0.1` → `^1.0.6`（1.0.6 主控行新增 VIP / 绿钻双跳过开关，效果图为无损 PNG 新版）；`dsh-console-sentinel` `^1.4.2` → `^1.4.3`（1.4.3 探测仅在设置面板打开期间运行，单次探测 ~9s → 1-2s）。
- 其余 13 个依赖与 npm 最新版一致，维持不变；`cordis.patch.yml` 按设计不写版本 pin，公开 15 条 entry（`suite-` 前缀）不变。

## 0.2.4 — 2026-11-26

- 本批全部子插件完成「减少卡顿」性能改造（拆除常驻定时器 / 降频 / document.hidden 门控 / 变化判据去重），聚合包依赖同步升到发布最新：`dsh-archive-favorites-forge ^1.0.3`、`dsh-browser-hub ^0.2.16`、`dsh-console-sentinel ^1.4.2`、`dsh-font-enhancer ^1.5.16`、`dsh-model-fold ^1.0.26`、`dsh-schedule-calendar ^1.1.27`、`dsh-sidebar-media-player ^1.0.1`、`dsh-todo-float-ball ^1.0.1`、`dsh-voice-alert ^0.4.29`（其余 6 条无新版，维持不变）。
- 去掉了 `dsh-todo-float-ball` 的 `npm:` 别名写法，统一写 `dsh-todo-float-ball ^1.0.1`；`dsh-browser-hub` / `dsh-font-enhancer` / `dsh-model-fold` / `dsh-schedule-calendar` / `dsh-todo-float-ball` 这 5 个名字**本身就是 npm 上已发布的真名**（`npm view` 已核实），不是占位名，因此 `cordis.patch.yml` 的 `name` 无需改动 —— 上个版本两处写法本来就一致。
- `cordis.patch.yml` 公开 15 条 entry（id 统一 `suite-` 前缀）与 dependencies 15 键逐一对应，无重复 id；本机私有 `私有组件条目` 条目仍仅存在于本地版，发布前由 `scripts/strip-private.mjs --stage` 剥离。
- README / README_EN 适配内核说明统一为 `0.2.2-rc.1 / 0.2.3`，与 package.json description 一致。

## 0.2.3 — 2026-11-26

- 依赖范围全部对齐各子插件当前 npm 最新版：`dsh-agent-team-auto-orchestrator ^1.5.14`、`dsh-archive-favorites-forge ^1.0.2`、`dsh-artifact-linker ^0.5.8`、`dsh-browser-hub ^0.2.15`、`dsh-chat-image-lightbox ^1.9.6`、`dsh-console-sentinel ^1.4.1`、`dsh-deepseek-web-free ^1.0.45`、`dsh-font-enhancer ^1.5.15`、`dsh-lit-fetch ^1.0.8`、`dsh-model-fold ^1.0.25`、`dsh-schedule-calendar ^1.1.26`、`dsh-sidebar-media-player ^1.0.0`、`dsh-skill-browser ^2.2.49`、`dsh-todo-float-ball npm:dsh-todo-float-ball@^1.0.0`、`dsh-voice-alert ^0.4.28`。
- 修复：`dsh-todo-float-ball` 的 npm 包已由 `dsh-todo-float-ball` 改名，直接写 `dsh-todo-float-ball@^1.0.0` 会解析失败（`dsh-todo-float-ball` 只发到 0.x），改为 npm 别名 `dsh-todo-float-ball: npm:dsh-todo-float-ball@^1.0.0` —— 目录名仍是 `dsh-todo-float-ball`（`cordis.patch.yml` 的 `suite-todo-float-ball` → `name: dsh-todo-float-ball` 无需改动），实装版本升到 1.0.0（适配内核 0.2.3，含与官方 `@deepseek-ai/dsh-timeline` 的运行时让位）。
- 修复：`scripts/` 下补 `pnpm-workspace.yaml` —— `nodeLinker: hoisted` + `autoInstallPeers: false`，否则 pnpm 11 会自动补装 `@deepseek-ai/dsh-tools` 的 peer，而 npm 上该包的 `>=0.2.0 <0.3.0` 派生范围不含 `rc` 预发布，安装直接报 `ERR_PNPM_NO_MATCHING_VERSION`（与 desktop profile 同款配置）。
- 说明：本包在本机的 `node_modules` 由 pnpm 实装（非 junction），子插件版本以 `package.json` 声明的范围为准；本机私有 私有组件 仍是 junction，不随包发布。

## 0.2.2 — 2026-11-13

- 修复：`dsh-schedule-calendar` 依赖范围由 `^0.4.3` 改为 `^1.0.0`（0.x 的 `^` 只覆盖 0.4.x，装不到已发布的 1.0.x）。
- 依赖范围：共调整 13 条 —— 12 条把 caret 下限提到能覆盖本机实测版本的下界；其余 2 条（`dsh-chat-image-lightbox` `^1.9.3`、`dsh-lit-fetch` `^1.0.6`）不变。
- 仓库目录名由 `dsh-loyalchiiina-suite` 更名为 `dsh-loyalchiiina-plugin-pack`，与包名一致。

## 0.2.1 — 2026-11-12

- 文档：在 README / README_EN / 插件描述中明确公开包只含 15 个公开组件。
- 文档：说明第 16 个 私有组件 是作者本机私有组件（GitHub private），不发布到 npm、不随公开安装包分发。
- 文档：解释作者本机详情页可能显示 16 个、公开用户看到 15 个的预期差异。

## 0.2.0 — 2026-11-12

- 新增 `dsh-sidebar-media-player ^0.2.0`，公开组件从 14 个扩到 15 个。
- 全部公开依赖范围对齐各子包本地最新版。
- README / README_EN / locale 统一为 15 个组件，并补充 GitHub 仓库与 Star 快照列。
