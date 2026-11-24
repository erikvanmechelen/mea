/** Default Minnesota overview before a story chapter focuses. */
export const MN_OVERVIEW = {
  center: [-94.5, 46.0],
  zoom: 5.6,
  pitch: 35,
  bearing: -15,
};

/** Anoka metro step in the intro / chapter zoom path. */
export const ANOKA_OVERVIEW = {
  center: [-93.24, 45.27],
  zoom: 8.6,
  pitch: 42,
  bearing: -8,
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
  if (!map) return Promise.resolve();
  return new Promise((resolve) => {
    const onEnd = () => {
      map.off("moveend", onEnd);
      resolve();
    };
    map.once("moveend", onEnd);
    map.flyTo({
      ...opts,
      duration,
      essential: true,
    });
  });
}

/** Stepped MN → Anoka → place intro (or chapter focus). */
export async function cinematicZoom(map, placeCamera, { skipIntro = false } = {}) {
  if (!map) return;
  if (!skipIntro) {
    await flyTo(map, MN_OVERVIEW, 1600);
    await flyTo(map, ANOKA_OVERVIEW, 1800);
  }
  await flyTo(map, placeCamera, 2000);
}
