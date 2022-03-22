import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.handleFavoriteMusics();
  }

  removeMusic = (album) => {
    this.setState({ loading: true });
    const { favorites } = this.state;
    const filteredSongs = favorites.filter((music) => music !== album);
    this.setState({ favorites: filteredSongs, loading: false });
  }

  handleFavoriteMusics = async () => {
    this.setState({ loading: true });
    const test = await getFavoriteSongs();
    this.setState({ loading: false, favorites: test });
  }

  render() {
    const { loading, favorites } = this.state;
    console.log(favorites);
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <Loading /> : (
          <section>
            {favorites.map((album, index) => (
              <section
                key={ index }
              >
                { album.trackName !== undefined && (
                  <MusicCard
                    trackName={ album.trackName }
                    previewUrl={ album.previewUrl }
                    trackId={ album.trackId }
                    album={ album }
                    removeMusic={ this.removeMusic }
                  />
                )}
              </section>))}
          </section>
        )}
      </div>);
  }
}
