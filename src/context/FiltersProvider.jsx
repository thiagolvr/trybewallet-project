import PropTypes from 'prop-types';
import React, { useState } from 'react';
import FiltersContext from './FiltersContext';

const FiltersProvider = ({ children }) => {
  const [filteredExpensesInfo, setFilteredExpensesInfo] = useState([]);
  const [filters, setFilters] = useState({ description: '', method: '', tag: '', value: ''});
  const [currenciesFilter, setCurrenciesFilter] = useState([]);

  const contextValue = {
    filters,
    setFilters,
    filteredExpensesInfo,
    setFilteredExpensesInfo,
    currenciesFilter,
    setCurrenciesFilter,
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
