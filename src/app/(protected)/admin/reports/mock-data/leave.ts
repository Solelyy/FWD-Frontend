import { EmployeesLeaveReports } from "../types/leave";

// Mock dataset scope: April 2026
export const mockEmployeesLeaveReports: EmployeesLeaveReports = {
	records: [
		{ employeeId: "EMP-1012", firstname: "Dianne", lastname: "Aquino", leaveUsed: 0, sickLeaveBalance: 5, vacationLeaveBalance: 8, accumulatedLeave: 2 },
		{ employeeId: "EMP-1009", firstname: "Noel", lastname: "Castillo", leaveUsed: 1, sickLeaveBalance: 4, vacationLeaveBalance: 7, accumulatedLeave: 2 },
		{ employeeId: "EMP-1015", firstname: "Arvin", lastname: "Cruz", leaveUsed: 0, sickLeaveBalance: 5, vacationLeaveBalance: 8, accumulatedLeave: 3 },
		{ employeeId: "EMP-1001", firstname: "John", lastname: "Dela Cruz", leaveUsed: 1, sickLeaveBalance: 4, vacationLeaveBalance: 7, accumulatedLeave: 2 },
		{ employeeId: "EMP-1018", firstname: "Alyssa", lastname: "Domingo", leaveUsed: 2, sickLeaveBalance: 3, vacationLeaveBalance: 7, accumulatedLeave: 1 },
		{ employeeId: "EMP-1010", firstname: "Jessa", lastname: "Flores", leaveUsed: 0, sickLeaveBalance: 5, vacationLeaveBalance: 8, accumulatedLeave: 3 },
		{ employeeId: "EMP-1006", firstname: "Liza", lastname: "Garcia", leaveUsed: 1, sickLeaveBalance: 4, vacationLeaveBalance: 7, accumulatedLeave: 2 },
		{ employeeId: "EMP-1004", firstname: "Angela", lastname: "Lim", leaveUsed: 0, sickLeaveBalance: 5, vacationLeaveBalance: 8, accumulatedLeave: 3 },
		{ employeeId: "EMP-1014", firstname: "Patricia", lastname: "Lopez", leaveUsed: 1, sickLeaveBalance: 4, vacationLeaveBalance: 7, accumulatedLeave: 2 },
		{ employeeId: "EMP-1008", firstname: "Carla", lastname: "Mendoza", leaveUsed: 2, sickLeaveBalance: 3, vacationLeaveBalance: 7, accumulatedLeave: 2 },
		{ employeeId: "EMP-1011", firstname: "Bryan", lastname: "Navarro", leaveUsed: 3, sickLeaveBalance: 2, vacationLeaveBalance: 6, accumulatedLeave: 1 },
		{ employeeId: "EMP-1016", firstname: "Nina", lastname: "Ramos", leaveUsed: 0, sickLeaveBalance: 5, vacationLeaveBalance: 8, accumulatedLeave: 2 },
		{ employeeId: "EMP-1003", firstname: "Paolo", lastname: "Reyes", leaveUsed: 2, sickLeaveBalance: 3, vacationLeaveBalance: 7, accumulatedLeave: 1 },
		{ employeeId: "EMP-1013", firstname: "Kevin", lastname: "Salazar", leaveUsed: 2, sickLeaveBalance: 3, vacationLeaveBalance: 7, accumulatedLeave: 1 },
		{ employeeId: "EMP-1002", firstname: "Maria", lastname: "Santos", leaveUsed: 0, sickLeaveBalance: 5, vacationLeaveBalance: 8, accumulatedLeave: 2 },
		{ employeeId: "EMP-1017", firstname: "Cedric", lastname: "Tan", leaveUsed: 1, sickLeaveBalance: 4, vacationLeaveBalance: 7, accumulatedLeave: 1 },
		{ employeeId: "EMP-1005", firstname: "Ramon", lastname: "Torres", leaveUsed: 3, sickLeaveBalance: 2, vacationLeaveBalance: 6, accumulatedLeave: 1 },
		{ employeeId: "EMP-1019", firstname: "Gerald", lastname: "Uy", leaveUsed: 0, sickLeaveBalance: 5, vacationLeaveBalance: 8, accumulatedLeave: 3 },
		{ employeeId: "EMP-1020", firstname: "Trisha", lastname: "Velasco", leaveUsed: 1, sickLeaveBalance: 4, vacationLeaveBalance: 7, accumulatedLeave: 2 },
		{ employeeId: "EMP-1007", firstname: "Mark", lastname: "Villanueva", leaveUsed: 0, sickLeaveBalance: 5, vacationLeaveBalance: 8, accumulatedLeave: 3 },
	],
	meta: {
		page: 1,
		limit: 20,
		total: 20,
	},
};
