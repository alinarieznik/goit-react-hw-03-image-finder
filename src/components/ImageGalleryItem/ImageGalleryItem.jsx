export const ImageGalleryItem = ({ images }) => {
  return images.map(({ largeImageURL, webformatURL, tags, id }) => {
    return (
      <li key={id} className="gallery-item">
        <img src={webformatURL} alt={tags} />
      </li>
    );
  });
};
