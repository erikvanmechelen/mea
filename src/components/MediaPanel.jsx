export default function MediaPanel({ items }) {
  if (!items?.length) return null;

  return (
    <ul className="media-list" aria-label="Node media">
      {items.map((item) => {
        const ready = Boolean(item.src);
        return (
          <li key={item.id}>
            {ready ? (
              <a href={item.src} target="_blank" rel="noreferrer">
                [{item.kind}] {item.title}
              </a>
            ) : (
              <span>
                [{item.kind}] {item.title} — pending public file
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
