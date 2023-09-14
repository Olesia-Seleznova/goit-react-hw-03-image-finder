import React from 'react';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ src, tags, dataSrc, onClick }) => {
  const handleClick = () => {
    onClick(dataSrc, tags);
  };
  return (
    <GalleryItem>
      <GalleryImg src={src} alt={tags} onClick={handleClick} />
    </GalleryItem>
  );
};
