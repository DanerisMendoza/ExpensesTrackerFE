// utils/exportToExcel.ts
import * as XLSX from 'xlsx';  // Ensure you have XLSX imported

// Function to filter out unwanted fields
function filterData(data: any[]): any[] {
  return data.map((item) => {
    const { _id, user_id, __v, createdAt, updatedAt, ...rest } = item;
    return rest;
  });
}

// Function to sort data by a given field (ascending order)
function sortData(data: any[], sortBy: string): any[] {
  return data.sort((a, b) => {
    return new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime();
  });
}

// Function to generate the filename with the current date
function generateFilename(): string {
  const now = new Date();
  const formattedDate = now.toISOString().slice(0, 19).replace(/[-T:]/g, '');
  return `ExpensesData_${formattedDate}.xlsx`;
}

// Function to export data to Excel (accepts data as parameter)
export function ExportToExcel(data: any[]) {
  if (!data || data.length === 0) {
    console.log('No data available to export.');
    return;
  }

  console.log('Data to export:', data);

  // Filter and sort data
  const filteredData = filterData(data);
  const sortedData = sortData(filteredData, 'date'); // Example: sorting by 'date'

  // Create a worksheet from the sorted data
  const worksheet = XLSX.utils.json_to_sheet(sortedData);

  // Set custom column widths
  worksheet['!cols'] = [
    { wpx: 150 },
    { wpx: 150 },
    { wpx: 150 },
    { wpx: 150 },
    { wpx: 150 },
    { wpx: 150 },
    { wpx: 150 },
    { wpx: 150 },
  ];

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');

  // Generate filename and export
  const filename = generateFilename();
  XLSX.writeFile(workbook, filename);
}
