import { useCallback, useMemo, useState } from "react";
import { loadContent, mediaForNode } from "./lib/content.js";
import MapStage from "./components/MapStage.jsx";
import HudChrome from "./components/HudChrome.jsx";
import LeaderLine from "./components/LeaderLine.jsx";
import NodeSidebar from "./components/NodeSidebar.jsx";
import UploadRequestForm from "./components/UploadRequestForm.jsx";

const content = loadContent();

export default function App() {
  const { story, chapterNodes, places, placesById, mediaById } = content;
  const [chapterIndex, setChapterIndex] = useState(0);
  const [teaser, setTeaser] = useState(null);
  const [introToken, setIntroToken] = useState(0);
  const [introDone, setIntroDone] = useState(false);

  const activeNode = chapterNodes[chapterIndex] ?? null;
  const activePlace = activeNode ? placesById[activeNode.placeId] : null;
  const mediaItems = useMemo(
    () => mediaForNode(activeNode, mediaById),
    [activeNode, mediaById],
  );

  const goPrev = useCallback(() => {
    setChapterIndex((i) => Math.max(0, i - 1));
    setTeaser(null);
  }, []);

  const goNext = useCallback(() => {
    setChapterIndex((i) => Math.min(chapterNodes.length - 1, i + 1));
    setTeaser(null);
  }, [chapterNodes.length]);

  const onIntroComplete = useCallback(() => setIntroDone(true), []);

  const onReplayIntro = useCallback(() => {
    setTeaser(null);
    setIntroDone(false);
    setChapterIndex(0);
    // Bump intro after forcing chapter 1 so the cinematic lands on Oak Grove educate.
    queueMicrotask(() => setIntroToken((t) => t + 1));
  }, []);

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
        introToken={introToken}
        onIntroComplete={onIntroComplete}
      />

      <div className="hud">
        <LeaderLine />
        <HudChrome
          story={story}
          chapterIndex={chapterIndex}
          chapterTotal={chapterNodes.length}
          onPrev={goPrev}
          onNext={goNext}
          introDone={introDone}
          onReplayIntro={onReplayIntro}
        />

        <NodeSidebar
          key={activeNode?.id ?? "empty"}
          node={activeNode}
          place={activePlace}
          mediaItems={mediaItems}
          chapterIndex={chapterIndex}
          chapterTotal={chapterNodes.length}
          onPrev={goPrev}
          onNext={goNext}
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
