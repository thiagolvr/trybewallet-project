/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { SAVE_EXPENSE, RELOAD_VALUES } from '../helpers/constants';

class EditWalletForm extends React.Component {
  constructor({ expenseToEdit:
     { value, description, currency, method, tag, exchangeRates } }) {
    super({ expenseToEdit: { value, description, currency, method, tag } });
    this.state = {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
  }

  handleChange = ({ target: { name, value: valueInput } }) => {
    this.setState({ [name]: valueInput });
  };

  handleSubmit = (e, id, expense) => {
    e.preventDefault();

    const { dispatch } = this.props;
    dispatch({ type: SAVE_EXPENSE, payload: { ...expense, id } });

    dispatch({ type: RELOAD_VALUES });
  }

  render() {
    const { currencies, expenseToEdit: { id } } = this.props;
    const { value, description, currency, method, tag } = this.state;
    console.log(id);

    return (
      <form
        className="wallet-form"
        onSubmit={ (e) => this.handleSubmit(e, id, this.state) }
      >

        <label htmlFor="value">
          Digite um valor:
          {' '}
          <input
            data-testid="value-input"
            type="number"
            name="value"
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
            name="description"
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
            name="currency"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }

          >
            {
              currencies.map((currencyName, index) => (
                <option key={ index }>{currencyName}</option>
              ))
            }
          </select>
        </label>

        <label htmlFor="method">
          Forma de pagamento:
          {' '}
          <select
            data-testid="method-input"
            name="method"
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
            name="tag"
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

        <button type="submit">Editar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet }) => wallet;

export default connect(mapStateToProps)(EditWalletForm);
