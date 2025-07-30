export interface Currency {
  code: string;
  name: string;
  symbol: string;
  position: 'before' | 'after';
}

export const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', position: 'before' },
  { code: 'EUR', name: 'Euro', symbol: '€', position: 'before' },
  { code: 'GBP', name: 'British Pound', symbol: '£', position: 'before' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', position: 'before' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', position: 'before' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', position: 'before' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', position: 'before' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', position: 'before' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', position: 'before' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', position: 'before' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', position: 'before' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', position: 'after' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', position: 'after' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', position: 'after' },
  { code: 'PLN', name: 'Polish Złoty', symbol: 'zł', position: 'after' },
];

export const getCurrencyByCode = (code: string): Currency => {
  return currencies.find(currency => currency.code === code) || currencies[0];
};

export const formatCurrency = (amount: number, currencyCode: string): string => {
  const currency = getCurrencyByCode(currencyCode);
  const formattedAmount = amount.toFixed(2);
  
  if (currency.position === 'before') {
    return `${currency.symbol}${formattedAmount}`;
  } else {
    return `${formattedAmount} ${currency.symbol}`;
  }
};