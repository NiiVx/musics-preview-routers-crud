import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musics: [],
      nameArtist: '',
      nameAlbum: '',
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
  }

  render() {
    const { musics, nameAlbum, nameArtist } = this.state;
    return (
      <div>
        <Header />
        <Link to="/album/:id" data-testid="page-album" />
        <div>
          Page Album!
          {<p data-testid="artist-name">{nameArtist}</p>}
          {<p data-testid="album-name">{nameAlbum}</p>}
          <section>
            {musics.slice(1).map((music) => (
              <MusicCard
                key={ music.artistId }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
              />
            ))}
          </section>
        </div>
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.string.isRequired,
};
