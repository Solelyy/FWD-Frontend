import { EmployeesCARequestsResponse } from "../types/cash-advance";
import { CashAdvanceRequestStatus } from "@/app/(protected)/employee/cash-advance/types/cash-advance";

// Mock dataset scope: April 2026
export const mockEmployeesCARequests: EmployeesCARequestsResponse["requests"] = [
    {
        id: 1,
        employeeId: "EMP-1001",
        firstname: "John",
        lastname: "Dela Cruz",
        dateSubmitted: "2026-04-10T09:15:00.000Z",
        requestedAmount: 5000,
        approvedAmount: 0,
        status: CashAdvanceRequestStatus.PENDING
    },
    {
        id: 2,
        employeeId: "EMP-1002",
        firstname: "Maria",
        lastname: "Santos",
        dateSubmitted: "2026-04-08T13:45:00.000Z",
        requestedAmount: 8000,
        approvedAmount: 8000,
        status: CashAdvanceRequestStatus.APPROVED
    },
    {
        id: 3,
        employeeId: "EMP-1003",
        firstname: "Paolo",
        lastname: "Reyes",
        dateSubmitted: "2026-04-06T11:30:00.000Z",
        requestedAmount: 3000,
        approvedAmount: 0,
        status: CashAdvanceRequestStatus.REJECTED
    },
    {
        id: 4,
        employeeId: "EMP-1004",
        firstname: "Angela",
        lastname: "Lim",
        dateSubmitted: "2026-04-05T10:10:00.000Z",
        requestedAmount: 4500,
        approvedAmount: 4500,
        status: CashAdvanceRequestStatus.APPROVED
    },
    {
        id: 5,
        employeeId: "EMP-1005",
        firstname: "Ramon",
        lastname: "Torres",
        dateSubmitted: "2026-04-04T15:05:00.000Z",
        requestedAmount: 7000,
        approvedAmount: 0,
        status: CashAdvanceRequestStatus.PENDING
    },
    {
        id: 6,
        employeeId: "EMP-1006",
        firstname: "Liza",
        lastname: "Garcia",
        dateSubmitted: "2026-04-03T08:40:00.000Z",
        requestedAmount: 6000,
        approvedAmount: 0,
        status: CashAdvanceRequestStatus.REJECTED
    },
    {
        id: 7,
        employeeId: "EMP-1007",
        firstname: "Mark",
        lastname: "Villanueva",
        dateSubmitted: "2026-04-02T09:55:00.000Z",
        requestedAmount: 3500,
        approvedAmount: 3500,
        status: CashAdvanceRequestStatus.APPROVED
    },
    {
        id: 8,
        employeeId: "EMP-1008",
        firstname: "Carla",
        lastname: "Mendoza",
        dateSubmitted: "2026-04-01T14:20:00.000Z",
        requestedAmount: 9000,
        approvedAmount: 0,
        status: CashAdvanceRequestStatus.PENDING
    },
    {
        id: 9,
        employeeId: "EMP-1009",
        firstname: "Noel",
        lastname: "Castillo",
        dateSubmitted: "2026-04-16T16:10:00.000Z",
        requestedAmount: 2500,
        approvedAmount: 0,
        status: CashAdvanceRequestStatus.REJECTED
    },
    {
        id: 10,
        employeeId: "EMP-1010",
        firstname: "Jessa",
        lastname: "Flores",
        dateSubmitted: "2026-04-15T12:35:00.000Z",
        requestedAmount: 10000,
        approvedAmount: 9000,
        status: CashAdvanceRequestStatus.APPROVED
    },
    {
        id: 11,
        employeeId: "EMP-1011",
        firstname: "Bryan",
        lastname: "Navarro",
        dateSubmitted: "2026-04-14T11:25:00.000Z",
        requestedAmount: 4200,
        approvedAmount: 0,
        status: CashAdvanceRequestStatus.PENDING
    },
    {
        id: 12,
        employeeId: "EMP-1012",
        firstname: "Dianne",
        lastname: "Aquino",
        dateSubmitted: "2026-04-13T09:05:00.000Z",
        requestedAmount: 5200,
        approvedAmount: 5200,
        status: CashAdvanceRequestStatus.APPROVED
    },
    {
        id: 13,
        employeeId: "EMP-1013",
        firstname: "Kevin",
        lastname: "Salazar",
        dateSubmitted: "2026-04-12T10:45:00.000Z",
        requestedAmount: 3800,
        approvedAmount: 0,
        status: CashAdvanceRequestStatus.REJECTED
    },
    {
        id: 14,
        employeeId: "EMP-1014",
        firstname: "Patricia",
        lastname: "Lopez",
        dateSubmitted: "2026-04-11T13:20:00.000Z",
        requestedAmount: 6700,
        approvedAmount: 0,
        status: CashAdvanceRequestStatus.PENDING
    },
    {
        id: 15,
        employeeId: "EMP-1015",
        firstname: "Arvin",
        lastname: "Cruz",
        dateSubmitted: "2026-04-09T08:15:00.000Z",
        requestedAmount: 5400,
        approvedAmount: 5400,
        status: CashAdvanceRequestStatus.APPROVED
    }
];
