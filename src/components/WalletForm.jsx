import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currencyAPI, currencyAPIComplete } from '../services/currencyAPI';
import {
  GET_CURRENCIES,
  GET_EXPENSES,
  RELOAD_VALUES,
} from '../helpers/constants';

class WalletForm extends Component {
  state = {
    value: '',
    currency: 'USD',
    method: 'Cartão de crédito',
    tag: 'Alimentação',
    description: '',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const currencies = await currencyAPI();
    dispatch({ type: GET_CURRENCIES, payload: currencies });
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const currencyQuotes = await currencyAPIComplete();
    const expense = { ...this.state, exchangeRates: currencyQuotes };

    const { dispatch } = this.props;
    dispatch({ type: GET_EXPENSES, payload: expense });
    dispatch({ type: RELOAD_VALUES });

    this.setState({ value: '', description: '' });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <form className="wallet-form" onSubmit={ this.handleSubmit }>
        <label htmlFor="value">
          Digite um valor:
          {' '}
          <input
            data-testid="value-input"
            type="number"
            id="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description">
          Digite uma descrição:
          {' '}
          <input
            data-testid="description-input"
            type="text"
            id="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currency">
          Selecione uma moeda:
          {' '}
          <select
            data-testid="currency-input"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((currencyName, index) => (
              <option key={ index }>{currencyName}</option>
            ))}
          </select>
        </label>

        <label htmlFor="method">
          Forma de pagamento:
          {' '}
          <select
            data-testid="method-input"
            id="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Tag:
          {' '}
          <select
            data-testid="tag-input"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }
}
WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => wallet;

export default connect(mapStateToProps)(WalletForm);
