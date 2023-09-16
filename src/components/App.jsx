import React from 'react';
import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppSection } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from 'api/API';

export class App extends Component {
  state = {
    items: [],
    totalItems: 0,
    page: 1,
    inputValue: '',
    loading: false,
    error: false,
    showModal: false,
    modalImageSrc: '',
    modalImageAlt: '',
  };

  handleSubmit = inputValue => {
    this.setState({
      inputValue,
      items: [],
      page: 1,
      totalItems: 0,
    });
  };

  hendlerLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleClick = (src, alt) => {
    this.setState({
      showModal: true,
      modalImageSrc: src,
      modalImageAlt: alt,
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, inputValue } = this.state;
    if (prevState.inputValue !== inputValue || prevState.page !== page) {
      this.setState({ loading: true });

      fetchImages(inputValue, page)
        .then(({ hits, totalHits }) => {
          if (!hits.length) {
            toast.error(
              `OOOps... no picture requested "${this.state.inputValue}"`
            );
            return;
          }
          this.setState(prevState => ({
            items: [...prevState.items, ...hits],
            totalItems: totalHits,
          }));
        })
        .catch(erorr => this.setState({ erorr: erorr.message }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const {
      items,
      error,
      loading,
      showModal,
      modalImageSrc,
      modalImageAlt,
      totalItems,
    } = this.state;
    const { handleClick, hendlerLoadMore, handleSubmit, closeModal } = this;

    return (
      <AppSection>
        <Searchbar onFormSubmit={handleSubmit}>
          {error && !loading && (
            <h1>Oooops... Something went wrong. Try reloading the page!</h1>
          )}
        </Searchbar>
        <ImageGallery items={items} clicks={handleClick} />

        {loading && <Loader />}
        {totalItems !== items.length && <Button loadMore={hendlerLoadMore} />}

        {showModal && (
          <Modal
            img={modalImageSrc}
            alt={modalImageAlt}
            onModalClose={closeModal}
          >
            {' '}
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </AppSection>
    );
  }
}
