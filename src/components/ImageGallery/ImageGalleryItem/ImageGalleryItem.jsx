import React from 'react';
import PropTypes from 'prop-types';

import { GalleryItem, ImageGalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images, clicks }) => {
  if (images.length) {
    const items = images.map(({ id, webformatURL, largeImageURL }) => {
      return (
        <GalleryItem key={id} onClick={clicks(largeImageURL)}>
          <ImageGalleryItemImage
            alt="img"
            src={webformatURL}
            srcLarge={largeImageURL}
          />
        </GalleryItem>
      );
    });
    return items;
  }
};

ImageGalleryItem.propTypes = {
  images: PropTypes.array,
  clicks: PropTypes.func,
};
