import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  render() {
    return (<Link to="/" data-testid="page-login"><div>Home</div></Link>);
  }
}

export default Login;
