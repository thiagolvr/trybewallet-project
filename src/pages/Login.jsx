import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GET_EMAIL_USER } from '../helpers/constants';
import formValidator from '../helpers/formValidator';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const dispatch = useDispatch();
  const { push } = useHistory();

  const handleChange = ({ target: { id, value } }) => (
    id === 'inputEmail'
      ? setEmail(value)
      : setPassword(value)
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({ type: GET_EMAIL_USER, payload: email });

    push('/carteira');
  };

  useEffect(() => {
    setIsDisabled(!formValidator(email, password));
  }, [email, password]);

  return (
    <form className="form-login" onSubmit={ handleSubmit }>

      <label htmlFor="inputEmail">
        Email:
        {' '}
        <input
          data-testid="email-input"
          type="text"
          id="inputEmail"
          value={ email }
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="inputPassword">
        Senha:
        {' '}
        <input
          data-testid="password-input"
          type="inputPassword"
          id="inputPassword"
          value={ password }
          onChange={ handleChange }
        />
      </label>

      <button
        className="form-login-button"
        type="submit"
        disabled={ isDisabled }
      >
        Entrar
      </button>

    </form>
  );
}

export default Login;
