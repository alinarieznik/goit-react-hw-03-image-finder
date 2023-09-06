import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchImages } from '../api';
import Notiflix from 'notiflix';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    error: null,
    total: 0,
  };

  handleFormSubmit = query => {
    console.log(query);
    // evt.preventDefault();
    // console.log(evt);
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

  // async componentDidMount() {
  //   try {
  //     const images = await fetchImages(this.state.query, this.state.page);
  //     console.log(images.hits);
  //     this.setState({ images: images.hits });
  //   } catch (error) {
  //     console.error('Error');
  //   }
  // }

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

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.state.loading && <h1>Loading...</h1>}
        {this.state.error && Notiflix.Notify.warning('Sorry, try again')}
        {this.state.images.length > 0 && (
          <ImageGallery>
            <ImageGalleryItem images={this.state.images} />
          </ImageGallery>
        )}
        {this.state.total > this.state.images.length && (
          <Button onClick={this.handleLoadMore} />
        )}
      </div>
    );
  }
}

export default App;
