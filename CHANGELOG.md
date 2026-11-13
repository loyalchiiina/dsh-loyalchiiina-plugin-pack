# Changelog

## 0.2.2 — 2026-11-13

- 修复：`dsh-schedule-calendar` 依赖范围由 `^0.4.3` 改为 `^1.0.0`（0.x 的 `^` 只覆盖 0.4.x，装不到已发布的 1.0.x）。
- 依赖范围：共调整 13 条 —— 12 条把 caret 下限提到能覆盖本机实测版本的下界；其余 2 条（`dsh-chat-image-lightbox` `^1.9.3`、`dsh-lit-fetch` `^1.0.6`）不变。
- 仓库目录名由 `dsh-loyalchiiina-suite` 更名为 `dsh-loyalchiiina-plugin-pack`，与包名一致。

## 0.2.1 — 2026-11-12

- 文档：在 README / README_EN / 插件描述中明确公开包只含 15 个公开组件。
- 文档：说明第 16 个 `dsh-skill-guard` 是作者本机私有组件（GitHub private），不发布到 npm、不随公开安装包分发。
- 文档：解释作者本机详情页可能显示 16 个、公开用户看到 15 个的预期差异。

## 0.2.0 — 2026-11-12

- 新增 `dsh-sidebar-media-player ^0.2.0`，公开组件从 14 个扩到 15 个。
- 全部公开依赖范围对齐各子包本地最新版。
- README / README_EN / locale 统一为 15 个组件，并补充 GitHub 仓库与 Star 快照列。
