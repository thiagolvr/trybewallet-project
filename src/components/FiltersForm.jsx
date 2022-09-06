import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FiltersContext from '../context/FiltersContext';

import {
  FormControl,
  FormLabel,
  Switch,
  Input,
  Stack,
  Select,
} from '@chakra-ui/react';

function FiltersForm() {
  const { expenses } = useSelector(({wallet}) => wallet)
  const { setFilteredExpensesInfo, filters, setFilters, currenciesFilter, enableFilter } = useContext(FiltersContext)

  useEffect(() => {
    setFilteredExpensesInfo(expenses.filter(({description})  => description.toLowerCase().includes(filters.description.toLowerCase())));
  }, [expenses, filters])

  return (
    <>
      {
        !enableFilter && (
          <form className='filters-form'>

          <FormControl>
            <Input
              data-testid="value-search-input"
              type="text"
              id="value-search"
              placeholder="Valor"
              value={filters.value}
              onChange={({target: {value}}) => setFilters({...filters, value})}
            />
          </FormControl>
  
          <FormControl>
            <Input
              data-testid="description-search-input"
              type="text"
              id="description-search"
              placeholder="Descrição"
              value={filters.description}
              onChange={({target: {value}}) => setFilters({...filters, description: value})}
            />
          </FormControl>
  
          {/* <FormControl>
            <Stack spacing={3}>
              <Select
                size="md"
                data-testid="currency-input"
                id="currency"
                // value={currency}
                // onChange={handleChange}
              >
                {currenciesFilter.map((currencyName, index) => (
                  <option key={index}>{currencyName}</option>
                ))}
              </Select>
            </Stack>
          </FormControl> */}
  
          {/* <FormControl>
            <Stack spacing={3}>
              <Select
                size="md"
                data-testid="method-input"
                id="method"
                // value={method}
                // onChange={handleChange}
              >
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>
              </Select>
            </Stack>
          </FormControl> */}
  
          {/* <FormControl>
            <Input
              data-testid="tag-search-input"
              type="text"
              id="tag-search"
              placeholder="Tag"
              value={filters.tag}
              onChange={({target: {value}}) => setFilters({...filters, tag: value})}
            />
          </FormControl>
   */}
  
  
         
  
        </form>
        )
      }
      </>
  )
}

export default FiltersForm