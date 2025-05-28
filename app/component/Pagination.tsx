"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { ChevronLeft, ChevronRight } from "lucide-react"; // icons

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  const delta = 2;
  const range = [];
  const rangeWithDots = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    }
  }

  let lastPage = 0;
  for (const i of range) {
    if (i - lastPage > 1) {
      if (i - lastPage === 2) {
        rangeWithDots.push(lastPage + 1);
      } else {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    lastPage = i;
  }

  return (
    <nav aria-label="Pagination" className="flex justify-center gap-2 mt-8">
      {/* Prev */}
      <Link
        href={`${basePath}?page=${Math.max(1, currentPage - 1)}`}
        replace
        passHref
        aria-disabled={currentPage === 1}
        tabIndex={currentPage === 1 ? -1 : 0}
      >
        <Button variant="outline" disabled={currentPage === 1} className="px-3">
          <ChevronLeft className="w-4 h-4" />
          Prev
        </Button>
      </Link>

      {/* Page Numbers */}
      {rangeWithDots.map((page, index) =>
        page === "..." ? (
          <span
            key={`dots-${index}`}
            className="px-3 py-2 select-none text-muted-foreground"
          >
            ...
          </span>
        ) : (
          <Link key={page} href={`${basePath}?page=${page}`} replace passHref>
            <Button
              variant={currentPage === page ? "default" : "outline"}
              aria-current={currentPage === page ? "page" : undefined}
              className="min-w-[36px] px-2"
            >
              {page}
            </Button>
          </Link>
        )
      )}

      {/* Next */}
      <Link
        href={`${basePath}?page=${Math.min(totalPages, currentPage + 1)}`}
        replace
        passHref
        aria-disabled={currentPage === totalPages}
        tabIndex={currentPage === totalPages ? -1 : 0}
      >
        <Button variant="outline" disabled={currentPage === totalPages} className="px-3">
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </Link>
    </nav>
  );
}
