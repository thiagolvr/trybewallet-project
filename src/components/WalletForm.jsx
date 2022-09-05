import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import { AddIcon } from '@chakra-ui/icons';

function WalletForm() {
  const [value, setValue] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [method, setMethod] = useState('Cartão de crédito');
  const [tag, setTag] = useState('Alimentação');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const {currencies} = useSelector(({ wallet }) => wallet);

  useEffect(() => {
    const getCurrencies = async () => {
      const currs = await currencyAPI();
      dispatch({ type: GET_CURRENCIES, payload: currs })
    }
    getCurrencies();
  }, []);

  const handleChange = ({ target: { id, value } }) => {
    switch (id) {
      case 'value':
        setValue(value);
        return;

      case 'currency':
        setCurrency(value);
        return;

      case 'method':
        setMethod(value);
        return;

      case 'tag':
        setTag(value);
        return;

      case 'description':
        setDescription(value);
        return;

      default:
        return;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const wallet = {
      value,
      currency,
      method,
      tag,
      description,
    };

    const currencyQuotes = await currencyAPIComplete();
    const expense = { ...wallet, exchangeRates: currencyQuotes };

    dispatch({ type: GET_EXPENSES, payload: expense });
    dispatch({ type: RELOAD_VALUES });

    setValue('');
    setDescription('');
  };

  return (
    <form className="wallet-form" onSubmit={handleSubmit}>
      <FormControl>
        <Input
          data-testid="value-input"
          type="number"
          id="value"
          placeholder="Digite um valor"
          value={value}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <Input
          data-testid="description-input"
          type="text"
          id="description"
          placeholder="Digite um descrição"
          value={description}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <Stack spacing={3}>
          <Select
            size="md"
            data-testid="currency-input"
            id="currency"
            value={currency}
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
          size="md"
          type="submit"
        />
      </ButtonGroup>
    </form>
  );
}

export default WalletForm;
