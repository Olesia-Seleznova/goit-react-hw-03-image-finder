import React from 'react';
import PropTypes from 'prop-types';
import { BtnLoad } from './Button.styled';

export const Button = ({ loadMore }) => {
  return (
    <BtnLoad type="button" onClick={loadMore}>
      Load more
    </BtnLoad>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func,
};
