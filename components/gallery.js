import React from "react";
import ImageGallery from "./imageGallery";

import dynamic from "next/dynamic";
// LightGallery module
const LightGallery = dynamic(() => import("lightgallery/react"), {
  ssr: false,
});

const Gallery = ({ drawings }) => {
  drawings.sort((a, b) => b.order - a.order);
  return (
    <div>
      <LightGallery plugins={[]}>
        {drawings.map((drawing) => (
            <ImageGallery
              image={drawing.image.formats.large}
              description={drawing.description}
              order={drawing.order}
            />
        ))}
      </LightGallery>
    </div>
  );
};

export default Gallery;
