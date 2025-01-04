import { useState } from 'react';
import DataTableComp from "@src/modules/Expenses/components/DataTable";
import { Button, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import ExpensesDialog from "./components/ExpensesDialog";

export const Expenses = () => {
  const [search, setSearch] = useState<string>('');
  const [action, setAction] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [refreshData, setRefreshData] = useState<boolean>(false);

  const handleSearch = () => {
    setSearchQuery(search);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleRefreshData = () => {
    setRefreshData(true);
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-4 h-full">
      <div className='flex flex-col sm:flex-row justify-between gap-4 sm:gap-2'>
        <div className='flex gap-2'>
          <Button radius="md" color="blue" onClick={() => setAction('NewExpenses')}>
            + Add Expenses
          </Button>
          <Button radius="md" color="green" >
            Export Excel
          </Button>
          <Button radius="md" color="red" >
            Export PDF
          </Button>
        </div>
        <TextInput
          className='w-full sm:w-1/6 self-end'
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
          rightSection={<IconSearch onClick={handleSearch} />}
        />
      </div>

      <DataTableComp search={searchQuery} refreshData={refreshData} />

      <ExpensesDialog onDialogClose={handleRefreshData} action={action} setAction={setAction} />
    </div>
  );
};

export default Expenses;
