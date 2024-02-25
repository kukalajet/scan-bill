const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'ALL',
});

const formatToLekCurrency = (value: number) => {
  return currencyFormatter.format(value);
};

export { formatToLekCurrency };
