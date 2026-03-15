export type AccountInfo = {
    employeeId: string
    firstname: string
    lastname: string
    email: string
    status: "ACTIVE" | "INACTIVE" | "PENDING" | "EXPIRED" | "SUSPENDED"
    invitationDate: string
}
