import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useHistory } from 'react-router-dom';

import { GET_NAME_USER, GET_DESCRIPTION_USER } from '../helpers/constants';

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
} from '@chakra-ui/react';


function ProfileEdit() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const {email, name: previousName, description: previousDescription} = useSelector(({user}) => user) 

  const history = useHistory()
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch({type: GET_NAME_USER, payload: name})
    dispatch({type: GET_DESCRIPTION_USER, payload: description})

    history.push('/wallet')
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
        >
          <ColorModeSwitcher></ColorModeSwitcher>
        <Center w='full' mt>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
         Alterar perfil de usuário
        </Heading>
        </Center>
        <FormControl id="userName">
          <Stack direction={['column', 'row']} spacing={6}>
            <Center w="full">
            <Avatar size="xl" src="">
              </Avatar>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName" >
          <FormLabel>Nome</FormLabel>
          <Input
            placeholder={previousName ? previousName : 'Seu nome'}
            _placeholder={{ color: 'gray.500' }}
            type="text"
            name='name'
            value={name}
            onChange={({target: {value}}) => setName(value)}
            
          />
        </FormControl>
        <FormControl id="email" >
          <FormLabel>E-mail</FormLabel>
          <Input
            _placeholder={{ color: 'gray.500' }}
            type="email"
            placeholder={email}
            disabled
          />
        </FormControl>
        <FormControl id="description" >
          <FormLabel>Descrição</FormLabel>
          <Input
            placeholder={previousDescription ? previousDescription : 'Sobre você'}
            _placeholder={{ color: 'gray.500' }}
            type="text"
            name='description'
            value={description}
            onChange={({target: {value}}) => setDescription(value)}
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={() => handleClick()}
            >
            Salvar
          </Button>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}
            onClick={() => history.push('/wallet')}
            >
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default ProfileEdit