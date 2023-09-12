import React from 'react';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ src, tags, dataSrc, onClick }) => {
  return (
    <GalleryItem onClick={onClick}>
      <GalleryImg src={src} data-src={dataSrc} alt={tags} />
    </GalleryItem>
  );
};
