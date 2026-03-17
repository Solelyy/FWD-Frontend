export enum Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    PENDING = "PENDING",
    EXPIRED = "EXPIRED",
    SUSPENDED = "SUSPENDED",
    REMOVED = "REMOVED"
}

export type AccountInfo = {
    employeeId: string
    firstname: string
    lastname: string
    email: string
    status: Status
    invitationDate: string
}
