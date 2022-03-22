import React, { Component } from 'react';
import PropType from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      check: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.handleFavoritesMusics();
  }

  handleFavoritesMusics = async () => {
    this.setState({ loading: true });
    const musicsSaved = await getFavoriteSongs();
    this.setState({ loading: false, favorites: musicsSaved });
  }

  addFavoriteSong = async () => {
    this.setState({ loading: true });
    const { album } = this.props;
    await addSong(album);
    this.setState({ loading: false, check: true });
  }

  removeFavoriteMusic = async () => {
    const { removeMusic, album } = this.props;
    this.setState({ loading: true });
    await removeSong(album);
    if (typeof removeMusic === 'function') removeMusic(album);
    this.setState({ loading: false, check: false });
  }

  handleChange = (event) => {
    const { target: { checked } } = event;
    if (checked) {
      this.addFavoriteSong();
    } else {
      this.removeFavoriteMusic();
    }
  }

  render() {
    const { album: { trackName, previewUrl, trackId } } = this.props;
    const { loading, check } = this.state;
    return (
      <div>
        {loading
          ? <Loading />
          : (
            <section>
              <h4>{trackName}</h4>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
              </audio>
              <label htmlFor="favorites">
                Favorita
                <input
                  id="favorites"
                  type="checkbox"
                  checked={ check }
                  data-testid={ `checkbox-music-${trackId}` }
                  onChange={
                    (event) => { this.handleChange(event); }
                  }
                />
              </label>
            </section>
          )}
      </div>

    );
  }
}

MusicCard.propTypes = {
  track: PropType.shape({
    trackName: PropType.string,
    previewUrl: PropType.string,
    trackId: PropType.number,
  }),
  removeMusic: PropType.func,
}.isRequired;
