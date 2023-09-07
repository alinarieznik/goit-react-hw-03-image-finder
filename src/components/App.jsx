import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import { fetchImages } from './api';
import Notiflix from 'notiflix';
import { StyledApp } from './App.styled';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    error: null,
    total: 0,
    showModal: false,
    modalImage: null,
    modalImageAlt: null,
  };

  async componentDidUpdate(pProps, pState) {
    if (pState.query !== this.state.query || pState.page !== this.state.page) {
      try {
        this.setState({ loading: true });
        const images = await fetchImages(this.state.query, this.state.page);
        this.setState({
          images: [...this.state.images, ...images.hits],
          total: images.totalHits,
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleFormSubmit = query => {
    this.setState({
      query: query,
      images: [],
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(pState => ({
      page: pState.page + 1,
    }));
  };

  toggleModal = (largeImageURL, tags) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalImage: largeImageURL,
      modalImageAlt: tags,
    }));
  };

  render() {
    return (
      <StyledApp>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.state.error && Notiflix.Notify.warning('Sorry, try again')}
        {this.state.images.length > 0 && (
          <ImageGallery>
            <ImageGalleryItem
              images={this.state.images}
              onClick={this.toggleModal}
            />
          </ImageGallery>
        )}
        {this.state.loading && <Loader />}
        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImageURL={this.state.modalImage}
            tags={this.state.modalImageAlt}
          />
        )}
        {this.state.total > this.state.images.length &&
          !this.state.loading &&
          this.state.images.length > 0 && (
            <Button onClick={this.handleLoadMore} />
          )}
      </StyledApp>
    );
  }
}

export default App;
