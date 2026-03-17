import { useQuery } from "@tanstack/react-query"
import { getAccounts } from "@/features/account-management/api/usersApi"
import { UserRole } from "@/lib/types/roles"

//custom hook for fetching data
export function useAccounts(role: UserRole.ADMIN | UserRole.EMPLOYEE) {
  
  /*this is to test ui only for me not to run the backend everytime
  if (process.env.NODE_ENV === "development") {
    return {
      data: [
        {
          employeeId: "FWD123",
          firstname: "Jessa",
          lastname: "Gozun",
          email: "jessaaaan@gmail.com",
          status: "ACTIVE",
          invitationDate: "-"
        }
      ],
      isLoading : false,
      error:null
    }
  } */

  //useQuery is a hook from react query that fetches the data 
  //and automatically handling: caching, loading state, error, and refetching. 
  //ex: const { data, isLoading, error } = useQuery(...) 
  return useQuery({
    queryKey: ["accounts", role], //unique idefifier for cached data; describes what data the query represents
    queryFn: () => getAccounts(role),    //function that fetches the data
  })
}