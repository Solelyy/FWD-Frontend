import { AttendanceStatus } from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType";
import { AccountInfo } from "@/features/account-management/types/account"

export type CoworkerAttendance = {
    employeeId: AccountInfo["employeeId"];
    firstname: AccountInfo["firstname"];
    lastname: AccountInfo["lastname"];
    timeIn: {
        timeStamp: string;
        location: string
    };
    timeOut:{
        timeStamp: string;
        location: string
    }
    status: AttendanceStatus
}

export type CoworkersAttendanceReponse = {
    records: CoworkerAttendance[];
}