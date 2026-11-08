# dsh-loyalchiiina-all-in-one

An **aggregate bundle package** for DSH (DeepSeek Harness): install 14 standalone plugins in one go, or pick any single one on its own.

- The bundle ships **no behaviour of its own** — `lib/index.js` is just `export {}`.
- Everything comes from the 14 entries inserted by `cordis.patch.yml` (`dsh.bundle.patch`), each pointing at an independent npm child package.
- Adapts the DSH kernel `0.2.2-rc.1`.

## Components (14)

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
| 11 | `dsh-voice-alert` | Spoken "done / failed" alerts at turn end, 20 built-in sounds | `suite-voice-alert` |
| 12 | `dsh-archive-favorites-forge` | Favourite, batch-archive, export conversations; guarded deletion | `suite-archive-favorites-forge` |
| 13 | `dsh-model-fold` | Three-column cascade model picker with per-model liveness probing | `suite-model-fold` |
| 14 | `dsh-schedule-calendar` | Schedule centre: calendar, multi-city weather, holidays, reminders | `suite-schedule-calendar` |

All 14 child packages are resolved from **published npm versions** (caret ranges); the bundle carries no `link:` / `file:` dependencies.

## Install

```powershell
# whole bundle (dependencies only)
pnpm add dsh-loyalchiiina-all-in-one
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

Status: `0.1.0`, published to npm and GitHub. MIT licensed.
