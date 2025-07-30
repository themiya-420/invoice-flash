import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Download, FileText, Save, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { InvoiceData, createEmptyInvoice } from "@/types/invoice";
import { exportToPDF } from "@/utils/pdfExport";
import InvoiceForm from "@/components/InvoiceForm";
import InvoicePreview from "@/components/InvoicePreview";

const Index = () => {
  const [invoice, setInvoice] = useState<InvoiceData>(createEmptyInvoice());
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedInvoice = localStorage.getItem("invoice-draft");
    if (savedInvoice) {
      try {
        setInvoice(JSON.parse(savedInvoice));
      } catch (error) {
        console.error("Failed to load saved invoice:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("invoice-draft", JSON.stringify(invoice));
  }, [invoice]);

  const handleExportPDF = async () => {
    const element = document.getElementById("invoice-preview");
    if (!element) {
      toast({
        title: "Export failed",
        description: "Could not find invoice preview to export.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    try {
      const filename = `${invoice.invoiceNumber || "invoice"}.pdf`;
      await exportToPDF(element, filename);
      toast({
        title: "Invoice exported",
        description: `Your invoice has been downloaded as ${filename}`,
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export invoice as PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem("invoice-draft", JSON.stringify(invoice));
    toast({
      title: "Draft saved",
      description: "Your invoice draft has been saved locally.",
    });
  };

  const handleNewInvoice = () => {
    setInvoice(createEmptyInvoice());
    toast({
      title: "New invoice",
      description: "Started a new invoice. Previous draft is still saved.",
    });
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>InvoiceFlash | Free Online Invoice Generator</title>
        <meta
          name="description"
          content="Create and download invoices online for free with InvoiceFlash. 100% free, secure, no signup needed."
        />
        <meta
          name="keywords"
          content="invoice generator, free invoice, online invoice maker, InvoiceFlash, PDF invoice tool"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="InvoiceFlash | Free Online Invoice Generator"
        />
        <meta
          property="og:description"
          content="Generate invoices online for free. Export to PDF. No login required."
        />
        <meta
          property="og:image"
          content="https://invoice-flash.themiya.dev/og-image.png"
        />
        <meta property="og:url" content="https://invoice-flash.themiya.dev.com" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="InvoiceFlash | Invoice Generator" />
        <meta
          name="twitter:description"
          content="Create free invoices and download as PDF with InvoiceFlash."
        />
        <meta
          name="twitter:image"
          content="https://invoice-flash.themiya.dev/og-image.png"
        />

        <link rel="canonical" href="https://invoice-flash.themiya.dev" />

        {/* Optional: JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "InvoiceFlash",
            url: "https://invoice-flash.themiya.dev",
            applicationCategory: "BusinessApplication",
            operatingSystem: "All",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Create and download invoices online for free with InvoiceFlash. No signup required.",
          })}
        </script>
      </Helmet>

      {/* Page Content */}
      <div className="min-h-screen bg-gradient-subtle">
        <header
          role="banner"
          className="bg-white shadow-soft border-b border-border"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center flex-wrap">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-accent">
                    InvoiceFlash - Free Online Invoice Generator
                  </h1>
                  <h2 className="text-sm font-medium text-muted-foreground">
                    Create and download invoices in seconds. 100% free. No
                    signup needed.
                  </h2>
                </div>
              </div>
              <div className="flex gap-2 mt-4 lg:mt-0">
                <Button
                  onClick={handleNewInvoice}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  New Invoice
                </Button>
                <Button
                  onClick={handleSaveDraft}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Draft
                </Button>
                <Button
                  onClick={handleExportPDF}
                  disabled={
                    isExporting || !invoice.businessName || !invoice.clientName
                  }
                  className="bg-primary hover:bg-primary/90 flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  {isExporting ? "Exporting..." : "Export PDF"}
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main
          role="main"
          aria-label="Main content"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <Folder className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-accent">
                  Invoice Details
                </h2>
              </div>
              <InvoiceForm invoice={invoice} onInvoiceChange={setInvoice} />
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-accent">
                  Live Preview
                </h2>
              </div>
              <div className="sticky top-8" id="invoice-preview">
                <InvoicePreview invoice={invoice} />
              </div>
            </div>
          </div>
        </main>

        <footer
          role="contentinfo"
          className="bg-white border-t border-border mt-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Free Invoice Generator - Create professional invoices instantly
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                No signup required • Secure local storage • Export to PDF
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
