import { Component } from 'react';
import { toast } from 'react-toastify';

import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.inputValue.trim() === '') {
      return toast.error('Enter correct search query!');
    }
    this.props.onFormSubmit(this.state.inputValue);
    this.setState({
      inputValue: '',
    });
  };

  onSearchInput = evt => {
    const value = evt.currentTarget.value;
    this.setState({ inputValue: value.toLowerCase() });
  };

  render() {
    const { handleSubmit, onSearchInput } = this;
    const { inputValue } = this.state;

    return (
      <Header className="searchbar">
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormBtn type="submit" className="button">
            <SearchFormLabel className="button-label">Search</SearchFormLabel>
          </SearchFormBtn>

          <SearchFormInput
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={inputValue}
            onChange={onSearchInput}
          />
        </SearchForm>
      </Header>
    );
  }
}
