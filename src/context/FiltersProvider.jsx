import PropTypes from 'prop-types';
import React, { useState } from 'react';
import FiltersContext from './FiltersContext';

const FiltersProvider = ({ children }) => {
  const [filteredExpensesInfo, setFilteredExpensesInfo] = useState([]);
  const [filterByDescription, setFilterByDescription] = useState('');
  const [filters, setFilters] = useState([]);
  const [currenciesFilter, setCurrenciesFilter] = useState([]);
  const [enableFilter, setEnableFilter] = useState(true);

  const contextValue = {
    filters,
    setFilters,
    filteredExpensesInfo,
    filterByDescription,
    setFilterByDescription,
    setFilteredExpensesInfo,
    currenciesFilter,
    setCurrenciesFilter,
    enableFilter,
    setEnableFilter
  };

  return (
    <FiltersContext.Provider value={ contextValue }>
      {children}
    </FiltersContext.Provider>
  );
};

FiltersProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default FiltersProvider;
