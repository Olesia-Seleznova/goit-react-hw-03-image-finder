import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalDiv } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleCloseModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleCloseModal);
  }

  handleCloseModal = evt => {
    if (evt.code === 'Escape') {
      this.props.onModalClose();
    }
  };

  handleBackdropClose = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      this.props.onModalClose();
    }
  };

  render() {
    const { handleBackdropClose } = this;
    const { img, alt } = this.props;

    return (
      <Overlay onClick={handleBackdropClose}>
        <ModalDiv>
          <img src={img} alt={alt} />
        </ModalDiv>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  img: PropTypes.string,
  alt: PropTypes.string,
  handleBackdropClose: PropTypes.func,
};
