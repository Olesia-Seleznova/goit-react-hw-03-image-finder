import { Component } from 'react';

import {
  Form,
  SearchFormBtn,
  SearchFormLabel,
  SearchFormInput,
} from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    inputValue: '',
  };

  onSearchInput = evt => {
    const value = evt.currentTarget.value;
    this.setState({ inputValue: value });
  };

  render() {
    const { onFormSubmit } = this.props;
    const { onSearchInput } = this;
    const { inputValue } = this.state;

    return (
      <Form
        onSubmit={evt => {
          evt.preventDefault();
          onFormSubmit(inputValue);
        }}
      >
        <SearchFormBtn>
          <SearchFormLabel>Search</SearchFormLabel>
        </SearchFormBtn>
        <SearchFormInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={this.state.inputValue}
          onChange={onSearchInput}
        />
      </Form>
    );
  }
}
