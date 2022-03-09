import React from 'react';
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
          : (<p data-testid="header-user-name">{userName}</p>)}
      </header>
    );
  }
}
