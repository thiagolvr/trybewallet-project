import React from 'react';
import { useSelector } from 'react-redux';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Heading, Flex, Avatar, Box, Text, Badge } from '@chakra-ui/react';

function Header() {
  const {
    user: { email },
    wallet: { totalAmountOfExpenses },
  } = useSelector(({ user, wallet }) => ({ user, wallet }));

  return (
    <div className="header-info">
      {
        email
         ? (
          <Flex>
          <Avatar src="" />
          <Box ml="3">
            <Text fontWeight="bold">
              {email}
              <Badge ml="1" colorScheme="green">
                VIP
              </Badge>
            </Text>
            <Text fontSize="sm">Descrição do usuário</Text>
          </Box>
        </Flex>
        )
        : (
          <Heading as='h5' size='sm'>
          Você não está logado.
        </Heading>
        )
      }
      <h4 data-testid="total-field">
        Total de gastos: <strong>{totalAmountOfExpenses.toFixed(2)}</strong>
      </h4>
      <h4 data-testid="header-currency-field">
        Moeda Base: <strong>BRL</strong>
      </h4>
      <ColorModeSwitcher></ColorModeSwitcher>
    </div>
  );
}

export default Header;
