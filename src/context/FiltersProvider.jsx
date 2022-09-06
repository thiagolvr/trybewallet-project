import PropTypes from 'prop-types';
import React, { useState } from 'react';
import FiltersContext from './FiltersContext';

const FiltersProvider = ({ children }) => {
  const [filteredExpensesInfo, setFilteredExpensesInfo] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  const contextValue = {
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
    filteredExpensesInfo,
    setFilteredExpensesInfo,
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
