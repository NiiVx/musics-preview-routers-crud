import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Login from '../pages/Login';
import Search from '../pages/Search';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import NotFound from '../pages/NotFound';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputName: '',
      musics: [],
      nameArtist: '',
      nameAlbum: '',
      buttonOn: true,
      loading: false,
      redirect: false,
    };
  }

  onLoginInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value,
    }, () => {
      const INPUT_LENGTH = 3;
      const { inputName } = this.state;
      if (inputName.length >= INPUT_LENGTH) {
        this.setState({
          buttonOn: false,
        });
      } else {
        this.setState({
          buttonOn: true,
        });
      }
    });
  }

  onLoginButtonClick = () => {
    const { inputName } = this.state;
    this.setState({ loading: true }, async () => {
      await createUser({ name: inputName });
      this.setState({ loading: false, redirect: true });
    });
  }

  render() {
    const {
      inputName,
      musics,
      nameAlbum,
      nameArtist,
      buttonOn, redirect, loading } = this.state;
    return (
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Login
              { ...props }
              button={ buttonOn }
              inputName={ inputName }
              onLoginInputChange={ this.onLoginInputChange }
              onLoginButtonClick={ this.onLoginButtonClick }
              loading={ loading }
            />
            ) }
          >
            {redirect && <Redirect to="/search" /> }
          </Route>
          <Route exact path="/search" render={ () => <Search /> } />
          <Route
            exact
            path="/album/:id"
            render={ (props) => (
              <Album
                { ...props }
                musics={ musics }
                nameAlbum={ nameAlbum }
                nameArtist={ nameArtist }
              />
            ) }
          />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </main>
    );
  }
}
