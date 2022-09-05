import { Button} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import EditWalletForm from '../components/EditWalletForm';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import WalletTable from '../components/WalletTable';
import { useHistory } from 'react-router-dom';

function Wallet() {
    const history = useHistory()
    const {editor} = useSelector(({wallet}) => wallet)
    return (
      <>
      <div className='father'>
        <Header />
        {
          editor ? <EditWalletForm /> : <WalletForm />
        }
        <WalletTable />
      </div>

      <div className='logout'>
        <Button colorScheme='red' onClick={() => history.push('/')}>Sair</Button>
      </div>
      </>
    );
  }


export default Wallet;
