/**
 * Deliberately plain slideshow of the same chapter nodes.
 * Contrast piece vs the dark HUD map — keep it bare.
 */
export default function SlideshowView({
  story,
  node,
  place,
  chapterIndex,
  chapterTotal,
  onPrev,
  onNext,
  onJump,
}) {
  if (!node) return null;

  const dots = Array.from({ length: chapterTotal }, (_, i) => i);

  return (
    <div className="slideshow">
      <header className="slideshow-header">
        <p className="slideshow-kicker">{story?.title ?? "Story"}</p>
        <p className="slideshow-progress">
          Slide {chapterIndex + 1} of {chapterTotal}
        </p>
      </header>

      <main className="slideshow-main">
        <p className="slideshow-date">{node.dateLabel}</p>
        <h1 className="slideshow-title">{node.title}</h1>
        {place ? (
          <p className="slideshow-place">
            {place.name}
            {place.county ? `, ${place.county} County` : ""}
          </p>
        ) : null}
        <p className="slideshow-body">{node.summary}</p>
      </main>

      <nav className="slideshow-nav" aria-label="Slideshow controls">
        <button type="button" onClick={onPrev} disabled={chapterIndex <= 0}>
          Previous
        </button>
        <div className="slideshow-dots" role="tablist" aria-label="Slides">
          {dots.map((i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === chapterIndex}
              aria-label={`Go to slide ${i + 1}`}
              className={i === chapterIndex ? "is-active" : ""}
              onClick={() => onJump?.(i)}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={onNext}
          disabled={chapterIndex >= chapterTotal - 1}
        >
          Next
        </button>
      </nav>
    </div>
  );
}
