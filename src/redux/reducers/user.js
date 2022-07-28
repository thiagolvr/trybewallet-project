import { GET_EMAIL_USER } from '../../helpers/constants';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_EMAIL_USER:
    return {
      ...state,
      ...payload,
    };
  default:
    return state;
  }
};

export default user;
