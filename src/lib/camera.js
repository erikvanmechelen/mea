/** Default Minnesota overview before a story chapter focuses. */
export const MN_OVERVIEW = {
  center: [-94.5, 46.0],
  zoom: 5.6,
  pitch: 35,
  bearing: -15,
};

export function cameraForNode(node, place) {
  const cam = node?.camera ?? {};
  return {
    center: [place.lng, place.lat],
    zoom: cam.zoom ?? 11,
    pitch: cam.pitch ?? 45,
    bearing: cam.bearing ?? 0,
  };
}

export function flyTo(map, opts, duration = 2200) {
  if (!map) return;
  map.flyTo({
    ...opts,
    duration,
    essential: true,
  });
}
