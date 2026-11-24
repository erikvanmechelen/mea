# Minnesota Election Awareness (MEA)

Participatory civic education for Minnesota elections **2026–2030**.

Framing: consent of the governed; citizens take responsibility for the health of self-government. Seek common ground through **available data** and clear process education—not years of contention over unavailable information.

## v0.9 demo (playable tonight)

Interactive **story map** with dark intelligence-HUD chrome:

1. Cinematic zoom **Minnesota → Anoka → Oak Grove**
2. Five ordered chapters (ACEIT educate → Res. 24-101 → felony letter → A26-0910 → urgency)
3. Sidebar detail + **Next chapter**
4. Real documents under `public/media/` (resolution, court orders, ACEIT deck/brief, felony-letter text extract)
5. Upload-request stub (mailto; optional Formspree via `.env`)
6. Teaser pins: Ramsey, St. Bonifacius, Linwood

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

Story data lives in plain JSON (no database):

| File | Purpose |
|------|---------|
| `content/places.json` | Cities, counties, pins |
| `content/stories.json` | Guided narratives |
| `content/nodes.json` | Chapter beats (sidebar copy, links, camera hints) |
| `content/media.json` | Videos, PDFs, downloads |
| `content/schema.md` | Field guide |

Public PDFs/text: put files under `public/media/` and set `media.src` to `/media/your-file.pdf`.

## Upload requests (moderation)

1. Visitors use **Request to contribute** on the map.
2. Without `VITE_UPLOAD_FORM_ENDPOINT`, the form opens a **mailto** to Erik.
3. With a Formspree/Getform URL in `.env` (see `.env.example`), submissions POST there.
4. **Approve an upload:** verify source → add file under `public/media/` → update `content/media.json` + node → commit and deploy.

Nothing auto-publishes.

## Stack

- Vite + React
- MapLibre GL JS (OpenFreeMap dark basemap)
- JSON content in-repo

## Related public pages

- [projectminnesota.com/local](https://projectminnesota.com/local)
- [erik.quest/2026](https://erik.quest/2026.html)
- [ACEIT](https://www.aceit.vote)

## License / contributions

Campaign materials and evidence may have separate rights. Contact Erik before redistributing documents. Code contributions via PR welcome.
