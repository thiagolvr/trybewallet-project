import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FiltersContext from '../context/FiltersContext';
import ModalMoreFilters from './ModalMoreFilters';

import { FormControl, Input, Stack, Button } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

function FiltersForm() {
  const { expenses } = useSelector(({ wallet }) => wallet);
  const {
    setFilteredExpensesInfo,
    filterByDescription,
    setFilterByDescription,
    enableFilter,
    filters,
    setFilters
  } = useContext(FiltersContext);

  useEffect(() => {
    const expensesFilteredByDescription =  expenses.filter(({ description }) =>
    description.toLowerCase().includes(filterByDescription.toLowerCase())
        )

    const expensesWithActiveFilters = filters
    .reduce((acc, filter) => acc
      .filter((expense) =>  (
        +expense.value >= +filter.value 
        && expense.currency === filter.currency 
        && expense.method === filter.method 
        && expense.tag === filter.tag 
      )
      ), expensesFilteredByDescription);
   

    setFilteredExpensesInfo(expensesWithActiveFilters);
  }, [expenses, filterByDescription, setFilteredExpensesInfo, filters ]);

  return (
    <>
      {!enableFilter && (
        <Stack className="filters-form">
          <FormControl mb={4}>
            <Input
              data-testid="description-search-input"
              type="text"
              id="description-search"
              placeholder="Descrição"
              value={filterByDescription}
              onChange={({ target: { value } }) =>
                setFilterByDescription(value)
              }
            />
          </FormControl>

              {
                filters.length
                  ? (
                    <Button 
                    leftIcon={<DeleteIcon />} 
                    colorScheme='red' 
                    variant='solid'
                    onClick={() => setFilters([])}
                    >
                      Apagar filtros ativos
                    </Button>
                  )
                  : <ModalMoreFilters className="modal" />
              }

        </Stack>
      )}
    </>
  );
}

export default FiltersForm;
