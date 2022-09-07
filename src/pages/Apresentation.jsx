import { useHistory } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';

function Apresentation() {
  const history = useHistory('/login')

  return (
    <>
      <Container maxW={'3xl'}>

        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
          mt={10}
          >
      <ColorModeSwitcher></ColorModeSwitcher>

          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Tenha o controle<br />
            <Text as={'span'} color={'teal.400'}>
              da sua vida financeira
            </Text>
          </Heading>
          <Text color={'gray.500'} >
              Saiba exatamente para onde o seu dinheiro está indo.
              <br></br>
              Sem mais esquecimentos.
              <br></br>
              Sem mais surpresas no fim do mês.
              <br></br>
              Você está no controle.
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Button
              colorScheme={'green'}
              bg={'teal.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'teal.500',
              }}
              onClick={() => history.push('/login')}
              >
              Ir para tela de login
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default Apresentation