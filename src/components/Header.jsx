import React  from 'react';
import {useSelector } from 'react-redux';

function Header()  {
  const {
    user: {email}, 
    wallet: { totalAmountOfExpenses }
  } = useSelector(({user, wallet}) => ({user, wallet}));

    return (
      <div className="header-info">
        <h3 data-testid="email-field">{email}</h3>
        <h4 data-testid="total-field">{totalAmountOfExpenses.toFixed(2)}</h4>
        <h4 data-testid="header-currency-field">BRL</h4>
      </div>
    );
  }



export default Header;
