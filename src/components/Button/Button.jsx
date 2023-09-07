import { StyledButtonLoadMore } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <StyledButtonLoadMore onClick={onClick}>Load more</StyledButtonLoadMore>
  );
};
