import { useState } from "react";

const ENDPOINT = import.meta.env.VITE_UPLOAD_FORM_ENDPOINT;

export default function UploadRequestForm({ defaultPlace }) {
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setStatus(null);
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (!data.consent) {
      setStatus({ ok: false, message: "Please confirm consent before sending." });
      return;
    }

    if (!ENDPOINT) {
      const body = [
        `Name: ${data.submitterName}`,
        `Email: ${data.email}`,
        `Place/topic: ${data.placeOrTopic}`,
        `Story hint: ${data.storyHint || "(none)"}`,
        "",
        data.description,
        "",
        `Links: ${data.fileUrls || "(none)"}`,
      ].join("\n");
      window.location.href = `mailto:erikvanmechelen@protonmail.com?subject=${encodeURIComponent(
        "[MEA upload request] " + (data.placeOrTopic || "contribution"),
      )}&body=${encodeURIComponent(body)}`;
      setStatus({
        ok: true,
        message: "Opening your email client. Nothing is published until Erik reviews it.",
      });
      return;
    }

    setBusy(true);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submit failed");
      form.reset();
      setStatus({
        ok: true,
        message: "Received. Erik reviews before anything is published.",
      });
    } catch {
      setStatus({
        ok: false,
        message: "Could not send. Try again or email erikvanmechelen@protonmail.com.",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="upload-dock">
      <details>
        <summary>Request to contribute media or evidence</summary>
        <form className="upload-form" onSubmit={onSubmit}>
          <p className="note">
            Submissions come to Erik for review. Nothing appears on the public map until
            accepted. Prefer links (Drive/Dropbox) over large attachments for now.
          </p>
          <label>
            Your name
            <input name="submitterName" required autoComplete="name" />
          </label>
          <label>
            Email (for follow-up only)
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label>
            Place or topic
            <input
              name="placeOrTopic"
              required
              defaultValue={defaultPlace?.name ?? ""}
              placeholder="e.g. Oak Grove, Anoka County"
            />
          </label>
          <label>
            Related story (optional)
            <input name="storyHint" placeholder="oak-grove-paper-rosters" />
          </label>
          <label>
            What do you have?
            <textarea name="description" rows={4} required />
          </label>
          <label>
            File links (optional)
            <input name="fileUrls" placeholder="https://..." />
          </label>
          <label style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
            <input name="consent" type="checkbox" value="yes" required />
            <span>
              I agree Erik may contact me about this material, and that it is not public on
              MEA until reviewed.
            </span>
          </label>
          <button type="submit" disabled={busy}>
            {busy ? "Sending…" : "Send request"}
          </button>
          {status ? (
            <p className={`status ${status.ok ? "ok" : "err"}`}>{status.message}</p>
          ) : null}
        </form>
      </details>
    </div>
  );
}
