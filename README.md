# Minnesota Election Awareness (MEA)

Participatory civic education for Minnesota elections **2026–2030**.

Framing: consent of the governed; citizens take responsibility for the health of self-government. Seek common ground through **available data** and clear process education—not years of contention over unavailable information.

## What this repo is

Interactive **story map** (intelligence-HUD flavor): cinematic zoom across Minnesota places, chaptered narrative nodes, per-node media, and a **moderated** citizen upload-request flow (Erik reviews before anything is published).

**v1 pilot story:** Oak Grove / ACEIT / paper rosters / felony threat letter / A26-0910.

Product plan (approve in Project Library): ask the MEA Project for `docs/v1-architecture.md`.

## Quick start

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually http://localhost:5173).

```bash
npm run build    # production bundle in dist/
npm run preview  # serve the build locally
```

## Content editing

Story data lives in plain JSON (no database for v1):

| File | Purpose |
|------|---------|
| `content/places.json` | Cities, counties, pins |
| `content/stories.json` | Guided narratives |
| `content/nodes.json` | Chapter beats (sidebar copy, links, camera hints) |
| `content/media.json` | Videos, PDFs, downloads |
| `content/schema.md` | Field guide |

After editing JSON, refresh the app. For public PDFs/images, put files under `public/media/` and set `media.src` to `/media/your-file.pdf`.

## Upload requests (moderation)

1. Visitors use **Request to contribute** on the map.
2. Without `VITE_UPLOAD_FORM_ENDPOINT`, the form opens a **mailto** to Erik.
3. With a Formspree/Getform URL in `.env` (see `.env.example`), submissions POST there.
4. **Approve an upload:** verify source → add file under `public/media/` (or link) → add/update `content/media.json` and attach the media id on a node → commit and deploy.

Nothing auto-publishes.

## Stack (v1)

- Vite + React
- MapLibre GL JS (OpenFreeMap dark basemap)
- JSON content in-repo
- Host later on Cloudflare Pages or Vercel from this GitHub repo

## Related public pages

- [projectminnesota.com/local](https://projectminnesota.com/local) — local authority & resolutions
- [erik.quest/2026](https://erik.quest/2026.html) — labeled mysteries / data limits
- [ACEIT](https://www.aceit.vote)

## License / contributions

Campaign materials and evidence may have separate rights. Contact Erik before redistributing documents. Code contributions via PR welcome after the v1 plan is locked.
