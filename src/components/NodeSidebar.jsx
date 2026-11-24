import MediaPanel from "./MediaPanel.jsx";

export default function NodeSidebar({
  node,
  place,
  mediaItems,
  chapterIndex,
  chapterTotal,
  onNext,
  onPrev,
}) {
  if (!node) return null;

  const hasNext = chapterIndex < chapterTotal - 1;
  const hasPrev = chapterIndex > 0;

  return (
    <aside className="sidebar" aria-label="Story node detail">
      <div className="leader" aria-hidden="true" />
      <div className="date">{node.dateLabel}</div>
      <h2>{node.title}</h2>
      {place ? (
        <p className="detail" style={{ marginTop: 0 }}>
          {place.name}
          {place.county ? ` · ${place.county} County` : ""}
        </p>
      ) : null}
      <p className="summary">{node.summary}</p>
      {node.detail ? <p className="detail">{node.detail}</p> : null}

      {node.evidenceTier?.length ? (
        <div className="tiers">
          {node.evidenceTier.map((tier) => (
            <span key={tier} className={`tier ${tier}`}>
              {tier}
            </span>
          ))}
        </div>
      ) : null}

      <MediaPanel items={mediaItems} />

      {node.links?.length ? (
        <ul className="link-list">
          {node.links.map((link) => (
            <li key={`${link.url}-${link.label}`}>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="sidebar-nav">
        <button type="button" className="ghost-btn" onClick={onPrev} disabled={!hasPrev}>
          Previous
        </button>
        <button type="button" className="next-chapter" onClick={onNext} disabled={!hasNext}>
          {hasNext ? "Next chapter →" : "End of story"}
        </button>
      </div>
    </aside>
  );
}
