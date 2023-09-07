import { StyledImageItem, StyledImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images, onClick }) => {
  return images.map(({ largeImageURL, webformatURL, tags, id }) => {
    return (
      <StyledImageItem key={id} onClick={() => onClick(largeImageURL, tags)}>
        <StyledImg src={webformatURL} alt={tags} />
      </StyledImageItem>
    );
  });
};
