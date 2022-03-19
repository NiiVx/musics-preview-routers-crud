import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musics: [],
      nameArtist: '',
      nameAlbum: '',
      favoriteCheck: false,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const resultApi = await getMusics(match.params.id);
    this.setState({
      musics: resultApi,
      nameArtist: resultApi.at(0).artistName,
      nameAlbum: resultApi.at(0).collectionName,
    });
    await addSong({ song: `${resultApi.at(0).trackId}` });
  }

  onFavoriteChange = ({ target }) => {
    const { name } = target;
    console.log(name);
    this.setState({ favoriteCheck: true });
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value });
  }

  render() {
    const { musics, nameAlbum, nameArtist, favoriteCheck } = this.state;
    return (
      <div>
        <Header />
        <Link to="/album/:id" data-testid="page-album" />
        <div>
          Page Album!
          {<p data-testid="artist-name">{nameArtist}</p>}
          {<p data-testid="album-name">{nameAlbum}</p>}
          <section>
            {musics.slice(1).map((music, index) => (
              <MusicCard
                key={ index }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                checked={ favoriteCheck }
                onclick={ this.onFavoriteChange }
              />
            ))}
          </section>
        </div>
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
