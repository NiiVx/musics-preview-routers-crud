import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputSearch: '',
      button: true,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    const MIN = 2;
    this.setState({
      [name]: value,
    }, () => {
      if (value.length >= MIN) {
        this.setState({ button: false });
      }
    });
  }

  render() {
    const { inputSearch, button } = this.state;
    return (
      <div>
        <Link to="/search" data-testid="page-search">
          <Header />
          <div>Search</div>
        </Link>
        <input
          type="text"
          id="search"
          data-testid="search-artist-input"
          placeholder="Digite o nome da banda ou artista a ser pesquisada."
          name="inputSearch"
          value={ inputSearch }
          onChange={ this.onInputChange }
        />
        <button
          type="submit"
          data-testid="search-artist-button"
          onClick={ this.onButtonClick }
          disabled={ button }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
