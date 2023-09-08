// import React from 'react';
import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AppSection } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { SearchForm } from './Searchbar/SearchForm/SearchForm';
import { ImageGalleryItem } from './ImageGallery/ImageGalleryItem/ImageGalleryItem';
import { fetchImages } from 'api/API';

export class App extends Component {
  state = {
    items: [],
    page: 1,
    inputValue: '',
    loading: false,
    error: false,
    showModal: false,
    modalImageSrc: '',
  };

  handlerSubmit = evt => {
    evt.preventDefault();
    if (this.state.inputValue.trim() === '') {
      toast.error('Write correct search query!');
      return;
    }
    this.props.onSubmit(this.state.inputValue);
    this.setState({
      inputValue: evt.target.elements.inputValue.value,
      items: [],
      page: 1,
    });
  };

  hendlerLoadMore = () => {
    this.setState(pevState => ({
      page: pevState.page + 1,
    }));
  };

  openModal = src => {
    this.setState({
      showModal: true,
      modalImageSrc: src,
    });
  };

  closeModal = () => {
    this.setState({ showModal: false, modalImageSrc: '' });
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, inputValue } = this.state;
    if (prevState.inputValue !== inputValue || prevState.page !== page) {
      this.setState({ loading: true });

      fetchImages(inputValue, page)
        .then(({ images }) => {
          this.setState(({ items }) => ({ items: [...items, ...images] }));
          if (images.length < 12) {
            toast.error(
              `OOOps... no picture requested "${this.state.inputValue}"`
            );
            return;
          }
        })
        .catch(erorr => this.setState({ erorr: erorr.message }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { items, loading, showModal, modalImageSrc } = this.state;
    const { hendlerLoadMore, handlerSubmit, closeModal } = this;

    return (
      <AppSection>
        <Searchbar>
          <SearchForm onFormSubmit={handlerSubmit} />
        </Searchbar>
        <ImageGallery>
          <ImageGalleryItem />
        </ImageGallery>
        {loading && <Loader />}
        {items.length > 0 && <Button loadMore={hendlerLoadMore} />}
        <ToastContainer autoClose={3000} />
        {showModal && <Modal url={modalImageSrc} close={closeModal} />}
      </AppSection>
    );
  }
}
