import React from "react";
import ImageGallery from "./imageGallery";

import dynamic from "next/dynamic";
// LightGallery module
const LightGallery = dynamic(() => import("lightgallery/react"), {
  ssr: false,
});

const Gallery = ({ drawings }) => {
  return (
    <div>
      <LightGallery plugins={[]}>
        {drawings.map((drawing) => (
          <ImageGallery
            image={drawing.image.formats.large}
            description={drawing.description}
          />
        ))}
      </LightGallery>
    </div>
  );
};

export default Gallery;
