import React, {useRef, useContext, useEffect, useState} from 'react';
import FiltersContext from '../context/FiltersContext';
import { currencyAPI } from '../services/currencyAPI';

import {
  Stack,
  Select,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from '@chakra-ui/react';

export default function ModalMoreFilters() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currenciesFilter, setCurrenciesFilter, filters, setFilters } = useContext(FiltersContext)
  const [appliedFilters, setAppliedFilters] = useState({ method: 'Cartão de crédito', tag: 'Alimentação', value: '', currency: 'USD'})

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  useEffect(() => {
    const getCurrencies = async () => {
      const currencies = await currencyAPI();
      setCurrenciesFilter(currencies)
    }
    getCurrencies();
  }, []);

  useEffect(() => {
    console.log(filters)

  }, [filters])

  const handleApplyFilters = () => {
    setFilters(appliedFilters)  
    onClose()
  }

  return (
    <>
      <Button onClick={onOpen}>Mais filtros</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filtros Disponíveis</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Valor</FormLabel>
              <Input 
              ref={initialRef}
              placeholder="Digite um valor"
              id='filter-value'
              onChange={({target: {value}}) => setAppliedFilters({...appliedFilters, value})}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Moeda</FormLabel>
              <Stack spacing={3}>
                <Select
                  size="md"
                  id="filter-currency"
                  value={appliedFilters.currency}
                  onChange={({target: {value}}) => setAppliedFilters({...appliedFilters, currency: value})}
                >
                  {
                  currenciesFilter.map((currencyName, index) => (
                  <option key={index}>{currencyName}</option>
                ))
                }
                </Select>
              </Stack>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Método de pagamento</FormLabel>
              <Stack spacing={3}>
                <Select
                  size="md"
                  id="filter-method"
                  value={appliedFilters.method}
                  onChange={({target: {value}}) => setAppliedFilters({...appliedFilters, method: value})}
                >
                  <option>Dinheiro</option>
                  <option>Cartão de crédito</option>
                  <option>Cartão de débito</option>
                </Select>
              </Stack>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Tag</FormLabel>
              <Select
                size="md"
                id="filter-tag"
                value={appliedFilters.tag}
                onChange={({target: {value}}) => setAppliedFilters({...appliedFilters, tag: value})}
              >
                <option>Alimentação</option>
                <option>Lazer</option>
                <option>Trabalho</option>
                <option>Transporte</option>
                <option>Saúde</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handleApplyFilters() }>
              Aplicar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
