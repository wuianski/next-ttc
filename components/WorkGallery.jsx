"use client";

import { buildPhotoSlides } from "@/lib/media";
import PhotoGallery from "@/components/PhotoGallery";

export default function WorkGallery({ photos }) {
  const slides = photos.map((photo) =>
    buildPhotoSlides({
      url: photo.url,
      width: photo.width,
      height: photo.height,
    }),
  );

  return <PhotoGallery slides={slides} />;
}
