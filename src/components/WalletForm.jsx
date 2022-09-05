import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currencyAPI, currencyAPIComplete } from '../services/currencyAPI';
import {
  GET_CURRENCIES,
  GET_EXPENSES,
  RELOAD_VALUES,
} from '../helpers/constants';

import {
  Flex,
  Box,
  FormControl,
  Input,
  Stack,
  Button,
  ButtonGroup,
  Heading,
  Text,
  useColorModeValue,
  InputLeftAddon,
  InputGroup,
  IconButton,
  Select,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons'

class WalletForm extends Component {
  state = {
    value: '',
    currency: 'USD',
    method: 'Cartão de crédito',
    tag: 'Alimentação',
    description: '',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const currencies = await currencyAPI();
    dispatch({ type: GET_CURRENCIES, payload: currencies });
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const currencyQuotes = await currencyAPIComplete();
    const expense = { ...this.state, exchangeRates: currencyQuotes };

    const { dispatch } = this.props;
    dispatch({ type: GET_EXPENSES, payload: expense });
    dispatch({ type: RELOAD_VALUES });

    this.setState({ value: '', description: '' });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <form className="wallet-form" onSubmit={this.handleSubmit}>
        <FormControl>
          <Input
            data-testid="value-input"
            type="number"
            id="value"
            placeholder="Digite um valor"
            value={value}
            onChange={this.handleChange}
          />
        </FormControl>

        <FormControl>
          <Input
            data-testid="description-input"
            type="text"
            id="description"
            placeholder="Digite um descrição"
            value={description}
            onChange={this.handleChange}
          />
        </FormControl>

        <FormControl>
          <Stack spacing={3}>
            <Select
              size="md"
              data-testid="currency-input"
              id="currency"
              value={currency}
              onChange={this.handleChange}
            >
              {currencies.map((currencyName, index) => (
                <option key={index}>{currencyName}</option>
              ))}
            </Select>
          </Stack>
        </FormControl>

        <FormControl>
          <Stack spacing={3}>
            <Select
              size="md"
              data-testid="method-input"
              id="method"
              value={method}
              onChange={this.handleChange}
              placeholder="Forma de pagamento"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </Select>
          </Stack>
        </FormControl>

        <FormControl>
          <Stack spacing={3}>
            <Select
              size="md"
              data-testid="tag-input"
              id="tag"
              value={tag}
              onChange={this.handleChange}
              placeholder="Tag"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </Select>
          </Stack>
        </FormControl>

        <ButtonGroup size="sm" isAttached variant="outline">
          <IconButton 
            aria-label="Add expense"
           icon={<AddIcon />}
           size='md' 
           type='submit'
           />
        </ButtonGroup>

      </form>
    );
  }
}
WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => wallet;

export default connect(mapStateToProps)(WalletForm);
