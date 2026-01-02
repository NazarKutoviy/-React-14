import React, { Component } from "react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
const API_KEY = "33027161-d89bfd7878d1ab614bd7e969e";
const PER_PAGE = 12;

class App extends Component {
  state = {
    query: "",
    images: [],
    page: 1,
    loading: false,
    showModal: false,
    largeImageURL: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;

    this.setState({ loading: true });

    try {
      const res = await fetch(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
      );

      const data = await res.json();

      this.setState((prev) => ({
        images: [...prev.images, ...data.hits],
        loading: false,
      }));
    } catch (error) {
      console.error("Error:", error);
      this.setState({ loading: false });
    }
  };

  handleSearch = (query) => {
    this.setState({ query, images: [], page: 1 });
  };

  loadMore = () => {
    this.setState(
      (prev) => ({ page: prev.page + 1 }),
      () => this.fetchImages()
    );
  };

  openModal = (largeImageURL) => {
    this.setState({ largeImageURL, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImageURL: "" });
  };

  render() {
    const { images, loading, showModal, largeImageURL } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />

        <ImageGallery images={images} onImageClick={this.openModal} />

        {loading && <Loader />}

        {images.length > 0 && !loading && <Button onClick={this.loadMore} />}

        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
