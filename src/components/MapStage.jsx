import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MN_OVERVIEW, cameraForNode, flyTo } from "../lib/camera.js";

const STYLE =
  "https://tiles.openfreemap.org/styles/dark";

export default function MapStage({
  places,
  activeNode,
  placesById,
  onSelectPlace,
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLE,
      center: MN_OVERVIEW.center,
      zoom: MN_OVERVIEW.zoom,
      pitch: MN_OVERVIEW.pitch,
      bearing: MN_OVERVIEW.bearing,
      attributionControl: true,
    });

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "bottom-left");
    mapRef.current = map;

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    for (const place of places) {
      if (place.kind === "state") continue;

      const el = document.createElement("button");
      el.type = "button";
      el.className = `mea-pin mea-pin--${place.pinStatus}`;
      el.title = place.name;
      el.setAttribute("aria-label", place.name);
      el.style.cssText = [
        "width:14px",
        "height:14px",
        "border-radius:50%",
        "border:2px solid #5ee7ff",
        "background:rgba(94,231,255,0.35)",
        "box-shadow:0 0 12px rgba(94,231,255,0.55)",
        "cursor:pointer",
        "padding:0",
      ].join(";");

      if (place.pinStatus === "teaser") {
        el.style.borderColor = "#9bb0bc";
        el.style.background = "rgba(155,176,188,0.35)";
        el.style.boxShadow = "none";
      }

      el.addEventListener("click", () => onSelectPlace?.(place));

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([place.lng, place.lat])
        .addTo(map);
      markersRef.current.push(marker);
    }
  }, [places, onSelectPlace]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !activeNode) return;
    const place = placesById[activeNode.placeId];
    if (!place) return;

    const run = () => flyTo(map, cameraForNode(activeNode, place));
    if (map.isStyleLoaded()) run();
    else map.once("load", run);
  }, [activeNode, placesById]);

  return <div className="map-stage" ref={containerRef} />;
}
