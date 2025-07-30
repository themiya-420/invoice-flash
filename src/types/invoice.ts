export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceData {
  // Business Info
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  businessEmail: string;
  logo?: string;

  // Client Info
  clientName: string;
  clientAddress: string;
  clientEmail?: string;

  // Invoice Details
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  currency: string;
  theme: string;

  // Items
  items: InvoiceItem[];

  // Totals
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;

  // Notes
  notes?: string;
  terms?: string;
}

export const createEmptyInvoice = (): InvoiceData => ({
  businessName: '',
  businessAddress: '',
  businessPhone: '',
  businessEmail: '',
  clientName: '',
  clientAddress: '',
  clientEmail: '',
  invoiceNumber: `INV-${Date.now()}`,
  invoiceDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  currency: 'USD',
  theme: 'modern-blue',
  items: [],
  subtotal: 0,
  taxRate: 0,
  taxAmount: 0,
  total: 0,
  notes: '',
  terms: 'Payment is due within 30 days of invoice date.',
});