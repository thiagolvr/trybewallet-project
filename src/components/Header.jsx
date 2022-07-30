import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const {
      user: { email },
      wallet: { totalAmountOfExpenses },
    } = this.props;

    return (
      <div className="header-info">
        <h3 data-testid="email-field">{email}</h3>
        <h4 data-testid="total-field">{totalAmountOfExpenses.toFixed(2)}</h4>
        <h4 data-testid="header-currency-field">BRL</h4>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  wallet: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ user, wallet }) => ({ user, wallet });

export default connect(mapStateToProps)(Header);
