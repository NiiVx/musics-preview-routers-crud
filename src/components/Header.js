import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.getUserName();
  }

  async getUserName() {
    const user = await getUser();
    const { name } = user;
    this.setState({ userName: name });
    this.setState({ loading: false });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading
          ? <Loading />
          : (
            <h1 data-testid="header-user-name">{`User: ${userName}!`}</h1>
          )}
        <Link to="/search" data-testid="link-to-search">   -- Search  --  </Link>
        <Link to="/favorites" data-testid="link-to-favorites"> Favorites-- </Link>
        <Link to="/profile" data-testid="link-to-profile"> --Profile-- </Link>
      </header>
    );
  }
}
