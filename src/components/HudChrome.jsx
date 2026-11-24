export default function HudChrome({
  story,
  chapterIndex,
  chapterTotal,
  onPrev,
  onNext,
}) {
  return (
    <>
      <div className="brand-bar">
        <h1>Minnesota Election Awareness</h1>
        <p>
          {story?.framing ??
            "Participatory civic education for Minnesota elections 2026–2030."}
        </p>
      </div>

      <div className="chapter-rail">
        <div className="chapter-meta" aria-live="polite">
          <span>
            Chapter {chapterIndex + 1} / {chapterTotal}
          </span>
          <span>{story?.title}</span>
        </div>
        <div className="chapter-controls">
          <button type="button" onClick={onPrev} disabled={chapterIndex <= 0}>
            Previous
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={chapterIndex >= chapterTotal - 1}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
