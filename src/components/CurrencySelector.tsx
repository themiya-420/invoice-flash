import { DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { currencies, getCurrencyByCode } from '@/types/currencies';

interface CurrencySelectorProps {
  selectedCurrency: string;
  onCurrencyChange: (currencyCode: string) => void;
}

const CurrencySelector = ({ selectedCurrency, onCurrencyChange }: CurrencySelectorProps) => {
  const currentCurrency = getCurrencyByCode(selectedCurrency);

  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <DollarSign className="h-5 w-5" />
        Currency Settings
      </h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="currency">Select Currency</Label>
          <Select value={selectedCurrency} onValueChange={onCurrencyChange}>
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border">
              {currencies.map((currency) => (
                <SelectItem 
                  key={currency.code} 
                  value={currency.code}
                  className="hover:bg-muted focus:bg-muted"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{currency.symbol}</span>
                    <span>{currency.code}</span>
                    <span className="text-muted-foreground">- {currency.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="p-3 bg-muted rounded-lg">
          <div className="text-sm font-medium mb-1">Current Currency:</div>
          <div className="text-sm text-muted-foreground">
            {currentCurrency.symbol} {currentCurrency.code} - {currentCurrency.name}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CurrencySelector;