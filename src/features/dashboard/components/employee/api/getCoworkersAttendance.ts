import { API_BASE_URL } from "@/lib/util/api";
import { CoworkersAttendanceReponse } from "../types/coworkers";
import { mockCoworkers } from "../mock-data/coworkers";

type Props = {
    day: number,
    month: number,
    year: number
}

export async function getCoworkersAttendance({day, month, year} : Props): Promise<CoworkersAttendanceReponse> {
    return mockCoworkers;
}

/*
export async function getCoworkersAttendance({day, month, year}: Props): Promise<CoworkersAttendanceReponse>{
    const endpoint= `${day}${month+1}${year}`;

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        credentials: 'include'
    });

    const result = await response.json();
    console.log("Coworkers Attendance: ", result ?? []);

    if (!response.ok) {
        throw new Error ("Unable to fetch coworker attendance.");
    }

    return result;
}*/