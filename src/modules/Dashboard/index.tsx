import { GlobalStore } from "@src/utils/GlobalStore";
import MonthlyExpenses from "./components/MonthlyExpenses";
import TopExpensesBar from "./components/TopExpensesBar";
import TopExpensesPie from "./components/TopExpensesPie";
import "chart.js/auto";

const Dashboard = () => {

  const { is_mobile } = GlobalStore()

  return (
    <>
      {!is_mobile ? (<div className="flex h-full bg-white p-4">
        <div className="w-1/2">
          <MonthlyExpenses />
        </div>
        <div className="w-1/2">
          <TopExpensesBar />
        </div>
      </div>) : (
        <div className="h-full bg-white p-4">
          <TopExpensesPie />
        </div>
      )}
    </>
  );
};

export default Dashboard;
