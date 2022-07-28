import * as EmailValidator from 'email-validator';
import { NUMBER_FIVE } from './magicNumbers';

const formValidator = ({ inputEmail, inputPassword }) => {
  const emailIsValid = EmailValidator.validate(inputEmail);
  const passCorrectLength = inputPassword.length > NUMBER_FIVE;

  return !!((emailIsValid && passCorrectLength));
};

export default formValidator;
