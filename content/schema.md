# Content schema (v1)

Plain JSON under `content/`. Field definitions match the Project plan
`docs/v1-architecture.md` in the MEA Library.

## Files

| File | Collection |
|------|------------|
| `places.json` | Geographic anchors |
| `stories.json` | Guided narratives (ordered chapters) |
| `nodes.json` | Chapter beats / map nodes |
| `media.json` | Videos, PDFs, downloads |

## Editing tips

1. Keep `id` values stable (slugs). Links between files use those ids.
2. `stories[].chapterNodeIds` order **is** the chapter sequence.
3. Set `pinStatus` to `story` for full nodes, `teaser` for short cards, `planned` for future pins.
4. Prefer embedding large video (YouTube) via `media.src` URL; keep PDFs small in `public/media/`.
5. After Erik approves an upload request, add a media entry + attach its id on a node, then deploy.
