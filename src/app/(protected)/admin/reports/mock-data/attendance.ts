import { EmployeeAttendances } from "../types/attendance";

// Mock dataset scope: April 2026
export const mockEmployeeAttendances: EmployeeAttendances = {
	records: [
		{ employeeId: "EMP-1012", firstname: "Dianne", lastname: "Aquino", presentDays: 15, absentDays: 0, late: 1, undertime: 0, overtimeHours: 5, totalWorkingHours: 120, totalPayableHours: 120 },
		{ employeeId: "EMP-1009", firstname: "Noel", lastname: "Castillo", presentDays: 14, absentDays: 1, late: 1, undertime: 0, overtimeHours: 6, totalWorkingHours: 112, totalPayableHours: 112 },
		{ employeeId: "EMP-1015", firstname: "Arvin", lastname: "Cruz", presentDays: 15, absentDays: 0, late: 0, undertime: 0, overtimeHours: 7, totalWorkingHours: 120, totalPayableHours: 120 },
		{ employeeId: "EMP-1001", firstname: "John", lastname: "Dela Cruz", presentDays: 14, absentDays: 1, late: 1, undertime: 0, overtimeHours: 6, totalWorkingHours: 112, totalPayableHours: 112 },
		{ employeeId: "EMP-1018", firstname: "Alyssa", lastname: "Domingo", presentDays: 13, absentDays: 2, late: 2, undertime: 1, overtimeHours: 2, totalWorkingHours: 104, totalPayableHours: 104 },
		{ employeeId: "EMP-1010", firstname: "Jessa", lastname: "Flores", presentDays: 15, absentDays: 0, late: 0, undertime: 0, overtimeHours: 9, totalWorkingHours: 120, totalPayableHours: 120 },
		{ employeeId: "EMP-1006", firstname: "Liza", lastname: "Garcia", presentDays: 14, absentDays: 1, late: 1, undertime: 1, overtimeHours: 5, totalWorkingHours: 112, totalPayableHours: 112 },
		{ employeeId: "EMP-1004", firstname: "Angela", lastname: "Lim", presentDays: 15, absentDays: 0, late: 0, undertime: 0, overtimeHours: 8, totalWorkingHours: 120, totalPayableHours: 120 },
		{ employeeId: "EMP-1014", firstname: "Patricia", lastname: "Lopez", presentDays: 14, absentDays: 1, late: 1, undertime: 1, overtimeHours: 4, totalWorkingHours: 112, totalPayableHours: 112 },
		{ employeeId: "EMP-1008", firstname: "Carla", lastname: "Mendoza", presentDays: 13, absentDays: 2, late: 2, undertime: 1, overtimeHours: 4, totalWorkingHours: 104, totalPayableHours: 104 },
		{ employeeId: "EMP-1011", firstname: "Bryan", lastname: "Navarro", presentDays: 12, absentDays: 3, late: 2, undertime: 2, overtimeHours: 1, totalWorkingHours: 96, totalPayableHours: 96 },
		{ employeeId: "EMP-1016", firstname: "Nina", lastname: "Ramos", presentDays: 15, absentDays: 0, late: 1, undertime: 0, overtimeHours: 6, totalWorkingHours: 120, totalPayableHours: 120 },
		{ employeeId: "EMP-1003", firstname: "Paolo", lastname: "Reyes", presentDays: 13, absentDays: 2, late: 2, undertime: 1, overtimeHours: 3, totalWorkingHours: 104, totalPayableHours: 104 },
		{ employeeId: "EMP-1013", firstname: "Kevin", lastname: "Salazar", presentDays: 13, absentDays: 2, late: 2, undertime: 1, overtimeHours: 3, totalWorkingHours: 104, totalPayableHours: 104 },
		{ employeeId: "EMP-1002", firstname: "Maria", lastname: "Santos", presentDays: 15, absentDays: 0, late: 0, undertime: 1, overtimeHours: 4, totalWorkingHours: 120, totalPayableHours: 120 },
		{ employeeId: "EMP-1017", firstname: "Cedric", lastname: "Tan", presentDays: 14, absentDays: 1, late: 1, undertime: 1, overtimeHours: 3, totalWorkingHours: 112, totalPayableHours: 112 },
		{ employeeId: "EMP-1005", firstname: "Ramon", lastname: "Torres", presentDays: 12, absentDays: 3, late: 3, undertime: 2, overtimeHours: 2, totalWorkingHours: 96, totalPayableHours: 96 },
		{ employeeId: "EMP-1019", firstname: "Gerald", lastname: "Uy", presentDays: 15, absentDays: 0, late: 0, undertime: 0, overtimeHours: 8, totalWorkingHours: 120, totalPayableHours: 120 },
		{ employeeId: "EMP-1020", firstname: "Trisha", lastname: "Velasco", presentDays: 14, absentDays: 1, late: 1, undertime: 0, overtimeHours: 5, totalWorkingHours: 112, totalPayableHours: 112 },
		{ employeeId: "EMP-1007", firstname: "Mark", lastname: "Villanueva", presentDays: 15, absentDays: 0, late: 0, undertime: 0, overtimeHours: 7, totalWorkingHours: 120, totalPayableHours: 120 },
	],
	meta: {
		page: 1,
		limit: 20,
		total: 20,
	},
};
