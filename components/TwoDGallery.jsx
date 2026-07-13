"use client";

import { buildPhotoSlides } from "@/lib/media";
import PhotoGallery from "@/components/PhotoGallery";

export default function TwoDGallery({ photos }) {
  const slides = photos.map((photo) =>
    buildPhotoSlides({
      url: photo.image.url,
      width: photo.image.width,
      height: photo.image.height,
      description: (
        <div dangerouslySetInnerHTML={{ __html: photo.description }} />
      ),
    }),
  );

  return <PhotoGallery slides={slides} enableCaptions />;
}
