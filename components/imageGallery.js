import { getStrapiMedia } from "../lib/media";

const ImageGallery = ({ image, description }) => {
  const imageUrl = getStrapiMedia(image);

  return (
    <a
      key={image.order}
      className="gallery-item"
      data-src={imageUrl}
      data-sub-html={description}
    >
      <img
        key={image.id}
        className="img-responsive"
        src={imageUrl}
        alt={image.alternativeText || image.name}
      />
    </a>
  );
};

export default ImageGallery;
