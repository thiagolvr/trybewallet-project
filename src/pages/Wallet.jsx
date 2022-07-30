import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import EditWalletForm from '../components/EditWalletForm';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import WalletTable from '../components/WalletTable';

class Wallet extends React.Component {
  render() {
    const { editor } = this.props;

    return (
      <div>
        <Header />
        {
          editor ? <EditWalletForm /> : <WalletForm />
        }
        <WalletTable />
      </div>
    );
  }
}

Wallet.propTypes = {
  editor: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ wallet }) => wallet;

export default connect(mapStateToProps)(Wallet);
