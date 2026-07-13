import { getStrapiURL } from "./api";

const IMAGE_SIZES = [16, 32, 48, 64, 96, 128, 256, 384];
const DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

export function getStrapiMedia(media) {
  const imageUrl = media.url.startsWith("/")
    ? getStrapiURL(media.url)
    : media.url;
  return imageUrl;
}

export function buildPhotoSlides({ url, width, height, description }) {
  return {
    src: url,
    width,
    height,
    ...(description && { description }),
    srcSet: [...IMAGE_SIZES, ...DEVICE_SIZES]
      .filter((size) => size <= width)
      .map((size) => ({
        src: url,
        width: size,
        height: Math.round((height / width) * size),
      })),
  };
}
