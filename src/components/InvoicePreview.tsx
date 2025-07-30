import { InvoiceData } from '@/types/invoice';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface InvoicePreviewProps {
  invoice: InvoiceData;
}

const InvoicePreview = ({ invoice }: InvoicePreviewProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className="p-8 bg-white border-border shadow-elegant max-w-4xl mx-auto" id="invoice-preview">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          {invoice.logo && (
            <img
              src={invoice.logo}
              alt="Business Logo"
              className="max-h-20 max-w-32 object-contain"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-accent">INVOICE</h1>
            <p className="text-muted-foreground">{invoice.invoiceNumber}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-semibold text-accent mb-2">{invoice.businessName}</h2>
          <div className="text-sm text-muted-foreground space-y-1">
            {invoice.businessAddress.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
            {invoice.businessPhone && <p>{invoice.businessPhone}</p>}
            {invoice.businessEmail && <p>{invoice.businessEmail}</p>}
          </div>
        </div>
      </div>

      {/* Invoice Details and Bill To */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold text-accent mb-3">Bill To:</h3>
          <div className="space-y-1">
            <p className="font-medium">{invoice.clientName}</p>
            {invoice.clientAddress.split('\n').map((line, index) => (
              <p key={index} className="text-sm text-muted-foreground">{line}</p>
            ))}
            {invoice.clientEmail && <p className="text-sm text-muted-foreground">{invoice.clientEmail}</p>}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Invoice Date:</span>
            <span>{formatDate(invoice.invoiceDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Due Date:</span>
            <span>{formatDate(invoice.dueDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Currency:</span>
            <span>{invoice.currency}</span>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <div className="bg-muted rounded-t-lg p-4">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium">
            <div className="col-span-6">Description</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-center">Rate</div>
            <div className="col-span-2 text-right">Amount</div>
          </div>
        </div>
        <div className="border border-t-0 border-border rounded-b-lg">
          {invoice.items.map((item, index) => (
            <div key={item.id} className={`grid grid-cols-12 gap-4 p-4 text-sm ${index !== invoice.items.length - 1 ? 'border-b border-border' : ''}`}>
              <div className="col-span-6">{item.description}</div>
              <div className="col-span-2 text-center">{item.quantity}</div>
              <div className="col-span-2 text-center">${item.rate.toFixed(2)}</div>
              <div className="col-span-2 text-right font-medium">${item.amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${invoice.subtotal.toFixed(2)}</span>
          </div>
          {invoice.taxRate > 0 && (
            <div className="flex justify-between">
              <span>Tax ({invoice.taxRate}%):</span>
              <span>${invoice.taxAmount.toFixed(2)}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-primary">${invoice.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Notes and Terms */}
      {(invoice.notes || invoice.terms) && (
        <div className="space-y-4">
          {invoice.notes && (
            <div>
              <h4 className="font-semibold text-accent mb-2">Notes:</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{invoice.notes}</p>
            </div>
          )}
          {invoice.terms && (
            <div>
              <h4 className="font-semibold text-accent mb-2">Terms & Conditions:</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{invoice.terms}</p>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          Thank you for your business!
        </p>
      </div>
    </Card>
  );
};

export default InvoicePreview;