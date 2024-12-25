import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { useEffect, useState } from 'react';
import 'mantine-datatable/styles.layer.css';

// Mock data to demonstrate functionality
const companies = [
  { id: 1, name: 'Tech Corp', streetAddress: '123 Main St', city: 'New York', state: 'NY' },
  { id: 2, name: 'Innovatech', streetAddress: '456 Elm St', city: 'San Francisco', state: 'CA' },
  { id: 3, name: 'NextGen Solutions', streetAddress: '789 Oak St', city: 'Austin', state: 'TX' },
];

type Company = {
  id: number;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
};

const PAGE_SIZES = [10, 15, 20];

export default function DataTableComp() {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Company>>({
    columnAccessor: 'name',
    direction: 'asc',
  });
  const [records, setRecords] = useState(() => sortBy(companies, 'name'));
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
  }, [page, pageSize]);

  useEffect(() => {
    const sortedData = sortBy(companies, sortStatus.columnAccessor) as Company[];
    setRecords(sortStatus.direction === 'desc' ? sortedData.reverse() : sortedData);
  }, [sortStatus]);

  return (
    <DataTable
      withTableBorder
      withColumnBorders
      records={records}
      columns={[
        { accessor: 'name', title: 'Company Name', sortable: true, textAlign: 'center' },
        { accessor: 'streetAddress', title: 'Address', textAlign: 'center' },
        { accessor: 'city', title: 'City', sortable: true, textAlign: 'center' },
        { accessor: 'state', title: 'State', textAlign: 'center', sortable: true },
      ]}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
      totalRecords={records.length}
      paginationActiveBackgroundColor="grape"
      recordsPerPage={pageSize}
      page={page}
      onPageChange={(p) => setPage(p)}
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
    />
  );
}
