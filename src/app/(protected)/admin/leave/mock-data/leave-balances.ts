import { EmployeesLeaveBalancesResponse } from "../types/leave-balances";

// Mock dataset scope: April 2026
export const mockEmployeesLeaveBalances: EmployeesLeaveBalancesResponse = {
	employees: [
		{
			id: 1,
			employeeId: "EMP-1001",
			firstname: "Mia",
			lastname: "Santos",
			sickLeaveBalance: 6,
			vacationLeaveBalance: 9,
			accumulatedLeave: 2,
		},
		{
			id: 2,
			employeeId: "EMP-1002",
			firstname: "Noah",
			lastname: "Rivera",
			sickLeaveBalance: 4,
			vacationLeaveBalance: 7,
			accumulatedLeave: 0,
		},
		{
			id: 3,
			employeeId: "EMP-1003",
			firstname: "Ava",
			lastname: "Delos Reyes",
			sickLeaveBalance: 8,
			vacationLeaveBalance: 10,
			accumulatedLeave: 3,
		},
		{
			id: 4,
			employeeId: "EMP-1004",
			firstname: "Liam",
			lastname: "Cruz",
			sickLeaveBalance: 5,
			vacationLeaveBalance: 6,
			accumulatedLeave: 1,
		},
		{
			id: 5,
			employeeId: "EMP-1005",
			firstname: "Sophia",
			lastname: "Garcia",
			sickLeaveBalance: 7,
			vacationLeaveBalance: 8,
			accumulatedLeave: 4,
		},
		{
			id: 6,
			employeeId: "EMP-1006",
			firstname: "Ethan",
			lastname: "Mendoza",
			sickLeaveBalance: 3,
			vacationLeaveBalance: 5,
			accumulatedLeave: 0,
		},
	],
};
