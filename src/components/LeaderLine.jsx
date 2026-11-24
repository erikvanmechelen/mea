/** Decorative HUD leader from map space into the sidebar. */
export default function LeaderLine() {
  return (
    <svg
      className="leader-line"
      viewBox="0 0 320 220"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M 12 150 C 90 150, 140 48, 260 42 L 308 42" />
      <circle className="leader-dot" cx="12" cy="150" r="3.5" />
      <circle className="leader-dot" cx="308" cy="42" r="3" />
    </svg>
  );
}
