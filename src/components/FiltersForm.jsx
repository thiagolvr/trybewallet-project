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
  const { filteredExpensesInfo, setFilteredExpensesInfo, filters, setFilters } = useContext(FiltersContext)

  useEffect(() => {
    setFilteredExpensesInfo(expenses.filter(({description})  => description.toLowerCase().includes(filters.description.toLowerCase())));
    console.log(filteredExpensesInfo);
  }, [expenses, filters])

  return (
      <form className='wallet-form'>

        <FormControl>
          <Input
            data-testid="value-search-input"
            type="text"
            id="value-search"
            placeholder="Pesquise por um valor"
            value={filters.value}
            onChange={({target: {value}}) => setFilters({...filters, value})}
          />
        </FormControl>

        {/* <FormControl>
          <Input
            data-testid="description-search-input"
            type="text"
            id="description-search"
            placeholder="Pesquise por uma descrição"
            value={filters.description}
            onChange={({target: {value}}) => setFilters({...filters, description: value})}
          />
        </FormControl>

        <FormControl>
          <Input
            data-testid="method-search-input"
            type="text"
            id="method-search"
            placeholder="Pesquise por um Método de Pagamento"
            value={filters.method}
            onChange={({target: {value}}) => setFilters({...filters, method: value})}
          />
        </FormControl> */}


       

      </form>
  )
}

export default FiltersForm