import { GlobalStore } from "@src/utils/GlobalStore";
import MonthlyExpenses from "./components/MonthlyExpenses";
import TopExpensesBar from "./components/TopExpensesBar";
import TopExpensesPie from "./components/TopExpensesPie";
import "chart.js/auto";
import { useEffect } from "react";

const Dashboard = () => {

  const { is_mobile } = GlobalStore()
  useEffect(() => {
    console.log(is_mobile)
  }, [is_mobile])

  return (
    <>
      {!is_mobile ? (<div className="flex h-full ">
        <div className="w-1/2">
          <MonthlyExpenses />
        </div>
        <div className="w-1/2">
          <TopExpensesBar />
        </div>
      </div>) : (
        <div className="h-full">
          <TopExpensesPie />
        </div>
      )}
    </>
  );
};

export default Dashboard;
