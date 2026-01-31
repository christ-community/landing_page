import { list } from "@vercel/blob";

export type MediaItem = {
  type: "image" | "video";
  src: string;
  alt: string;
  pathname: string;
  poster?: string;
};

const imageExtensions = new Set([
  "jpg",
  "jpeg",
  "png",
  "webp",
  "gif",
  "avif",
]);

const videoExtensions = new Set([
  "mp4",
  "webm",
  "mov",
  "m4v",
  "avi",
]);

const getExtension = (pathname: string) =>
  pathname.split(".").pop()?.toLowerCase() || "";

const getBaseName = (pathname: string) =>
  pathname.split("/").pop()?.replace(/\.[^/.]+$/, "") || pathname;

export async function getEventMedia(folder: string) {
  const response = await list({ prefix: `${folder}/` });
  const blobs = response?.blobs || [];

  const items = blobs
    .map((blob: { url?: string; downloadUrl?: string; pathname: string }) => {
      const src = blob.url || blob.downloadUrl;
      if (!src) return null;
      const extension = getExtension(blob.pathname);
      const type = videoExtensions.has(extension)
        ? "video"
        : imageExtensions.has(extension)
          ? "image"
          : null;
      if (!type) return null;

      return {
        type,
        src,
        alt: getBaseName(blob.pathname).replace(/[-_]/g, " "),
        pathname: blob.pathname,
      } satisfies MediaItem;
    })
    .filter(Boolean) as MediaItem[];

  const sortedItems = items.sort((a, b) =>
    a.pathname.localeCompare(b.pathname)
  );

  const imageItems = sortedItems.filter((item) => item.type === "image");
  const imageByBase = new Map(
    imageItems.map((item) => [getBaseName(item.pathname), item.src])
  );

  return sortedItems.map((item) => {
    if (item.type !== "video") return item;
    const poster = imageByBase.get(getBaseName(item.pathname)) || imageItems[0]?.src;
    return {
      ...item,
      poster,
    };
  });
}
