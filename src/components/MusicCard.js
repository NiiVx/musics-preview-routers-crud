import React from 'react';
import PropTypes from 'prop-types';
import './MusicCard.css';

export default class MusicCard extends React.Component {
  render() {
    const {
      trackName, previewUrl, trackId, favoriteCheck, onFavoriteChange } = this.props;
    return (
      <div className="parent">
        <h3>{trackName}</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor="Favorita">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="Favorita"
            checked={ favoriteCheck }
            onChange={ onFavoriteChange }
          />
        </label>
      </div>);
  }
}
MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  onFavoriteChange: PropTypes.func.isRequired,
  favoriteCheck: PropTypes.bool.isRequired,
};
