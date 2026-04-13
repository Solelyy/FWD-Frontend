export enum AttendanceType {
    TIME_IN = "TIME_IN",
    TIME_OUT = "TIME_OUT"
}

export enum AttendanceStatus {
    NONE = "NONE",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    ON_LEAVE="ON_LEAVE",
    SUSPENDED="SUSPENDED"
}

export type AttendanceStatusResponse = {
status: AttendanceStatus
canTimeIn: boolean;
isLate: boolean;
isUndertime: boolean;
timeIn: string | null; // ISO string (UTC)
timeOut: string | null; // ISO string (UTC)
timeInLocation: string | null;
timeOutLocation: string | null;
timeInImage: string | null;
timeOutImage: string | null;
totalHours: number | null; // computed if time_out exists
overtimePending?: boolean; // optional
};


