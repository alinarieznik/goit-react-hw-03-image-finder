import { Component } from 'react';
import Notiflix from 'notiflix';
import { SiGooglebigquery } from 'react-icons/si';
import {
  StyledHeader,
  StyledSearchForm,
  StyledSearchButton,
  StyledInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleQueryChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      Notiflix.Notify.warning('Please, fill the main field');
      return;
    }

    this.props.onSubmit(this.state.query);
    // this.setState({ query: '' });
  };

  render() {
    return (
      <StyledHeader>
        <StyledSearchForm onSubmit={this.handleSubmit}>
          <StyledSearchButton type="submit">
            <SiGooglebigquery />
          </StyledSearchButton>
          <StyledInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleQueryChange}
          />
        </StyledSearchForm>
      </StyledHeader>
    );
  }
}

export default Searchbar;
