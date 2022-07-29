import {
  GET_CURRENCIES, GET_EXPENSES, GET_TOTAL_VALUE_EXPENSES,
} from '../../helpers/constants';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  totalValueExpenses: 0,
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: payload,
    };

  case GET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, { id: state.idToEdit, ...payload }],
      idToEdit: state.idToEdit + 1,
    };

  case GET_TOTAL_VALUE_EXPENSES:
    return {
      ...state,
      totalValueExpenses: +state.totalValueExpenses + +payload,
    };

  default:
    return state;
  }
};

export default wallet;
