import { GET_EMAIL_USER, GET_NAME_USER, GET_DESCRIPTION_USER } from '../../helpers/constants';

const INITIAL_STATE = {
  email: '',
  name: '',
  description: ''
};

const user = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_EMAIL_USER:
    return {
      ...state,
      email: payload,
    };
    case GET_NAME_USER:
    return {
      ...state,
      name: payload,
    };
    case GET_DESCRIPTION_USER:
    return {
      ...state,
      description: payload,
    };
  default:
    return state;
  }
};

export default user;
