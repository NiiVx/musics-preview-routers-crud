import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      albums: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getMusicFromApi();
  }

  componentWillUnmount() {
    this.getMusicFromApi();
  }

  getMusicFromApi = () => {
    const { match } = this.props;
    const { id } = match.params;
    this.setState({ loading: true }, async () => {
      const request = await getMusics(id);
      this.setState({ albums: [...request], loading: false });
    });
  }

  render() {
    const { loading, albums } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {albums.length === 0 || loading ? <Loading /> : (
          <section>
            <p data-testid="artist-name">{albums[0].artistName}</p>
            <p data-testid="album-name">{albums[0].collectionName}</p>
            {albums.map((album, index) => (
              <section
                key={ index }
              >
                { album.trackName !== undefined && (
                  <MusicCard
                    trackName={ album.trackName }
                    previewUrl={ album.previewUrl }
                    trackId={ album.trackId }
                  />
                )}
              </section>))}
          </section>
        )}
      </div>
    );
  }
}

Album.propTypes = ({
  collectionId: propTypes.string,
}).isRequired;

export default Album;
