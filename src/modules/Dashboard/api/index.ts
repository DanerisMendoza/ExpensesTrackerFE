import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@src/api";
import { AnalyticsStore } from "@src/modules/Dashboard/store";
import { AverageAmount, MonthlyExpenses, TopExpenses, TotalAmount } from "@src/modules/Dashboard/types";

export const useAnalytics = (userId: string) => {
  const {
    setAverageAmount,
    setMonthlyExpenses,
    setTopExpenses,
    setTotalAmount,
  } = AnalyticsStore();

  const fetchAverageAmount = useQuery<AverageAmount>({
    queryKey: ["averageAmount", userId],
    queryFn: async () => {
      const res = await axiosInstance.get(`analytics/user/${userId}/averageAmount`);
      if (res.status === 200) {
        setAverageAmount(res.data); // Store the result in the AnalyticsStore
        return res.data;
      } else {
        throw new Error("Failed to fetch average amount");
      }
    },
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });

  const fetchMonthlyExpenses = useQuery<MonthlyExpenses[]>({
    queryKey: ["monthlyExpenses", userId],
    queryFn: async () => {
      const res = await axiosInstance.get(`analytics/user/${userId}/monthlyExpenses`);
      if (res.status === 200) {
        setMonthlyExpenses(res.data); // Store the result in the AnalyticsStore
        return res.data;
      } else {
        throw new Error("Failed to fetch monthly expenses");
      }
    },
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });

  const fetchTopExpenses = useQuery<TopExpenses[]>({
    queryKey: ["topExpenses", userId],
    queryFn: async () => {
      const res = await axiosInstance.get(`analytics/user/${userId}/topExpenses?limit=10`);
      if (res.status === 200) {
        setTopExpenses(res.data); // Store the result in the AnalyticsStore
        return res.data;
      } else {
        throw new Error("Failed to fetch top expenses");
      }
    },
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });

  const fetchTotalAmount = useQuery<TotalAmount>({
    queryKey: ["totalAmount", userId],
    queryFn: async () => {
      const res = await axiosInstance.get(`analytics/user/${userId}/totalAmount`);
      if (res.status === 200) {
        setTotalAmount(res.data); // Store the result in the AnalyticsStore
        return res.data;
      } else {
        throw new Error("Failed to fetch total amount");
      }
    },
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });

  return {
    averageAmount: fetchAverageAmount.data,
    monthlyExpenses: fetchMonthlyExpenses.data,
    topExpenses: fetchTopExpenses.data,
    totalAmount: fetchTotalAmount.data,
    isLoading:
      fetchAverageAmount.isLoading ||
      fetchMonthlyExpenses.isLoading ||
      fetchTopExpenses.isLoading ||
      fetchTotalAmount.isLoading,
    error:
      fetchAverageAmount.error ||
      fetchMonthlyExpenses.error ||
      fetchTopExpenses.error ||
      fetchTotalAmount.error,
  };
};
