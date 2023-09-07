import { Component } from 'react';
import { createPortal } from 'react-dom';
import { StyledBackdrop, StyledModal, StyledImg } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscClose);
  }

  onEscClose = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <StyledBackdrop onClick={this.handleBackdropClick}>
        <StyledModal>
          <StyledImg src={this.props.largeImageURL} alt={this.props.tags} />
        </StyledModal>
      </StyledBackdrop>,
      modalRoot
    );
  }
}

// render() {
//   return createPortal(
//     <div className={css.overlay} onClick={this.handleBackdropClick}>
//       <div className={css.modal}>
//         {this.props.images.map(({ largeImageURL, id, tags }) => {
//           console.log(this.props);
//           return <img key={id} src={largeImageURL} alt={tags} />;
//         })}
//       </div>
//     </div>,
//     modalRoot
//   );
// }
