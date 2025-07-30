import { useState } from 'react';
import { Plus, Trash2, Building, User, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { InvoiceData, InvoiceItem } from '@/types/invoice';
import LogoUpload from './LogoUpload';

interface InvoiceFormProps {
  invoice: InvoiceData;
  onInvoiceChange: (invoice: InvoiceData) => void;
}

const InvoiceForm = ({ invoice, onInvoiceChange }: InvoiceFormProps) => {
  const updateInvoice = (updates: Partial<InvoiceData>) => {
    const newInvoice = { ...invoice, ...updates };
    // Recalculate totals
    const subtotal = newInvoice.items.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = subtotal * (newInvoice.taxRate / 100);
    const total = subtotal + taxAmount;
    
    onInvoiceChange({
      ...newInvoice,
      subtotal,
      taxAmount,
      total,
    });
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0,
    };
    updateInvoice({ items: [...invoice.items, newItem] });
  };

  const updateItem = (id: string, updates: Partial<InvoiceItem>) => {
    const updatedItems = invoice.items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, ...updates };
        updatedItem.amount = updatedItem.quantity * updatedItem.rate;
        return updatedItem;
      }
      return item;
    });
    updateInvoice({ items: updatedItems });
  };

  const removeItem = (id: string) => {
    updateInvoice({ items: invoice.items.filter(item => item.id !== id) });
  };

  return (
    <div className="space-y-6">
      {/* Logo Upload */}
      <LogoUpload
        currentLogo={invoice.logo}
        onLogoChange={(logo) => updateInvoice({ logo })}
      />

      {/* Business Information */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Building className="h-5 w-5" />
          Business Information
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              value={invoice.businessName}
              onChange={(e) => updateInvoice({ businessName: e.target.value })}
              placeholder="Your Business Name"
            />
          </div>
          <div>
            <Label htmlFor="businessEmail">Email Address</Label>
            <Input
              id="businessEmail"
              type="email"
              value={invoice.businessEmail}
              onChange={(e) => updateInvoice({ businessEmail: e.target.value })}
              placeholder="business@example.com"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="businessAddress">Business Address</Label>
            <Textarea
              id="businessAddress"
              value={invoice.businessAddress}
              onChange={(e) => updateInvoice({ businessAddress: e.target.value })}
              placeholder="Your business address"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="businessPhone">Phone Number</Label>
            <Input
              id="businessPhone"
              value={invoice.businessPhone}
              onChange={(e) => updateInvoice({ businessPhone: e.target.value })}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
      </Card>

      {/* Client Information */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <User className="h-5 w-5" />
          Bill To
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="clientName">Client Name</Label>
            <Input
              id="clientName"
              value={invoice.clientName}
              onChange={(e) => updateInvoice({ clientName: e.target.value })}
              placeholder="Client or Company Name"
            />
          </div>
          <div>
            <Label htmlFor="clientEmail">Client Email</Label>
            <Input
              id="clientEmail"
              type="email"
              value={invoice.clientEmail || ''}
              onChange={(e) => updateInvoice({ clientEmail: e.target.value })}
              placeholder="client@example.com"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="clientAddress">Client Address</Label>
            <Textarea
              id="clientAddress"
              value={invoice.clientAddress}
              onChange={(e) => updateInvoice({ clientAddress: e.target.value })}
              placeholder="Client address"
              rows={3}
            />
          </div>
        </div>
      </Card>

      {/* Invoice Details */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Invoice Details
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <Label htmlFor="invoiceNumber">Invoice Number</Label>
            <Input
              id="invoiceNumber"
              value={invoice.invoiceNumber}
              onChange={(e) => updateInvoice({ invoiceNumber: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="invoiceDate">Invoice Date</Label>
            <Input
              id="invoiceDate"
              type="date"
              value={invoice.invoiceDate}
              onChange={(e) => updateInvoice({ invoiceDate: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={invoice.dueDate}
              onChange={(e) => updateInvoice({ dueDate: e.target.value })}
            />
          </div>
        </div>
      </Card>

      {/* Items */}
      <Card className="p-6 bg-card border-border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-foreground">Items</h3>
          <Button onClick={addItem} size="sm" className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
        
        <div className="space-y-4">
          {invoice.items.map((item, index) => (
            <div key={item.id} className="border border-border rounded-lg p-4 bg-muted/30">
              <div className="grid gap-4 md:grid-cols-12 items-end">
                <div className="md:col-span-5">
                  <Label>Description</Label>
                  <Input
                    value={item.description}
                    onChange={(e) => updateItem(item.id, { description: e.target.value })}
                    placeholder="Service or product description"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, { quantity: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Rate</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.rate}
                    onChange={(e) => updateItem(item.id, { rate: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Amount</Label>
                  <div className="h-10 px-3 py-2 border border-border rounded-md bg-muted text-muted-foreground flex items-center">
                    ${item.amount.toFixed(2)}
                  </div>
                </div>
                <div className="md:col-span-1">
                  <Button
                    onClick={() => removeItem(item.id)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {invoice.items.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No items added yet. Click "Add Item" to get started.</p>
          </div>
        )}
      </Card>

      {/* Totals */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Totals</h3>
        <div className="space-y-4 max-w-md ml-auto">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${invoice.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <Label htmlFor="taxRate">Tax Rate (%):</Label>
            <Input
              id="taxRate"
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={invoice.taxRate}
              onChange={(e) => updateInvoice({ taxRate: parseFloat(e.target.value) || 0 })}
              className="w-20"
            />
          </div>
          <div className="flex justify-between">
            <span>Tax Amount:</span>
            <span>${invoice.taxAmount.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>${invoice.total.toFixed(2)}</span>
          </div>
        </div>
      </Card>

      {/* Notes */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Additional Information</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={invoice.notes || ''}
              onChange={(e) => updateInvoice({ notes: e.target.value })}
              placeholder="Any additional notes or comments..."
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="terms">Terms & Conditions</Label>
            <Textarea
              id="terms"
              value={invoice.terms || ''}
              onChange={(e) => updateInvoice({ terms: e.target.value })}
              placeholder="Payment terms and conditions..."
              rows={3}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InvoiceForm;