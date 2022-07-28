import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div className="header-info">
        <h3 data-testid="email-field">{email}</h3>
        <h4 data-testid="total-field">{`Despesas Totais: ${0}`}</h4>
        <h4 data-testid="header-currency-field">BRL</h4>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = ({ user }) => user;

export default connect(mapStateToProps)(Header);
