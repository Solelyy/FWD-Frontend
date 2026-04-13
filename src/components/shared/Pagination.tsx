import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"

type PaginationProps = {
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}
export function PaginationSimple({page, total, limit, onPageChange}: PaginationProps) {
  const safeTotal = total ?? 0;
  const totalPages = Math.ceil(safeTotal / limit);

  if (totalPages <= 1) return null;

  const isNextDisabled = page >= totalPages;
  const isPrevDisabled = page <= 1;
  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationLink 
          href="#" isActive 
          aria-disabled={isPrevDisabled}
          className={isPrevDisabled ? "pointer-events-none opacity-50" : ""}
          onClick={(e)=> {
            e.preventDefault();
            if (!isPrevDisabled) {
                onPageChange(page - 1);
              }
          }}>
            {" < "}
          </PaginationLink>
        </PaginationItem>

        {/* Page numbers */}
        {Array.from({length: totalPages }, (_,i) => {
          const pageNumber = i +1
          
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink href="#"
              isActive= {page === pageNumber}
              onClick={(e)=> {
                e.preventDefault();
                onPageChange(pageNumber);
              }}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        {/* Next */}
        <PaginationItem>
          <PaginationLink href="#"
          aria-disabled={isNextDisabled}
          className={`border rounded-lg px-3 py-1 ${isNextDisabled ? "pointer-events-none opacity-50" : ""}`}
          onClick={(e)=> {
            e.preventDefault();
            if (!isNextDisabled) {
                onPageChange(page + 1);
              }
          }}
          >
            {" > "}
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}