import { useExpenses } from "@src/modules/Expenses/api/use-expenses";
import { useEffect } from "react";
export const Dashboard = () => {
  
  const { isFetching, isError, data } = useExpenses();

  useEffect(() => {
    console.log(data);
  }, [data]);
  
  useEffect(() => {
    console.log(isFetching);
  }, [isFetching]);
  
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
