import MediaPanel from "./MediaPanel.jsx";

export default function NodeSidebar({ node, place, mediaItems }) {
  if (!node) return null;

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
            <li key={link.url}>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </aside>
  );
}
