import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currencyAPI, currencyAPIComplete } from '../services/currencyAPI';

import {
  GET_CURRENCIES,
  GET_EXPENSES,
  RELOAD_VALUES,
} from '../helpers/constants';

import {
  FormControl,
  Input,
  Stack,
  ButtonGroup,
  Heading,
  Highlight,
  Select,
  Button,
} from '@chakra-ui/react';

import { CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons';

function WalletForm() {
  const [value, setValue] = useState('');
  const [currency, setCurrency] = useState('Moeda');
  const [method, setMethod] = useState('Método de pagamento');
  const [tag, setTag] = useState('Tag');
  const [description, setDescription] = useState('');
  const [control, setControl] = useState({
    countCurrency: 0,
    countMethod: 0,
    countTag: 0,
  });

  const dispatch = useDispatch();

  const { currencies } = useSelector(({ wallet }) => wallet);

  useEffect(() => {
    const getCurrencies = async () => {
      const currs = await currencyAPI();
      dispatch({ type: GET_CURRENCIES, payload: currs });
    };
    getCurrencies();
  }, []);

  const handleChange = ({ target: { id, value } }) => {
    switch (id) {
      case 'value':
        return setValue(value);

      case 'currency':
        setCurrency(value);
        return (
          control.countCurrency === 0 &&
          setControl({ ...control, countCurrency: 1 })
        );

      case 'method':
        setMethod(value);
        return (
          control.countMethod === 0 &&
          setControl({ ...control, countMethod: 1 })
        );

      case 'tag':
        setTag(value);
        return (
          control.countTag === 0 && setControl({ ...control, countTag: 1 })
        );

      case 'description':
        return setDescription(value);

      default:
        return '';
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!(control.countCurrency && control.countMethod && control.countTag)) return;

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
    setCurrency('Moeda');
    setMethod('Método de pagamento');
    setTag('Tag');
    setControl({countCurrency: 0,
      countMethod: 0,
      countTag: 0});
  };

  return (
    <>
      <Heading lineHeight="tall" as="h5" size="sm" className="heading-form">
        <Highlight
          query={['Preencha', 'adicionar']}
          styles={{
            ml: '1',
            mr: '1',
            px: '2',
            py: '1',
            rounded: 'full',
            bg: 'teal.100',
          }}
        >
          Preencha o formulário abaixo para adicionar uma despesa.
        </Highlight>
      </Heading>

      <form className="wallet-form" onSubmit={handleSubmit}>
        <FormControl>
          <Input
            data-testid="value-input"
            type="number"
            id="value"
            placeholder="Valor"
            value={value}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <Input
            data-testid="description-input"
            type="text"
            id="description"
            placeholder="Descrição"
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
              <option disabled>Moeda</option>
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
              <option disabled>Método de pagamento</option>
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
              <option disabled>Tag</option>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </Select>
          </Stack>
        </FormControl>

        <ButtonGroup ml={3} size="sm" isAttached variant="outline">
          <Button
            leftIcon={
              control.countCurrency && control.countMethod && control.countTag 
              ? <CheckCircleIcon /> 
              : <NotAllowedIcon />
            }
            colorScheme={ (control.countCurrency && control.countMethod && control.countTag) ? 'teal' : 'red'}
            variant="solid"
            type="submit"
            size="md"
          >
            { (control.countCurrency && control.countMethod && control.countTag)  ? 'Adicionar' : 'Não permitido'}
          </Button>
        </ButtonGroup>
      </form>
    </>
  );
}

export default WalletForm;
