import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { useEffect, useState } from 'react';
import 'mantine-datatable/styles.layer.css';
import { Button, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import axiosInstance from "@src/api";
import Swal from 'sweetalert2';

const companies = [
  { id: 1, title: 'Water Bill', amount: 100 },
  { id: 2, title: 'Electrict Bill', amount: 200 },
  { id: 3, title: 'Food', amount: 300 },
];

type Company = {
  id: number;
  title: string;
  amount: number;
};

const PAGE_SIZES = [10, 15, 20];

export default function DataTableComp() {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Company>>({
    columnAccessor: 'title',
    direction: 'asc',
  });

  const [records, setRecords] = useState(() => sortBy(companies, 'title'));
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  const [page, setPage] = useState(1);
  const [person, setPerson] = useState({})

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
  }, [page, pageSize]);

  useEffect(() => {
    const sortedData = sortBy(companies, sortStatus.columnAccessor) as Company[];
    setRecords(sortStatus.direction === 'desc' ? sortedData.reverse() : sortedData);
  }, [sortStatus]);

  useEffect(() => {
    axiosInstance
      .get("/api/getAllExpenses/me")
      .then((response) => {
        if (response.status === 200) {
          console.log(response)
        }
      })
      .catch((error) => {
        const message = error.response.data.message;
        Swal.fire({
          icon: "error",
          text: message,
        });
      });
  }, [])


  return (
    <div className='flex flex-col gap-6  h-full'>
      <div className='flex flex-col sm:flex-row justify-between gap-4 sm:gap-2'>
        <Button radius="md" color="black">Add Expenses</Button>
        <TextInput
          className='w-full sm:w-1/6 self-end'
          placeholder="Search"
          rightSection={<IconSearch />}
        />
      </div>

      <DataTable
        idAccessor="id"
        records={records}
        columns={[
          { accessor: 'title', title: 'Title', textAlign: 'center', sortable: true },
          { accessor: 'amount', title: 'Amount', textAlign: 'center', sortable: true },
        ]}
        paginationText={({ from, to, totalRecords }) =>
          `Showing data ${from} out ${to} of ${totalRecords} entries (0.225) seconds`
        }
        styles={{
          header: {
            color: "rgba(109, 109, 109, 0.6)",
            fontWeight: 500,
          },
          root: {
            color: "rgba(0, 0, 0, 0.6)",
          },
        }}
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
    </div>
  );
}
