import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

class Login extends React.Component {
  render() {
    const {
      inputName,
      buttonOn,
      loading,
      onLoginInputChange,
      onLoginButtonClick } = this.props;
    return (
      <div data-testid="page-login">

        {loading
          ? <Loading />
          : (
            <>
              <p>
                Page Login:
              </p>
              <form>
                <input
                  type="text"
                  data-testid="login-name-input"
                  placeholder="Write your name here"
                  value={ inputName }
                  name="inputName"
                  onChange={ onLoginInputChange }
                />
                <button
                  type="submit"
                  disabled={ buttonOn }
                  data-testid="login-submit-button"
                  onClick={ onLoginButtonClick }
                >
                  Entrar
                </button>
              </form>

            </>)}
      </div>);
  }
}
Login.propTypes = {
  onLoginInputChange: PropTypes.func,
  onLoginButtonClick: PropTypes.func,
  inputName: PropTypes.string,
  button: PropTypes.bool,
  loading: PropTypes.bool,
}.isRequired;

export default Login;
