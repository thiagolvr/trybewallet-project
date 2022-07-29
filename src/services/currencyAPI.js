const CURRENCY_API = 'https://economia.awesomeapi.com.br/json/all';

export const currencyAPI = async () => {
  try {
    const response = await fetch(CURRENCY_API);
    const currencies = await response.json();
    return Object.values(
      Object.keys(currencies).filter((currency) => currency !== 'USDT'),
    );
  } catch (error) {
    console.log(error);
  }
};

export const currencyAPIComplete = async () => {
  try {
    const response = await fetch(CURRENCY_API);
    const currencies = await response.json();
    return currencies;
  } catch (error) {
    console.log(error);
  }
};
