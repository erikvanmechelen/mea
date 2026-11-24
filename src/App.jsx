import { useMemo, useState } from "react";
import { loadContent, mediaForNode } from "./lib/content.js";
import MapStage from "./components/MapStage.jsx";
import HudChrome from "./components/HudChrome.jsx";
import NodeSidebar from "./components/NodeSidebar.jsx";
import UploadRequestForm from "./components/UploadRequestForm.jsx";

const content = loadContent();

export default function App() {
  const { story, chapterNodes, places, placesById, mediaById } = content;
  const [chapterIndex, setChapterIndex] = useState(0);
  const [teaser, setTeaser] = useState(null);

  const activeNode = chapterNodes[chapterIndex] ?? null;
  const activePlace = activeNode ? placesById[activeNode.placeId] : null;
  const mediaItems = useMemo(
    () => mediaForNode(activeNode, mediaById),
    [activeNode, mediaById],
  );

  function onSelectPlace(place) {
    if (place.pinStatus === "story") {
      const idx = chapterNodes.findIndex((n) => n.placeId === place.id);
      if (idx >= 0) setChapterIndex(idx);
      setTeaser(null);
      return;
    }
    setTeaser(place);
  }

  return (
    <div className="app-shell">
      <MapStage
        places={places}
        placesById={placesById}
        activeNode={activeNode}
        onSelectPlace={onSelectPlace}
      />

      <div className="hud">
        <HudChrome
          story={story}
          chapterIndex={chapterIndex}
          chapterTotal={chapterNodes.length}
          onPrev={() => setChapterIndex((i) => Math.max(0, i - 1))}
          onNext={() =>
            setChapterIndex((i) => Math.min(chapterNodes.length - 1, i + 1))
          }
        />

        <NodeSidebar
          node={activeNode}
          place={activePlace}
          mediaItems={mediaItems}
        />

        {teaser ? (
          <div className="teaser-chip" role="status">
            <strong>{teaser.name}</strong> — {teaser.summary}{" "}
            <button
              type="button"
              className="ghost-btn"
              style={{ marginLeft: "0.5rem" }}
              onClick={() => setTeaser(null)}
            >
              Dismiss
            </button>
          </div>
        ) : null}

        <UploadRequestForm defaultPlace={activePlace} />
      </div>
    </div>
  );
}
