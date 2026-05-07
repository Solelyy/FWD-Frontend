import { CoworkersAttendanceReponse } from "../types/coworkers";
import { AttendanceStatus } from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType";
export const mockCoworkers: CoworkersAttendanceReponse= {
    records: [
        {
            employeeId: "EMP01",
            firstname: "Jessa",
            lastname: "Gozun",
            timeIn: {
                timeStamp: "2026-04-20T08:30:00.000Z",
                location: "Quezon City HFKHAKFHLAHFHAFKLkna,n,naklsfjklanscalhfskashkfksn"
            },
            timeOut:{
                timeStamp: "2026-04-20T08:30:00.000Z",
                location: "New York"
            },
            status: AttendanceStatus.IN_PROGRESS
        },
        {
            employeeId: "EMP02",
            firstname: "Chesca",
            lastname: "Bughaw",
            timeIn: {
                timeStamp: "",
                location: ""
            },
            timeOut:{
                timeStamp: "",
                location: ""
            },
            status: AttendanceStatus.NO_RECORD
        },
        {
            employeeId: "EMP03",
            firstname: "Dinavel",
            lastname: "Binongo",
            timeIn: {
                timeStamp: "",
                location: ""
            },
            timeOut:{
                timeStamp: "",
                location: ""
            },
            status: AttendanceStatus.SUSPENDED
        },
        {
            employeeId: "EMP04",
            firstname: "Angela",
            lastname: "Alcantra",
            timeIn: {
                timeStamp: "",
                location: ""
            },
            timeOut:{
                timeStamp: "",
                location: ""
            },
            status: AttendanceStatus.ON_LEAVE
        },
        {
            employeeId: "EMP05",
            firstname: "Joseph",
            lastname: "Manlapaz",
            timeIn: {
                timeStamp: "2026-04-20T08:30:00.000Z",
                location: "Taguig"
            },
            timeOut:{
                timeStamp: "",
                location: ""
            },
            status: AttendanceStatus.MISSING_TIMEOUT
        },
        {
            employeeId: "EMP06",
            firstname: "Pol",
            lastname: "Celeste",
            timeIn: {
                timeStamp: "2026-04-20T08:30:00.000Z",
                location: "Parañaque"
            },
            timeOut:{
                timeStamp: "2026-04-20T08:30:00.000Z",
                location: "Parañaque"
            },
            status: AttendanceStatus.COMPLETED
        },
    ]
}