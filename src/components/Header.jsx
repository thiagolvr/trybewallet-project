import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { user: { email }, wallet: { totalValueExpenses } } = this.props;
    return (
      <div className="header-info">
        <h3 data-testid="email-field">{email}</h3>
        <h4
          data-testid="total-field"
        >
          {totalValueExpenses.toFixed(2)}

        </h4>
        <h4 data-testid="header-currency-field">BRL</h4>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  wallet: PropTypes.shape({
    totalValueExpenses: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = ({ user, wallet }) => ({ user, wallet });

export default connect(mapStateToProps)(Header);
