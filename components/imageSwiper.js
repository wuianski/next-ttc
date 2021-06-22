import { getStrapiMedia } from "../lib/media";

const ImageSwiper = ({ image }) => {
  const imageUrl = getStrapiMedia(image);

  return (
    <img
      src={imageUrl}
      alt={image.alternativeText || image.name}
      className="imgSwiper"
    />
  );
};

export default ImageSwiper;
