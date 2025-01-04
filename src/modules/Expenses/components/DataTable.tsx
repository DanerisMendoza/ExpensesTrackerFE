import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import axiosInstance from "@src/api";
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { IconPencil, IconTrash } from '@tabler/icons-react'; // Import Tabler icons
import 'mantine-datatable/styles.layer.css';

dayjs.extend(localizedFormat);

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

export default function DataTableComp({ search, refreshData }: { search: string; refreshData: boolean }) {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Expenses>>({
    columnAccessor: 'createdAt',
    direction: 'desc',
  });

  const [records, setRecords] = useState<Expenses[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);
  const [page, setPage] = useState(1);

  // Function to fetch data from the API
  const fetchData = () => {
    axiosInstance
      .get('getAllExpenses/me', {
        params: {
          page,
          limit: pageSize,
          search,
          sortBy: sortStatus.columnAccessor,
          sortDirection: sortStatus.direction,
        },
      })
      .then((res) => {
        const { data, totalExpenses } = res.data;
        if (res.status === 200 && Array.isArray(data)) {
          setRecords(data);
          setTotalRecords(totalExpenses);
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
  }, [page, pageSize, sortStatus, search, refreshData]);

  // Handlers for action icons
  const handleEdit = (id: string) => {
    console.log(`Edit clicked for ID: ${id}`);
    // Implement edit functionality
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`deleteExpenseById/${id}`)
          .then((response) => {
            if (response.status === 200) {
              Swal.fire("Deleted!", response.data.message, "success");
              fetchData(); // Refresh the data after deletion
            }
          })
          .catch((error) => {
            const message = error.response?.data?.message || "Failed to delete the expense.";
            Swal.fire("Error!", message, "error");
            console.error("Error deleting expense:", error.response || error);
          });
      }
    });
  };


  return (
    <DataTable
      idAccessor="_id"
      records={records}
      columns={[
        { accessor: '_id', title: 'ID', textAlign: 'center', sortable: true },
        { accessor: 'title', title: 'Title', textAlign: 'center', sortable: true },
        { accessor: 'amount', title: 'Amount', textAlign: 'center', sortable: true },
        {
          accessor: 'spent_at',
          title: 'Spent At',
          textAlign: 'center',
          sortable: true,
          render: (record) => dayjs(record.spent_at).format('MMMM D, YYYY'),
        },
        {
          accessor: 'updatedAt',
          title: 'Updated At',
          textAlign: 'center',
          sortable: true,
          render: (record) => dayjs(record.updatedAt).format('MMMM D, YYYY'),
        },
        {
          accessor: 'createdAt',
          title: 'Created At',
          textAlign: 'center',
          sortable: true,
          render: (record) => dayjs(record.createdAt).format('MMMM D, YYYY'),
        },
        {
          accessor: 'actions',
          title: 'Actions',
          textAlign: 'center',
          render: (record) => (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <IconPencil
                size={20}
                style={{ cursor: 'pointer', color: '#007bff' }}
                onClick={() => handleEdit(record._id)}
                title="Edit"
              />
              <IconTrash
                size={20}
                style={{ cursor: 'pointer', color: '#dc3545' }}
                onClick={() => handleDelete(record._id)}
                title="Delete"
              />
            </div>
          ),
        },
      ]}
      paginationText={({ from, to, totalRecords }) =>
        `Showing data ${from} to ${to} of ${totalRecords} entries`
      }
      className=""
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
