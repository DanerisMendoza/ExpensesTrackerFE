import { DataTable as MantineDataTable } from 'mantine-datatable';
import { useEffect } from 'react';
import axiosInstance from "@src/api";
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import 'mantine-datatable/styles.layer.css';
import { Expenses } from '@src/modules/Expenses/types';
import { DialogStore, DataTableStore } from "@src/modules/Expenses/store"

dayjs.extend(localizedFormat);
const PAGE_SIZES = [10, 15, 20];

export default function DataTable() {

  const { setAction, setSelectedData } = DialogStore()
  
  const {
    search, records, totalRecords, page, pageSize, sortStatus, refresh,
    setRecords, setTotalRecords, setPage, setPageSize, setSortStatus, setRefresh
  } = DataTableStore();

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

  useEffect(() => {
    fetchData();
    return(
      setRefresh(false)
    )
  }, [page, pageSize, sortStatus, refresh]);

  const handleEdit = (data: Expenses) => {
    setAction('Update')
    setSelectedData(data)
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
    <MantineDataTable
      idAccessor="_id"
      records={records}
      columns={[
        { accessor: '_id', title: 'ID', textAlign: 'left', sortable: true },
        { accessor: 'title', title: 'Title', textAlign: 'left', sortable: true },
        {
          accessor: 'amount', title: 'Amount', textAlign: 'left', sortable: true,
          render: (record) => `₱ ${record.amount}`,
        },
        {
          accessor: 'spent_at', title: 'Spent At', textAlign: 'left', sortable: true,
          render: (record) => dayjs(record.spent_at).format('MMMM D, YYYY'),
        },
        {
          accessor: 'actions', title: 'Actions', textAlign: 'left',
          render: (record) => (
            <div style={{ display: 'flex', justifyContent: 'left', gap: '10px' }}>
              <IconPencil
                size={20}
                style={{ cursor: 'pointer', color: '#007bff' }}
                onClick={() => handleEdit(record)}
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
