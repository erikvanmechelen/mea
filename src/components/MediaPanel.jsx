import { useEffect, useState } from "react";

function youtubeEmbed(src) {
  try {
    const u = new URL(src);
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    /* ignore */
  }
  return null;
}

function MediaItem({ item }) {
  const [open, setOpen] = useState(false);
  const [textBody, setTextBody] = useState(null);
  const [textErr, setTextErr] = useState(null);
  const ready = Boolean(item.src);
  const embed = item.kind === "video" ? youtubeEmbed(item.src) : null;
  const isLocalText =
    item.kind === "file" && item.src?.endsWith(".txt");
  const isPdf = item.kind === "pdf" && item.src;

  useEffect(() => {
    if (!open || !isLocalText || textBody != null || textErr) return;
    let cancelled = false;
    fetch(item.src)
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.text();
      })
      .then((t) => {
        if (!cancelled) setTextBody(t);
      })
      .catch(() => {
        if (!cancelled) setTextErr("Could not load extract.");
      });
    return () => {
      cancelled = true;
    };
  }, [open, isLocalText, item.src, textBody, textErr]);

  if (!ready) {
    return (
      <li>
        <span>
          [{item.kind}] {item.title} — pending public file
        </span>
      </li>
    );
  }

  return (
    <li className="media-item">
      <div className="media-item-head">
        <a href={item.src} target="_blank" rel="noreferrer">
          [{item.kind}] {item.title}
        </a>
        {(isPdf || isLocalText || embed) && (
          <button
            type="button"
            className="ghost-btn media-toggle"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Hide" : "View"}
          </button>
        )}
      </div>
      {item.credit ? <p className="media-credit">{item.credit}</p> : null}
      {item.licenseNote ? (
        <p className="media-note">{item.licenseNote}</p>
      ) : null}

      {open && embed ? (
        <div className="media-embed">
          <iframe
            title={item.title}
            src={embed}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : null}

      {open && isPdf ? (
        <div className="media-embed media-embed--pdf">
          <iframe title={item.title} src={item.src} />
          <a href={item.src} target="_blank" rel="noreferrer">
            Open PDF in new tab
          </a>
        </div>
      ) : null}

      {open && isLocalText ? (
        <div className="media-extract">
          {textErr ? <p className="status err">{textErr}</p> : null}
          {textBody == null && !textErr ? <p className="media-note">Loading…</p> : null}
          {textBody ? <pre>{textBody}</pre> : null}
        </div>
      ) : null}
    </li>
  );
}

export default function MediaPanel({ items }) {
  if (!items?.length) return null;

  return (
    <ul className="media-list" aria-label="Node media">
      {items.map((item) => (
        <MediaItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
