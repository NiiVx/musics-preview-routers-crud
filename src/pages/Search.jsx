import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import Header from '../components/Header';
import { Container } from '../styles/Login';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      button: true,
      inputSearch: '',
      loading: false,
      results: '',
      albums: [],
    };
  }

  searchAlbum = () => {
    const { inputSearch } = this.state;
    this.setState({
      results: inputSearch, inputSearch: '', loading: true },
    async () => {
      const response = await searchAlbumsAPI(inputSearch);
      this.setState({
        albums: [...response],
        loading: false,
        button: true,
      });
    });
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
    const {
      inputSearch,
      button,
      albums,
      loading,
      results,
    } = this.state;
    return (
      <div data-testid="page-search" className="login-page-container">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <Container>

            {albums.length > 0
            && <p>{`Resultado de álbuns de: ${results}`}</p>}
            <form>
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
                onClick={ this.searchAlbum }
                disabled={ button }
              >
                Pesquisar
              </button>
              {albums
                .map((element) => (
                  <div key={ element.collectionId }>
                    <div>
                      <h3>
                        { element.artistName }
                      </h3>
                      <p>
                        { element.collectionName }
                      </p>
                      <img src={ element.artworkUrl100 } alt={ element.collectionName } />

                      <Link
                        to={ `/album/${element.collectionId}` }
                        data-testid={ `link-to-album-${element.collectionId}` }
                      >
                        <p>link para o album:</p>
                      </Link>
                    </div>
                  </div>))}
            </form>
          </Container>
        )}
      </div>
    );
  }
}
Search.propTypes = {
  albums: propTypes.arrayOf(),
  searchAlbum: propTypes.func,
  button: propTypes.bool,
  loading: propTypes.bool,
  onInputChange: propTypes.func,
  inputSearch: propTypes.string,
}.isRequired;
