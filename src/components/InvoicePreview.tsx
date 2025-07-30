import { InvoiceData } from '@/types/invoice';
import { getThemeById } from '@/types/themes';
import { formatCurrency, getCurrencyByCode } from '@/types/currencies';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface InvoicePreviewProps {
  invoice: InvoiceData;
}

const InvoicePreview = ({ invoice }: InvoicePreviewProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const theme = getThemeById(invoice.theme);
  const currency = getCurrencyByCode(invoice.currency);

  return (
    <Card className={`p-8 ${theme.styles.backgroundColor} border-border shadow-elegant max-w-4xl mx-auto`} id="invoice-preview">
      {/* Header with Theme Styling */}
      <div className={`${theme.styles.headerBg} ${theme.styles.headerText} p-6 rounded-lg mb-8`}>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            {invoice.logo && (
              <img
                src={invoice.logo}
                alt="Business Logo"
                className="max-h-16 max-w-28 object-contain bg-white/10 rounded p-2"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold">INVOICE</h1>
              <p className="text-lg opacity-90">{invoice.invoiceNumber}</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold mb-2">{invoice.businessName}</h2>
            <div className="text-sm opacity-90 space-y-1">
              {invoice.businessAddress.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
              {invoice.businessPhone && <p>{invoice.businessPhone}</p>}
              {invoice.businessEmail && <p>{invoice.businessEmail}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Details and Bill To */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className={`text-lg font-semibold ${theme.styles.accentColor} mb-3`}>Bill To:</h3>
          <div className="space-y-1">
            <p className={`font-medium ${theme.styles.textColor}`}>{invoice.clientName}</p>
            {invoice.clientAddress.split('\n').map((line, index) => (
              <p key={index} className={`text-sm ${theme.styles.mutedTextColor}`}>{line}</p>
            ))}
            {invoice.clientEmail && <p className={`text-sm ${theme.styles.mutedTextColor}`}>{invoice.clientEmail}</p>}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className={`font-medium ${theme.styles.textColor}`}>Invoice Date:</span>
            <span className={theme.styles.textColor}>{formatDate(invoice.invoiceDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className={`font-medium ${theme.styles.textColor}`}>Due Date:</span>
            <span className={theme.styles.textColor}>{formatDate(invoice.dueDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className={`font-medium ${theme.styles.textColor}`}>Currency:</span>
            <span className={theme.styles.textColor}>{currency.name} ({currency.code})</span>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <div className={`${theme.styles.tableHeaderBg} rounded-t-lg p-4 ${theme.styles.borderColor} border`}>
          <div className={`grid grid-cols-12 gap-4 text-sm font-medium ${theme.styles.tableHeaderText}`}>
            <div className="col-span-6">Description</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-center">Rate</div>
            <div className="col-span-2 text-right">Amount</div>
          </div>
        </div>
        <div className={`border border-t-0 ${theme.styles.borderColor} rounded-b-lg ${theme.styles.backgroundColor}`}>
          {invoice.items.map((item, index) => (
            <div key={item.id} className={`grid grid-cols-12 gap-4 p-4 text-sm ${theme.styles.textColor} ${index !== invoice.items.length - 1 ? `border-b ${theme.styles.borderColor}` : ''}`}>
              <div className="col-span-6">{item.description}</div>
              <div className="col-span-2 text-center">{item.quantity}</div>
              <div className="col-span-2 text-center">{formatCurrency(item.rate, invoice.currency)}</div>
              <div className="col-span-2 text-right font-medium">{formatCurrency(item.amount, invoice.currency)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64 space-y-2">
          <div className={`flex justify-between ${theme.styles.textColor}`}>
            <span>Subtotal:</span>
            <span>{formatCurrency(invoice.subtotal, invoice.currency)}</span>
          </div>
          {invoice.taxRate > 0 && (
            <div className={`flex justify-between ${theme.styles.textColor}`}>
              <span>Tax ({invoice.taxRate}%):</span>
              <span>{formatCurrency(invoice.taxAmount, invoice.currency)}</span>
            </div>
          )}
          <Separator className={theme.styles.borderColor} />
          <div className={`flex justify-between text-lg font-bold ${theme.styles.textColor}`}>
            <span>Total:</span>
            <span className={theme.styles.totalHighlight}>{formatCurrency(invoice.total, invoice.currency)}</span>
          </div>
        </div>
      </div>

      {/* Notes and Terms */}
      {(invoice.notes || invoice.terms) && (
        <div className="space-y-4">
          {invoice.notes && (
            <div>
              <h4 className={`font-semibold ${theme.styles.accentColor} mb-2`}>Notes:</h4>
              <p className={`text-sm ${theme.styles.mutedTextColor} whitespace-pre-wrap`}>{invoice.notes}</p>
            </div>
          )}
          {invoice.terms && (
            <div>
              <h4 className={`font-semibold ${theme.styles.accentColor} mb-2`}>Terms & Conditions:</h4>
              <p className={`text-sm ${theme.styles.mutedTextColor} whitespace-pre-wrap`}>{invoice.terms}</p>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className={`mt-8 pt-4 border-t ${theme.styles.borderColor} text-center`}>
        <p className={`text-xs ${theme.styles.mutedTextColor}`}>
          Thank you for your business!
        </p>
      </div>
    </Card>
  );
};

export default InvoicePreview;