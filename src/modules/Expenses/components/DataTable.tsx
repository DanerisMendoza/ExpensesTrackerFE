import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import axiosInstance from "@src/api";
import Swal from 'sweetalert2';
import 'mantine-datatable/styles.layer.css';

type Expenses = {
  _id: string;
  title: string;
  user_id: string;
  amount: number;
  spent_at: Date;
  updatedAt: Date;
  createdAt: Date;
};

const PAGE_SIZES = [10, 15, 20];

export default function DataTableComp({ search, refreshData }: { search: string, refreshData: boolean }) {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Expenses>>({
    columnAccessor: 'createdAt', // Default sorting by createdAt (latest first)
    direction: 'desc',
  });

  const [records, setRecords] = useState<Expenses[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  const [page, setPage] = useState(1);

  // Function to fetch data from the API
  const fetchData = () => {
    axiosInstance
      .get('/api/getAllExpenses/me', {
        params: {
          page,
          limit: pageSize,
          search, // Include search in query
          sortBy: sortStatus.columnAccessor,
          sortDirection: sortStatus.direction,
        },
      })
      .then((res) => {
        console.log("API Response:", res);
        const { data, totalExpenses } = res.data;
        if (res.status === 200 && Array.isArray(data)) {
          setRecords(data); // Set fetched records
          setTotalRecords(totalExpenses); // Set total record count
        } else {
          console.error("Unexpected response format:", res.data);
        }
      })
      .catch((error) => {
        const message = error.response?.data?.error || "Failed to fetch data. Please try again later.";
        console.error("Error fetching data:", error.response || error);
        Swal.fire({
          icon: "error",
          text: message,
        });
      });
  };

  // Fetch data when page, pageSize, search, or sortStatus change
  useEffect(() => {
    fetchData();
  }, [page, pageSize, sortStatus, search, refreshData,]);

  return (
    <DataTable
      idAccessor="_id"
      records={records}
      columns={[
        { accessor: '_id', title: 'ID', textAlign: 'center', sortable: true },
        { accessor: 'title', title: 'Title', textAlign: 'center', sortable: true },
        { accessor: 'amount', title: 'Amount', textAlign: 'center', sortable: true, },
        { accessor: 'spent_at', title: 'Spent At', textAlign: 'center', sortable: true },
        { accessor: 'updatedAt', title: 'Updated At', textAlign: 'center', sortable: true },
        { accessor: 'createdAt', title: 'Created At', textAlign: 'center', sortable: true },
      ]}
      paginationText={({ from, to, totalRecords }) =>
        `Showing data ${from} to ${to} of ${totalRecords} entries`
      }
      className="p-4"
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
      totalRecords={totalRecords}
      paginationActiveBackgroundColor="grape"
      recordsPerPage={pageSize}
      page={page}
      onPageChange={setPage}
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
    />
  );
}
