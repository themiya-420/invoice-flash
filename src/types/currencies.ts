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
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', position: 'before' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', position: 'before' },
  { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'Rs', position: 'before' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', position: 'before' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', position: 'before' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', position: 'before' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', position: 'before' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', position: 'before' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', position: 'before' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', position: 'before' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', position: 'after' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', position: 'after' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', position: 'after' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', position: 'before' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', position: 'before' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', position: 'before' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', position: 'before' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', position: 'before' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', position: 'before' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', position: 'before' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', position: 'before' },
  { code: 'PLN', name: 'Polish Złoty', symbol: 'zł', position: 'after' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', position: 'before' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', position: 'before' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', position: 'before' },
  { code: 'TWD', name: 'New Taiwan Dollar', symbol: 'NT$', position: 'before' }
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