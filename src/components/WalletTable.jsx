import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  EDIT_EXPENSE,
  RELOAD_VALUES,
  REMOVE_EXPENSE,
} from '../helpers/constants';

class WalletTable extends React.Component {
  handleClick = ({ target: { name } }, id, value) => {
    const { dispatch } = this.props;
    return name === 'delete'
      ? dispatch({ type: REMOVE_EXPENSE, payload: { id, value } })
          + dispatch({ type: RELOAD_VALUES })
      : dispatch({ type: EDIT_EXPENSE, payload: { id, value } })
          + dispatch({ type: RELOAD_VALUES });
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => {
              const { value } = expense;
              const { name, ask } = expense.exchangeRates[expense.currency];
              const sum = +ask * +value;

              return (
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{(+value).toFixed(2)}</td>
                  <td>{name}</td>
                  <td>{(+ask).toFixed(2)}</td>
                  <td>{sum.toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="edit-btn"
                      type="button"
                      name="edit"
                      onClick={ (e) => this.handleClick(e, expense.id) }
                    >
                      Editar
                    </button>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      name="delete"
                      onClick={
                        (e) => this.handleClick(e, expense.id, +expense.value * ask)
                      }
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

WalletTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ wallet }) => wallet;

export default connect(mapStateToProps)(WalletTable);
