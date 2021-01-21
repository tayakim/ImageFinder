import React, { Component } from "react";
import Searchbar from "../searchbar/Searchbar";
import ImageGallery from "../imageGallery/ImageGallery";
// import ImageGalleryItem from "../imageGalleryItem/ImageGalleryItem";
import Loader from "../loader/Loader";
import Button from "../button/Button";
import Modal from "../modal/Modal";
import fetchImagesAPI from "../../services/API";

//pixabay.com/api/?q=что_искать&page=номер_страницы&key=19539916 - 67a6db161f09ee9bfd5c70184&image_type=photo&orientation=horizontal&per_page=12

export default class ImagineFinder extends Component {
  state = {
    images: [],
    pageNumber: 1,
    search: "",
    error: "",
    isLoading: false,
    isModalOpen: false,
    largeImageId: null,
    largeImage: [],
  };

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.fetchImages(false);
    }
  }

  onSearch = (search) => {
    this.setState({
      search,
      images: [],
      pageNumber: 1,
    });
  };

  fetchMoreImages = () => {
    this.fetchImages(true);
  };

  fetchImages = (scroll) => {
    this.setState({ isLoading: true });
    const { search, pageNumber } = this.state;
    fetchImagesAPI(search, pageNumber)
      .then((images) => {
        this.setState((state) => ({
          images: [...state.images, ...images],
          pageNumber: state.pageNumber + 1,
        }));
        return images[0];
      })
      .catch((error) => {
        this.setState({ error });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      })
      .then((firstLoadedImage) => {
        if (scroll) {
          const { id } = firstLoadedImage;

          const y =
            document.getElementById(id).getBoundingClientRect().top +
            window.scrollY -
            80;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      });
  };

  findImg = () => {
    const largeImg = this.state.images.find((image) => {
      return image.id === this.state.largeImageId;
    });
    return largeImg;
  };

  openModal = (e) => {
    this.setState({
      isModalOpen: true,
      largeImageId: Number(e.currentTarget.id),
    });
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { isLoading, images, isModalOpen, largeImageId } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.onSearch} />
        <ImageGallery openModal={this.openModal} images={images} />
        {isLoading && <Loader />}
        {/* <ImageGalleryItem /> */}

        <Button fetchImages={this.fetchMoreImages} />
        {isModalOpen && (
          <Modal largeImgId={largeImageId} onClose={this.closeModal}>
            <img src={this.findImg().largeImageURL} alt={this.findImg().tags} />{" "}
          </Modal>
        )}
      </div>
    );
  }
}
