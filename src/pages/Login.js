import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GET_EMAIL_USER } from '../helpers/constants';
import formValidator from '../helpers/formValidator';

class Login extends React.Component {
  state = {
    inputEmail: '',
    inputPassword: '',
    isDisabled: true,
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      this.setState((prevState) => ({
        isDisabled: !formValidator(prevState),
      }));
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { dispatch, history: { push } } = this.props;
    const { inputEmail } = this.state;

    dispatch(({ type: GET_EMAIL_USER, payload: inputEmail }));

    push('/carteira');
  }

  render() {
    const { inputEmail, inputPassword, isDisabled } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="inputEmail">
          Email:
          <input
            data-testid="email-input"
            type="text"
            name="inputEmail"
            id="inputEmail"
            value={ inputEmail }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="inputPassword">
          Senha:
          <input
            data-testid="password-input"
            type="inputPassword"
            name="inputPassword"
            id="inputPassword"
            value={ inputPassword }
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="submit"
          disabled={ isDisabled }
        >
          Entrar

        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
