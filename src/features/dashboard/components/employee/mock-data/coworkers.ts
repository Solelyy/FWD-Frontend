import { CoworkersAttendanceReponse } from "../types/coworkers";
import { AttendanceStatus } from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType";
export const mockCoworkers: CoworkersAttendanceReponse= {
    records: [
        {
            employeeId: "EMP01",
            firstname: "Jessa",
            lastname: "Gozun",
            timeIn: {
                timestamp: "2026-04-20T08:30:00.000Z",
                location: "Quezon City HFKHAKFHLAHFHAFKLkna,n,naklsfjklanscalhfskashkfksn"
            },
            timeOut:{
                timestamp: "2026-04-20T08:30:00.000Z",
                location: "New York"
            },
            status: AttendanceStatus.IN_PROGRESS
        },
        {
            employeeId: "EMP02",
            firstname: "Chesca",
            lastname: "Bughaw",
            timeIn: {
                timestamp: "",
                location: ""
            },
            timeOut:{
                timestamp: "",
                location: ""
            },
            status: AttendanceStatus.NO_RECORD
        },
        {
            employeeId: "EMP03",
            firstname: "Dinavel",
            lastname: "Binongo",
            timeIn: {
                timestamp: "",
                location: ""
            },
            timeOut:{
                timestamp: "",
                location: ""
            },
            status: AttendanceStatus.SUSPENDED
        },
        {
            employeeId: "EMP04",
            firstname: "Angela",
            lastname: "Alcantra",
            timeIn: {
                timestamp: "",
                location: ""
            },
            timeOut:{
                timestamp: "",
                location: ""
            },
            status: AttendanceStatus.ON_LEAVE
        },
        {
            employeeId: "EMP05",
            firstname: "Joseph",
            lastname: "Manlapaz",
            timeIn: {
                timestamp: "2026-04-20T08:30:00.000Z",
                location: "Taguig"
            },
            timeOut:{
                timestamp: "",
                location: ""
            },
            status: AttendanceStatus.MISSING_TIMEOUT
        },
        {
            employeeId: "EMP06",
            firstname: "Pol",
            lastname: "Celeste",
            timeIn: {
                timestamp: "2026-04-20T08:30:00.000Z",
                location: "Parañaque"
            },
            timeOut:{
                timestamp: "2026-04-20T08:30:00.000Z",
                location: "Parañaque"
            },
            status: AttendanceStatus.COMPLETED
        },
    ]
}