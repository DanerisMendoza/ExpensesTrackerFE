import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { useEffect, useState } from 'react';
import 'mantine-datatable/styles.layer.css';
import axiosInstance from "@src/api";
import Swal from 'sweetalert2';

type Company = {
  _id: number;
  title: string;
  amount: number;
};

const PAGE_SIZES = [10, 15, 20];

export default function DataTableComp() {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Company>>({
    columnAccessor: 'title',
    direction: 'asc',
  });

  const [response, setResponse] = useState([{ _id: 1, title: '', amount: 0 }])
  const [records, setRecords] = useState(() => sortBy(response, 'title'));
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
  }, [page, pageSize]);

  useEffect(() => {
    const sortedData = sortBy(response, sortStatus.columnAccessor) as Company[];
    setRecords(sortStatus.direction === 'desc' ? sortedData.reverse() : sortedData);
  }, [sortStatus]);

  useEffect(() => {
    axiosInstance
      .get("/api/getAllExpenses/me")
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data)
          setResponse(response.data)
          setRecords(response.data)
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
      <DataTable
        idAccessor="_id"
        records={records}
        columns={[
          { accessor: 'title', title: 'Title', textAlign: 'center', sortable: true },
          { accessor: 'amount', title: 'Amount', textAlign: 'center', sortable: true },
        ]}
        paginationText={({ from, to, totalRecords }) =>
          `Showing data ${from} out ${to} of ${totalRecords} entries (0.225) seconds`
        }
        className='p-4'
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
  );
}
