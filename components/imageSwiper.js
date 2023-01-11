import { getStrapiMedia } from "../lib/media";

const ImageSwiper = ({ image }) => {
  const imageUrl = getStrapiMedia(image);

  return (
    <img
      key={image.id}
      src={imageUrl}
      alt={image.alternativeText || image.name}
      className="imgSwiper"
    />
  );
};

export default ImageSwiper;
