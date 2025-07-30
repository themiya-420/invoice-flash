export interface InvoiceTheme {
  id: string;
  name: string;
  description: string;
  preview: string;
  styles: {
    headerBg: string;
    headerText: string;
    accentColor: string;
    tableHeaderBg: string;
    tableHeaderText: string;
    borderColor: string;
    backgroundColor: string;
    textColor: string;
    mutedTextColor: string;
    totalHighlight: string;
  };
}

export const invoiceThemes: InvoiceTheme[] = [
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    description: 'Clean and professional with blue accents',
    preview: '🔵',
    styles: {
      headerBg: 'bg-blue-600',
      headerText: 'text-white',
      accentColor: 'text-blue-600',
      tableHeaderBg: 'bg-blue-50',
      tableHeaderText: 'text-blue-900',
      borderColor: 'border-blue-200',
      backgroundColor: 'bg-white',
      textColor: 'text-gray-900',
      mutedTextColor: 'text-gray-600',
      totalHighlight: 'text-blue-600',
    },
  },
  {
    id: 'elegant-green',
    name: 'Elegant Green',
    description: 'Sophisticated design with green elements',
    preview: '🟢',
    styles: {
      headerBg: 'bg-emerald-600',
      headerText: 'text-white',
      accentColor: 'text-emerald-600',
      tableHeaderBg: 'bg-emerald-50',
      tableHeaderText: 'text-emerald-900',
      borderColor: 'border-emerald-200',
      backgroundColor: 'bg-white',
      textColor: 'text-gray-900',
      mutedTextColor: 'text-gray-600',
      totalHighlight: 'text-emerald-600',
    },
  },
  {
    id: 'minimal-gray',
    name: 'Minimal Gray',
    description: 'Simple and clean monochrome design',
    preview: '⚫',
    styles: {
      headerBg: 'bg-gray-800',
      headerText: 'text-white',
      accentColor: 'text-gray-800',
      tableHeaderBg: 'bg-gray-100',
      tableHeaderText: 'text-gray-900',
      borderColor: 'border-gray-300',
      backgroundColor: 'bg-white',
      textColor: 'text-gray-900',
      mutedTextColor: 'text-gray-600',
      totalHighlight: 'text-gray-800',
    },
  },
  {
    id: 'creative-purple',
    name: 'Creative Purple',
    description: 'Bold and creative with purple styling',
    preview: '🟣',
    styles: {
      headerBg: 'bg-purple-600',
      headerText: 'text-white',
      accentColor: 'text-purple-600',
      tableHeaderBg: 'bg-purple-50',
      tableHeaderText: 'text-purple-900',
      borderColor: 'border-purple-200',
      backgroundColor: 'bg-white',
      textColor: 'text-gray-900',
      mutedTextColor: 'text-gray-600',
      totalHighlight: 'text-purple-600',
    },
  },
  {
    id: 'warm-orange',
    name: 'Warm Orange',
    description: 'Friendly and approachable orange theme',
    preview: '🟠',
    styles: {
      headerBg: 'bg-orange-600',
      headerText: 'text-white',
      accentColor: 'text-orange-600',
      tableHeaderBg: 'bg-orange-50',
      tableHeaderText: 'text-orange-900',
      borderColor: 'border-orange-200',
      backgroundColor: 'bg-white',
      textColor: 'text-gray-900',
      mutedTextColor: 'text-gray-600',
      totalHighlight: 'text-orange-600',
    },
  },
];

export const getThemeById = (id: string): InvoiceTheme => {
  return invoiceThemes.find(theme => theme.id === id) || invoiceThemes[0];
};