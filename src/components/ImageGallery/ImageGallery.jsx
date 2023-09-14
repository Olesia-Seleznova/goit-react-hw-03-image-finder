import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGallery/ImageGalleryItem/ImageGalleryItem';

import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ items, clicks }) => {
  return (
    <Gallery>
      {items.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            src={webformatURL}
            dataSrc={largeImageURL}
            tags={tags}
            onClick={clicks}
          />
        );
      })}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.array,
  clicks: PropTypes.func,
};
