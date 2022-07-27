import React, { useState, useEffect } from 'react';
import PropType from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

function MusicCard(props) {
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    handleFavoriteMusics();
  }, []);

  handleFavoriteMusics = async () => {
    setLoading(true);
    const favoriteSongs = await getFavoriteSongs();
    setFavorites(favoriteSongs);
    setLoading(false);
    const { album: { trackName } } = props;
    const isFavorite = favorites.find((music) => (
      music.trackName === trackName
    ));
    if (isFavorite) {
      setCheck(true);
    }
  };

  addFavoriteSong = async () => {
    setLoading(true);
    const { album } = props;
    await addSong(album);
    setCheck(true);
    setLoading(false);
  };

  removeFavoriteMusic = async () => {
    const { album, removeMusic } = props;
    setLoading(true);
    await removeSong(album);
    if (typeof removeMusic === 'function') removeMusic(album);
    setLoading(false);
    setCheck(false);
  };

  handleChange = (event) => {
    const { target: { checked } } = event;
    if (checked) {
      addFavoriteSong();
    } else {
      removeFavoriteMusic();
    }
  };

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
                  (event) => { handleChange(event); }
                }
              />
            </label>
          </section>
        )}
    </div>

  );
}
MusicCard.propTypes = {
  album: PropType.shape({
    trackName: PropType.string,
    previewUrl: PropType.string,
    trackId: PropType.number,
  }),
}.isRequired;
