import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GET_EMAIL_USER } from '../helpers/constants';
import formValidator from '../helpers/formValidator';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useToast } from '@chakra-ui/react';

import {
  Flex,
  Box,
  FormControl,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputLeftAddon,
  InputGroup,
} from '@chakra-ui/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const dispatch = useDispatch();
  const { push } = useHistory();
  const toast = useToast()


  const handleChange = ({ target: { id, value } }) =>
    id === 'email' ? setEmail(value) : setPassword(value);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: GET_EMAIL_USER, payload: email });

    toast({
      title: 'Você entrou com sucesso',
      description: "Seja bem vindo a sua carteira digital.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })

    push('/carteira');
  };

  useEffect(() => {
    setIsDisabled(!formValidator(email, password));
  }, [email, password]);

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <ColorModeSwitcher></ColorModeSwitcher>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>TrybeWallet</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            The control is in your hands
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <InputGroup>
                <InputLeftAddon children="Email" />
                <Input
                  type="text"
                  id="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
            <FormControl id="password">
              <InputGroup>
                <InputLeftAddon children="Password" />
                <Input
                  type="password"
                  placeholder="******"
                  id="password"
                  value={password}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              ></Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.600',
                }}
                type="button"
                disabled={isDisabled}
                onClick={handleSubmit}
              >
                Get In
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
