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
    this.getUserName();
  }

  componentWillUnmount() {
    this.getUserName();
  }

  async getUserName() {
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      const { name } = user;
      this.setState({ userName: name, loading: false });
    });
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
        <nav>
          <Link to="/search" data-testid="link-to-search">   -- Search  --  </Link>
          <Link to="/favorites" data-testid="link-to-favorites"> Favorites-- </Link>
          <Link to="/profile" data-testid="link-to-profile"> --Profile-- </Link>
        </nav>
      </header>
    );
  }
}
