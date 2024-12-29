import DataTableComp from "@src/modules/Expenses/components/DataTable";
import { Button, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import ExpensesDialog from "./components/ExpensesDialog";
import { ExpensesStore } from "./ExpensesStore";

export const Expenses = () => {

  const { set_action } = ExpensesStore()

  return (
    <div className="flex flex-col gap-4 sm:gap-4 h-full ">
      <div className='flex flex-col sm:flex-row justify-between gap-4 sm:gap-2'>
        <Button radius="md" color="black" onClick={() => set_action('NewExpenses')}>Add Expenses</Button>
        <TextInput
          className='w-full sm:w-1/6 self-end'
          placeholder="Search"
          rightSection={<IconSearch />}
        />
      </div>
      <DataTableComp />
      <ExpensesDialog />
    </div>
  );
};

export default Expenses;
