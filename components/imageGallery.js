const ImageGallery = ({ drawing }) => {
  return (
    <a
      key={drawing.order}
      className="gallery-item"
      data-src={drawing.url}
      data-sub-html={drawing.description}
    >
      <img
        key={drawing.order}
        className="img-responsive"
        src={drawing.url}
        alt={drawing.alt}
      />
    </a>
  );
};

export default ImageGallery;
