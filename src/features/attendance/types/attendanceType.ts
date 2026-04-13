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

//for employee dashboard
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
overtimePending?: boolean; // optional
};

//for attendance logs
export type AttendanceLog = {
  id: string;
  date: string;
  timeIn: {
    timestamp: string | null; 
  };
  timeOut: {
    timestamp: string | null;
  };
  status: AttendanceStatus
  totalHours: number | null; 
};

export type AttendanceLogsResponse = {
  logs: AttendanceLog[];

  meta: {
    page: number;
    limit: number;
    total: number;
  };
};