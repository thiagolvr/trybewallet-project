import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FiltersContext from '../context/FiltersContext';

import {
  FormControl,
  Input,
  Stack,
  ButtonGroup,
  Heading,
  Highlight,
  Select,
  IconButton,
} from '@chakra-ui/react';

function FiltersForm() {
  const { expenses } = useSelector(({wallet}) => wallet)
  const { filteredExpensesInfo, setFilteredExpensesInfo, filterByName, setFilterByName } = useContext(FiltersContext)

  useEffect(() => {
    setFilteredExpensesInfo(expenses.filter(({description})  => description.toLowerCase().includes(filterByName.name.toLowerCase())));
    console.log(filteredExpensesInfo);
  }, [expenses, filterByName])

  return (
      <form className='wallet-form'>
        <FormControl>
          <Input
            data-testid="description-search-input"
            type="text"
            id="description-search"
            placeholder="Pesquise por uma descrição"
            value={filterByName.name}
            onChange={({target: {value}}) => setFilterByName({name: value})}
          />
        </FormControl>

      </form>
  )
}

export default FiltersForm