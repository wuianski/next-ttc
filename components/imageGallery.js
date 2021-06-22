import { getStrapiMedia } from "../lib/media";

const ImageGallery = ({ image, description }) => {
  const imageUrl = getStrapiMedia(image);

  return (
    <a
      key={image.id}
      className="gallery-item"
      data-src={imageUrl}
      data-sub-html={description}
    >
      <img
        className="img-responsive"
        src={imageUrl}
        alt={image.alternativeText || image.name}
      />
    </a>
  );
};

export default ImageGallery;
