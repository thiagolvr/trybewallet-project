import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
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

class EditWalletForm extends React.Component {
  constructor({
    expenseToEdit: { value, description, currency, method, tag, exchangeRates },
  }) {
    super({ expenseToEdit: { value, description, currency, method, tag } });
    this.state = {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
  }

  handleChange = ({ target: { id, value: valueInput } }) => {
    this.setState({ [id]: valueInput });
  };

  handleSubmit = (e, id, expense) => {
    e.preventDefault();

    const { dispatch } = this.props;
    dispatch({ type: SAVE_EXPENSE, payload: { ...expense, id } });
    dispatch({ type: RELOAD_VALUES });
  };

  render() {
    const {
      currencies,
      expenseToEdit: { id },
      editor,
    } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <>
        <Heading lineHeight="tall" as="h5" size="sm" className="heading-form">
          <Highlight
            query={['alterar', 'Edite']}
            styles={{ px: '2', py: '1', rounded: 'full', bg: 'red.100' }}
          >
            Edite as informações abaixo para alterar a sua despesa
          </Highlight>
        </Heading>
        <form
          className="wallet-form"
          onSubmit={e => this.handleSubmit(e, id, this.state)}
        >
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
              <Button
                colorScheme="red"
                variant="outline"
                size="md"
                type="submit"
              >
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
}

EditWalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  expenseToEdit: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => wallet;

export default connect(mapStateToProps)(EditWalletForm);
