import DataTableComp from "@src/modules/Expenses/components/DataTable";

export const Expenses = () => {
  return (
    <div className=" flex flex-col gap-12 sm:gap-4">
      <DataTableComp/>
    </div>
  );
};

export default Expenses;
