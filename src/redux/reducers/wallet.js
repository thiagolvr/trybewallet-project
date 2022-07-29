import {
  EDIT_EXPENSE,
  GET_CURRENCIES,
  GET_EXPENSES,
  GET_TOTAL_VALUE_EXPENSES,
  RELOAD_VALUES,
  REMOVE_EXPENSE,
  SAVE_EXPENSE,
} from '../../helpers/constants';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  totalValueExpenses: 0,
  reloadValues: false,
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_CURRENCIES: return { ...state, currencies: payload };
  case GET_EXPENSES: return {
    ...state,
    expenses: [...state.expenses, { id: state.idToEdit, ...payload }],
    idToEdit: state.idToEdit + 1,
  };
  case GET_TOTAL_VALUE_EXPENSES: return {
    ...state,
    totalValueExpenses: +state.totalValueExpenses + +payload,
  };
  case REMOVE_EXPENSE: return {
    ...state,
    expenses: [...state.expenses.filter(({ id }) => id !== payload.id)],
    totalValueExpenses: Math.abs(+state.totalValueExpenses - payload.value),
  };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      expenseToEdit: state.expenses.find(({ id }) => id === payload.id),
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      editor: false,
      expenses: [...state.expenses.map(
        (expense) => (expense.id === payload.id ? payload : expense),
      )],
      reloadValues: true,
    };
  case RELOAD_VALUES:
    return {
      ...state,
      totalValueExpenses: state.expenses
        .reduce((acc, { currency, value, exchangeRates }) => {
          acc += +value * exchangeRates[currency].ask;
          return acc;
        }, 0),
      reloadValues: false,
    };

  default:
    return state;
  }
};

export default wallet;
