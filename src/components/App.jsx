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
    totalItems: null,
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
    });
  };

  hendlerLoadMore = () => {
    this.setState(pevState => ({
      page: pevState.page + 1,
    }));
  };

  handleClick = evt => {
    const modalSrc = evt.target.dataset.src;
    const modalAlt = evt.target.alt;
    this.setState({
      showModal: true,
      modalImageSrc: modalSrc,
      modalImageAlt: modalAlt,
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
    const { items, error, loading, showModal, modalImageSrc, modalImageAlt } =
      this.state;
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
        {items.length > 0 && <Button loadMore={hendlerLoadMore} />}

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
