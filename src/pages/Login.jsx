import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { createUser } from '../services/userAPI';
import { Container, Title, Input, Button } from '../styles/Login';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      button: true,
      loading: false,
    };
  }

  onButtonClick = async () => {
    this.setState({ loading: true });
    const { name } = this.state;
    const { history } = this.props;
    this.setState({
      button: true,
      name: '' });
    await createUser({ name: `${name}` });
    history.push('/search');
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
    const { name, button, loading } = this.state;
    return (
      <Container data-testid="page-login">

        {loading
          ? <Loading />
          : (
            <>
              <Title className="login-logo">
                Page Login:
              </Title>
              <div>
                <form>
                  <Input
                    type="text"
                    id="login"
                    data-testid="login-name-input"
                    placeholder="Write your name here"
                    name="name"
                    value={ name }
                    onChange={ this.onInputChange }
                  />
                  <Button
                    type="submit"
                    data-testid="login-submit-button"
                    onClick={ this.onButtonClick }
                    disabled={ button }
                  >
                    Entrar
                  </Button>
                </form>
              </div>

            </>)}
      </Container>);
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
