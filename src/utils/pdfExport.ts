import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPDF = async (element: HTMLElement, filename: string = 'invoice.pdf') => {
  try {
    // Create canvas from the element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      height: element.scrollHeight,
      width: element.scrollWidth,
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Calculate dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add new pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(filename);
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw new Error('Failed to export PDF');
  }
};