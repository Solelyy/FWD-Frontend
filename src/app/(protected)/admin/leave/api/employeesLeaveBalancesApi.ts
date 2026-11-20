import { EmployeesLeaveBalancesResponse } from "../types/leave-balances";
import { mockEmployeesLeaveBalances } from "../mock-data/leave-balances";

export async function employeesLeaveBalancesApi(): Promise<EmployeesLeaveBalancesResponse> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
    return mockEmployeesLeaveBalances;
  }
  const response = await fetch(
    `/api/admin/employee/leave-balances`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  const result = await response.json();
  console.log("Employee Leave Balances", result);

  if (!response.ok) {
    throw new Error("Unable to fetch employee leave balances.");
  }

  return result;
}
