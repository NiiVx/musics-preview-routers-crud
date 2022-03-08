import React from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      button: true,
    };
  }

  onButtonClick = () => {
    const { name } = this.state;
    createUser({ name });
    this.setState({
      button: true,
      name: '' });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    const MIN = 3;
    this.setState({
      [name]: value,
    }, () => {
      if (value.length >= MIN) {
        this.setState({ button: false });
      }
    });
  }

  render() {
    const { name, button } = this.state;
    return (
      <Link to="/" data-testid="page-login">
        <div>
          Page Login:
        </div>
        <form>
          <label htmlFor="page-login">
            <input
              type="text"
              id="login"
              data-testid="login-name-input"
              placeholder="Write your name here"
              name="name"
              value={ name }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            onClick={ this.onButtonClick }
            disabled={ button }
          >
            Entrar
          </button>
        </form>
      </Link>);
  }
}

export default Login;
