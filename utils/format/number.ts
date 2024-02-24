const currencyFormatter = new Intl.NumberFormat('sq-AL', {
  style: 'currency',
  currency: 'ALL',
});

const formatToLekCurrency = (value: number) => {
  return currencyFormatter.format(value);
};

export { formatToLekCurrency };
