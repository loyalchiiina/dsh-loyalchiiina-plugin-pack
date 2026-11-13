# dsh-loyalchiiina-plugin-pack

Repository: [loyalchiiina/dsh-loyalchiiina-plugin-pack](https://github.com/loyalchiiina/dsh-loyalchiiina-plugin-pack) · Stars welcome ⭐

An **aggregate bundle package** for DSH (DeepSeek Harness): install 15 standalone plugins in one go, or pick any single one on its own.

- The bundle ships **no behaviour of its own** — `lib/index.js` is just `export {}`.
- Everything comes from the 15 entries inserted by `cordis.patch.yml` (`dsh.bundle.patch`), each pointing at an independent npm child package.
- Adapts the DSH kernel `0.2.2-rc.1`.
- **Host prerequisite:** `dsh-browser-hub` declares `dsh-better-sidebar >= 0.20.0` in `peerDependencies`; several components in this bundle are sidebar components (browser hub / sidebar media player / skill browser / todo float ball / schedule calendar) and need `dsh-better-sidebar` installed in the host profile (measured locally at `0.31.1`). Without it nothing errors, but the sidebar entries simply do not appear.

> **Private component note:** the development copy also mounts a 16th private component, `dsh-skill-guard` (GitHub private, author-local only). It is **not published to npm and not included in the public install**; public users always get the 15 components above. An author-local detail page may show 16 while public users see 15 — this is expected.

## Components (15)

| # | Package | What it does | Bundle entry id | GitHub / Star |
|---|---|---|---|---|
| 1 | `dsh-artifact-linker` | Turns declared artifact paths into one-click chips; resident absolute-path rules | `suite-artifact-linker` | [loyalchiiina/dsh-artifact-linker](https://github.com/loyalchiiina/dsh-artifact-linker) · ⭐ 2 |
| 2 | `dsh-browser-hub` | Sidebar browser upgrade: search engines, bookmarks, folders, 360/Chrome bookmark import | `suite-browser-hub` | [loyalchiiina/dsh-browser-hub](https://github.com/loyalchiiina/dsh-browser-hub) · ⭐ 1 |
| 3 | `dsh-chat-image-lightbox` | Full-screen image lightbox, thumbnail grid, TIFF/HEIC transcoding, delivery rule | `suite-chat-image-lightbox` | [loyalchiiina/dsh-chat-image-lightbox](https://github.com/loyalchiiina/dsh-chat-image-lightbox) · ⭐ 2 |
| 4 | `dsh-console-sentinel` | Windows console-window sentinel: preview-then-close, whitelist, solver protection | `suite-console-sentinel` | [loyalchiiina/dsh-console-sentinel](https://github.com/loyalchiiina/dsh-console-sentinel) · ⭐ 0 |
| 5 | `dsh-deepseek-web-free` | Unofficial DeepSeek Web provider + embedded web panel | `suite-deepseek-web-free` | [loyalchiiina/dsh-deepseek-web-free](https://github.com/loyalchiiina/dsh-deepseek-web-free) · ⭐ 4 |
| 6 | `dsh-font-enhancer` | Per-region font/colour/line-height DIY with presets and themes | `suite-font-enhancer` | [loyalchiiina/dsh-font-enhancer](https://github.com/loyalchiiina/dsh-font-enhancer) · ⭐ 5 |
| 7 | `dsh-lit-fetch` | Literature search + PDF download (Crossref/OpenAlex/Sci-Hub/Unpaywall) | `suite-lit-fetch` | [loyalchiiina/dsh-lit-fetch](https://github.com/loyalchiiina/dsh-lit-fetch) · ⭐ 1 |
| 8 | `dsh-skill-browser` | Browse, search and govern the local skill library | `suite-skill-browser` | [loyalchiiina/dsh-skill-browser](https://github.com/loyalchiiina/dsh-skill-browser) · ⭐ 1 |
| 9 | `dsh-agent-team-auto-orchestrator` | Team-orchestration law injection plus a tool-level gate | `suite-agent-team-auto-orchestrator` | [loyalchiiina/dsh-agent-team-auto-orchestrator](https://github.com/loyalchiiina/dsh-agent-team-auto-orchestrator) · ⭐ 2 |
| 10 | `dsh-todo-float-ball` | Floating todo progress ring and list for the current session | `suite-todo-float-ball` | [loyalchiiina/dsh-todo-float-ball](https://github.com/loyalchiiina/dsh-todo-float-ball) · ⭐ 1 |
| 11 | `dsh-voice-alert` | Spoken "done / failed" alerts at turn end, 20 built-in sounds | `suite-voice-alert` | [loyalchiiina/dsh-voice-alert](https://github.com/loyalchiiina/dsh-voice-alert) · ⭐ 2 |
| 12 | `dsh-archive-favorites-forge` | Favourite, batch-archive, export conversations; guarded deletion | `suite-archive-favorites-forge` | [loyalchiiina/dsh-archive-favorites-forge](https://github.com/loyalchiiina/dsh-archive-favorites-forge) · ⭐ 1 |
| 13 | `dsh-model-fold` | Three-column cascade model picker with per-model liveness probing | `suite-model-fold` | [loyalchiiina/dsh-model-fold](https://github.com/loyalchiiina/dsh-model-fold) · ⭐ 3 |
| 14 | `dsh-schedule-calendar` | Schedule centre: calendar, multi-city weather, holidays, reminders | `suite-schedule-calendar` | [loyalchiiina/dsh-schedule-calendar](https://github.com/loyalchiiina/dsh-schedule-calendar) · ⭐ 0 |
| 15 | `dsh-sidebar-media-player` | Sidebar audio/video player with Range-206 seeking, spectrum, pitch, subtitles/lyrics | `suite-sidebar-media-player` | [loyalchiiina/dsh-sidebar-media-player](https://github.com/loyalchiiina/dsh-sidebar-media-player) · ⭐ 0 |

> Star counts are a 2026-11-12 snapshot; click a repository link to star it.
All 15 child packages are resolved from **published npm versions** (caret ranges); the bundle carries no `link:` / `file:` dependencies.

## Install

```powershell
# whole bundle (dependencies only)
pnpm add dsh-loyalchiiina-plugin-pack
# a single component, without the bundle
pnpm add dsh-todo-float-ball
```

To actually mount it, list the bundle in the profile's `dsh.profile.bundles` (that is what merges its `dsh.bundle.patch`). A single component works the same way, listed under its own package name.

**Do not enable both** the bundle and one of its children in the same profile — the plugin would be mounted twice.

**Applying changes:** `package.json` / `cordis.patch.yml` / profile mounts → fully quit and restart the DSH client (the host is a plain Node process, no hot reload). A child's `lib/client.js` change → `Ctrl+Shift+R` hard refresh.

## Toggling a component

Layer order is `bundle:*` → `user-patch` → `home-patch`, later layers win by id, so disable one component in the profile `cordis.patch.yml`:

```yaml
- id: suite-voice-alert
  disabled: true
```

The bundle ships **no config overrides**; every child runs its own defaults. Add `config:` under the entry id to tune one.

## Bundle rules this package follows

1. The aggregate package declares `dsh.bundle.patch`; missing it means `declares no dsh.bundle`.
2. The aggregate package is **not a plugin** — no `apply` / `inject`, `lib/index.js` is `export {}`, and it never inserts itself.
3. Each child keeps its own `dsh.bundle.patch` so it stays installable on its own.
4. Bundle entry ids are namespaced `suite-<short-name>`: child patches use their own package name as id, so this can never collide (`duplicate loader entry id`).
5. One entry per component, `name` = the child package name; no paths, no version pins.
6. All JSON/YAML/JS files are UTF-8 **without BOM**.

Status: `0.2.2`. MIT licensed.
