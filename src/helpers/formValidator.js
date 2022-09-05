import * as EmailValidator from 'email-validator';
import NUMBER_FIVE from './magicNumbers';

const formValidator = (email, password) => {
  const emailIsValid = EmailValidator.validate(email);
  const passCorrectLength = password.length > NUMBER_FIVE;

  return !!((emailIsValid && passCorrectLength));
};

export default formValidator;
