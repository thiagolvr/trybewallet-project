import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SAVE_EXPENSE, RELOAD_VALUES } from '../helpers/constants';

import {
  FormControl,
  Input,
  Stack,
  Button,
  ButtonGroup,
  Heading,
  IconButton,
  Select,
  Highlight,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

function EditWalletForm() {
  const { expenseToEdit, currencies, editor } = useSelector(
    ({ wallet }) => wallet
  );

  const [value, setValue] = useState(expenseToEdit.value);
  const [description, setDescription] = useState(expenseToEdit.description);
  const [currency, setCurrency] = useState(expenseToEdit.currency);
  const [method, setMethod] = useState(expenseToEdit.method);
  const [tag, setTag] = useState(expenseToEdit.tag);
  const [exchangeRates] = useState(expenseToEdit.exchangeRates);

  const expense = {
    value,
    description,
    currency,
    method,
    tag,
    exchangeRates,
  };

  const dispatch = useDispatch();

  const handleChange = ({ target: { id, value: valueInput } }) => {
    switch (id) {
      case 'value':
        setValue(valueInput);
        return;

      case 'currency':
        setCurrency(valueInput);
        return;

      case 'method':
        setMethod(valueInput);
        return;

      case 'tag':
        setTag(valueInput);
        return;

      case 'description':
        setDescription(valueInput);
        return;

      default:
        return;
    }
  };

  const handleSubmit = (e, id, expense) => {
    e.preventDefault();

    dispatch({ type: SAVE_EXPENSE, payload: { ...expense, id } });
    dispatch({ type: RELOAD_VALUES });
  };

  return (
    <>
      <Heading lineHeight="tall" as="h5" size="sm" className="heading-form">
        <Highlight
          query={['alterar', 'Edite']}
          styles={{
            ml: '1',
            mr: '1',
            px: '2',
            py: '1',
            rounded: 'full',
            bg: 'red.100',
          }}
        >
          Edite as informações abaixo para alterar a sua despesa
        </Highlight>
      </Heading>
      <form
        className="wallet-form"
        onSubmit={e => handleSubmit(e, expenseToEdit.id, expense)}
      >
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
          {editor ? (
            <Button ml={3} colorScheme="red" variant="outline" size="md" type="submit">
              Salvar alteração
            </Button>
          ) : (
            <IconButton
              aria-label="Add expense"
              icon={<AddIcon />}
              size="md"
              type="submit"
            />
          )}
        </ButtonGroup>
      </form>
    </>
  );
}

export default EditWalletForm;
