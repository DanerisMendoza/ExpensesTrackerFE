// utils/exportToPdf.ts
import { jsPDF } from "jspdf";
import 'jspdf-autotable';  // Import autoTable for jsPDF

// Function to filter out unwanted fields from data
function filterData(data: any[]): any[] {
  return data.map((item) => {
    const { _id, user_id, __v, createdAt, updatedAt, ...rest } = item;
    return rest;
  });
}

// Function to generate the filename with current date and time
function generateFilename(): string {
  const now = new Date();
  const formattedDate = now.toISOString().slice(0, 19).replace(/[-T:]/g, '');
  return `ExpensesData_${formattedDate}.pdf`;
}

// Function to export data to PDF (accepts data as parameter)
export function ExportToPdf(data: any[]) {
  if (!data || data.length === 0) {
    console.log('No data available to export.');
    return;
  }

  console.log('Data to export:', data);

  // Filter data to remove unnecessary fields
  const filteredData = filterData(data);

  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Generate the table data
  const headers = Object.keys(filteredData[0]);
  const tableData = filteredData.map((row: any) => {
    return headers.map((header) => row[header] || ''); // Prepare row data based on headers
  });

  // Title for the PDF
  doc.setFont('helvetica');
  doc.setFontSize(10);
  doc.text('Expenses Data', 10, 10);

  // Using autoTable to generate the table
  (doc as any).autoTable({
    head: [headers], // Table headers
    body: tableData, // Table data
    startY: 20, // Starting Y position
    margin: { top: 20 }, // Margin for the table
    styles: {
      font: 'helvetica',
      fontSize: 10,
    },
    headStyles: {
      fillColor: [41, 128, 185], // Customize header color (optional)
      textColor: [255, 255, 255], // Header text color
    },
    tableWidth: 'auto', // Set auto width for the table
    columnStyles: {
      0: { cellWidth: 30 }, // Set custom width for specific columns (optional)
      1: { cellWidth: 40 },
      2: { cellWidth: 40 },
      // Add more columns styles if necessary
    }
  });

  // Save the PDF with the current date in the filename
  const filename = generateFilename();
  doc.save(filename);
}
