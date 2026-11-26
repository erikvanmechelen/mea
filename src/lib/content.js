import places from "../../content/places.json";
import stories from "../../content/stories.json";
import nodes from "../../content/nodes.json";
import media from "../../content/media.json";

export function loadContent() {
  const mediaById = Object.fromEntries(media.map((m) => [m.id, m]));
  const placesById = Object.fromEntries(places.map((p) => [p.id, p]));
  const nodesById = Object.fromEntries(nodes.map((n) => [n.id, n]));

  const story = stories.find((s) => s.status === "published") ?? stories[0];
  const chapterNodes = (story?.chapterNodeIds ?? [])
    .map((id) => nodesById[id])
    .filter(Boolean);

  return {
    places,
    placesById,
    stories,
    story,
    nodes,
    nodesById,
    chapterNodes,
    media,
    mediaById,
  };
}

export function mediaForNode(node, mediaById) {
  return (node?.mediaIds ?? []).map((id) => mediaById[id]).filter(Boolean);
}
