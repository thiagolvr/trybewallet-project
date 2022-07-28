// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_WALLET_INFO } from '../../helpers/constants';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_WALLET_INFO:
    return {
      ...state,
      ...payload,
    };
  default:
    return state;
  }
};

export default wallet;
