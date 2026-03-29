import { useMemo } from "react";
import { AccountInfo } from "@/features/account-management/types/account";
import { fullName } from "@/lib/util/name-format";

export function useFilteredAccounts(accounts: AccountInfo[], search: string) {
    return useMemo(() => {
        if (!search) return accounts;

        const term = search.toLowerCase();

        return accounts.filter((account) => {
            return (
                account.employeeId.toLowerCase().includes(term) ||
                fullName(account.firstname, account.lastname)
                    .toLowerCase()
                    .includes(term)
            );
        });
    }, [accounts, search]);
}