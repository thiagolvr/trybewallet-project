import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FiltersContext from '../context/FiltersContext';
import ModalMoreFilters from './ModalMoreFilters';

import { FormControl, Input, Stack } from '@chakra-ui/react';

function FiltersForm() {
  const { expenses } = useSelector(({ wallet }) => wallet);
  const {
    setFilteredExpensesInfo,
    filterByDescription,
    setFilterByDescription,
    enableFilter,
  } = useContext(FiltersContext);

  useEffect(() => {
    setFilteredExpensesInfo(
      expenses.filter(({ description }) =>
        description.toLowerCase().includes(filterByDescription.toLowerCase())
      )
    );
  }, [expenses, filterByDescription]);

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

          <ModalMoreFilters className="modal" />
        </Stack>
      )}
    </>
  );
}

export default FiltersForm;
