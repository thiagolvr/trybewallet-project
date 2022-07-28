import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import currencyAPI from '../services/currencyAPI';
import { GET_CURRENCIES } from '../helpers/constants';

class WalletForm extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    const currencies = await currencyAPI();
    dispatch({ type: GET_CURRENCIES, payload: currencies });
  }

  render() {
    const { currencies } = this.props;
    return (
      <form className="wallet-form">
        <label htmlFor="inputExpense">
          Digite uma despesa:
          {' '}
          <input
            data-testid="value-input"
            type="text"
            name="inputExpense"
            id="inputExpense"
          />
        </label>
        <label htmlFor="inputDescriptionExpense">
          Digite uma descrição:
          {' '}
          <input
            data-testid="description-input"
            type="text"
            name="inputDescriptionExpense"
            id="inputDescriptionExpense"
          />
        </label>
        <label htmlFor="inputCurrency">
          Selecione uma moeda:
          {' '}
          <select
            data-testid="currency-input"
            name="inputCurrency"
            id="inputCurrency"
          >
            {
              currencies.map((currency, index) => (
                <option key={ index } value={ currency }>{currency}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="inputPaymentMethod">
          Forma de pagamento:
          {' '}
          <select
            data-testid="method-input"
            name="inputPaymentMethod"
            id="inputPaymentMethod"
          >
            <option value="cash">Dinheiro</option>
            <option value="creditCard">Cartão de crédito</option>
            <option value="debitCard">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="inputTag">
          Tag:
          {' '}
          <select
            data-testid="tag-input"
            name="inputTag"
            id="inputTag"
          >
            <option value="cash">Alimentação</option>
            <option value="creditCard">Lazer</option>
            <option value="debitCard">Trabalho</option>
            <option value="debitCard">Transporte</option>
            <option value="debitCard">Saúde</option>
          </select>
        </label>
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
