export default function HudChrome({
  story,
  chapterIndex,
  chapterTotal,
  onPrev,
  onNext,
  introDone,
  onReplayIntro,
}) {
  const ticks = Array.from({ length: chapterTotal }, (_, i) => i);

  return (
    <>
      <div className="brand-bar">
        <h1>Minnesota Election Awareness</h1>
        <p>
          {story?.subtitle ??
            "Participatory civic education for Minnesota elections 2026–2030."}
        </p>
        {introDone ? (
          <button type="button" className="ghost-btn intro-replay" onClick={onReplayIntro}>
            Replay MN → Anoka zoom
          </button>
        ) : (
          <p className="intro-status">Flying Minnesota → Anoka → Oak Grove…</p>
        )}
      </div>

      <div className="chapter-rail">
        <div className="chapter-meta" aria-live="polite">
          <span className="chapter-label">
            Chapter {chapterIndex + 1} / {chapterTotal}
          </span>
          <span className="chapter-title">{story?.title}</span>
          <div className="chapter-ticks" aria-hidden="true">
            {ticks.map((i) => (
              <span
                key={i}
                className={
                  i === chapterIndex ? "active" : i < chapterIndex ? "done" : ""
                }
              />
            ))}
          </div>
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
            Next chapter
          </button>
        </div>
      </div>
    </>
  );
}
