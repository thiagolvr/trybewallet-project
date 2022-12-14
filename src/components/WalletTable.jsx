import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FiltersContext from '../context/FiltersContext';

import {
  EDIT_EXPENSE,
  RELOAD_VALUES,
  REMOVE_EXPENSE,
  CANCEL,
} from '../helpers/constants';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  CloseButton,
  Stack,
} from '@chakra-ui/react'


function WalletTable() {
  const dispatch = useDispatch()
  const {filteredExpensesInfo} = useContext(FiltersContext)
  const { editor } = useSelector(({wallet}) => wallet)

  const handleRemove = (_e, id, value) => {
    dispatch({ type: REMOVE_EXPENSE, payload: { id, value } });
    dispatch({ type: RELOAD_VALUES });
  }

  const handleEdit = ({target: {name}}, id, value) => {
    if (name === 'cancel') return dispatch({ type: CANCEL })

    dispatch({ type: EDIT_EXPENSE, payload: { id, value } });
    dispatch({ type: RELOAD_VALUES });
  }

    return (
      <TableContainer className='table' whiteSpace='wrap' >
      <Table variant='simple' size='sm'>
        <TableCaption>Em dispositivos menores, role para os lados dentro da tabela para mais informações.</TableCaption>
        <Thead>
          <Tr>
            <Th>Descrição</Th>
            <Th>Tag</Th>
            <Th>Método de pagamento</Th>
            <Th isNumeric>Valor</Th>
            <Th>Moeda</Th>
            <Th isNumeric>Câmbio</Th>
            <Th>Moeda de conversão</Th>
            <Th isNumeric>Valor convertido</Th>
            <Th>Editar/Excluir</Th>
          </Tr>
        </Thead>
        <Tbody>
        {
        filteredExpensesInfo.map((expense) => {
              const { value } = expense;
              const { name, ask } = expense.exchangeRates[expense.currency];
              const sum = +ask * +value;

              return (
                <Tr key={ expense.id }>
                  <Td>{expense.description}</Td>
                  <Td>{expense.tag}</Td>
                  <Td>{expense.method}</Td>
                  <Td>{(+value).toFixed(2)}</Td>
                  <Td>{name}</Td>
                  <Td>{(+ask).toFixed(2)}</Td>
                  <Td>Real Brasileiro</Td>
                  <Td>{sum.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</Td>
                  <Td>
                  <Stack direction='row' spacing={2} align='center'>
                    <Button
                     colorScheme={editor ? 'red' : 'teal'}
                      variant='ghost'
                      data-testid="edit-btn"
                      type="button"
                      name={editor ? "cancel" : 'edit'}
                      onClick={ (e) => handleEdit(e, expense.id, +expense.value * ask) }
                    >
                      { editor ? 'Cancelar' : 'Editar'}
                    </Button>
                    <CloseButton
                      data-testid="delete-btn"
                      color='red'
                      type="button"
                      name="delete"
                      onClick={
                        (e) => handleRemove(e, expense.id, +expense.value * ask)
                      }
                    />
                    </Stack>
                  </Td>
                </Tr>
              )
            })
            }
        </Tbody>
      </Table>
    </TableContainer>
    );
  }

export default WalletTable;
