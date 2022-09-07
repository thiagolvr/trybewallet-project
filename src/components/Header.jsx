import React from 'react';
import { useSelector } from 'react-redux';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useHistory } from 'react-router-dom';

import {
  Heading,
  Flex,
  Avatar,
  Box,
  Text,
  Badge,
  Divider,
  AvatarBadge,
  IconButton
} from '@chakra-ui/react';

import { EditIcon } from '@chakra-ui/icons';

function Header() {
  const history = useHistory()

  const {
    user: { email, description, name },
    wallet: { totalAmountOfExpenses },
  } = useSelector(({ user, wallet }) => ({ user, wallet }));

  return (
    <>
      <div className="header-info">
        {email ? (
          <Flex>
            <Avatar src="" >
            <AvatarBadge
                  as={IconButton}
                  size="xs"
                  rounded="full"
                  bottom="-10px"
                  colorScheme="teal"
                  aria-label="edit Profile"
                  icon={<EditIcon />}
                  onClick={() => history.push('/profileEdit')}
                />
            </Avatar>
            <Box ml="3">
              <Text fontWeight="bold">
                { name ? name : email }
                <Badge ml="1" colorScheme="green">
                  VIP
                </Badge>
              </Text>
              <Text fontSize="sm">{description ? description : 'Descrição do usuário'}</Text>
            </Box>
          </Flex>
        ) : (
          <Heading as="h5" size="sm">
            Você não está logado.
          </Heading>
        )}
        <h4 data-testid="total-field">
          Total de gastos: <strong>{totalAmountOfExpenses.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</strong>
        </h4>
       
        <ColorModeSwitcher></ColorModeSwitcher>
      </div>

      <Divider />
    </>
  );
}

export default Header;
