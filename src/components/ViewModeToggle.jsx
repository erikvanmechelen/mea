/** Clear entry toggle: Map (HUD) vs plain Slideshow. */
export default function ViewModeToggle({ mode, onChange }) {
  return (
    <div className="view-mode-toggle" role="group" aria-label="View mode">
      <button
        type="button"
        className={mode === "map" ? "is-active" : ""}
        aria-pressed={mode === "map"}
        onClick={() => onChange("map")}
      >
        Map
      </button>
      <button
        type="button"
        className={mode === "slideshow" ? "is-active" : ""}
        aria-pressed={mode === "slideshow"}
        onClick={() => onChange("slideshow")}
      >
        Slideshow
      </button>
    </div>
  );
}
