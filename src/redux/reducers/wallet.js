import {
  EDIT_EXPENSE,
  GET_CURRENCIES,
  GET_EXPENSES,
  RELOAD_VALUES,
  REMOVE_EXPENSE,
  SAVE_EXPENSE,
} from '../../helpers/constants';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  totalAmountOfExpenses: 0,
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_CURRENCIES:
    return { ...state, currencies: payload };

  case GET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, { id: state.idToEdit, ...payload }],
      idToEdit: state.idToEdit + 1,
    };

  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses.filter(({ id }) => id !== payload.id)],
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
      expenses: [
        ...state.expenses.map(
          (expense) => (expense.id === payload.id ? payload : expense),
        ),
      ],
    };

  case RELOAD_VALUES:
    return {
      ...state,
      totalAmountOfExpenses: state.expenses.reduce(
        (acc, { currency, value, exchangeRates }) => {
          acc += +value * exchangeRates[currency].ask;
          return acc;
        },
        0,
      ),
    };

  default:
    return state;
  }
};

export default wallet;
