import { getStrapiMedia } from "../lib/media";

const ImageGallery = ({ image, description, order }) => {
  const imageUrl = getStrapiMedia(image);

  return (
    <a
      key={order}
      className="gallery-item"
      data-src={imageUrl}
      data-sub-html={description}
    >
      <img
        key={order}
        className="img-responsive"
        src={imageUrl}
        alt={image.alternativeText || image.name}
      />
    </a>
  );
};

export default ImageGallery;
