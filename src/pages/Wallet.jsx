import { Button, Switch, FormControl, FormLabel} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditWalletForm from '../components/EditWalletForm';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import WalletTable from '../components/WalletTable';
import { useHistory } from 'react-router-dom';
import FiltersForm from '../components/FiltersForm';

function Wallet() {
  const [enableFilter, setEnableFilter] = useState(false)

  const {editor} = useSelector(({wallet}) => wallet)

  const history = useHistory()


    return (
      <>
      <div className='father'>
        <Header />
        {
          editor ? <EditWalletForm /> : <WalletForm />
        }

        <FormControl display='flex' alignItems='center' justifyContent='center' mt='60px'>
          <FormLabel htmlFor='show-filters' mb='0'>
            Habilitar pequisa por filtros
          </FormLabel>
          <Switch id='show-filters' onChange={() => setEnableFilter(!enableFilter)}/>
        </FormControl>
       
        {
          !enableFilter && <FiltersForm />
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
