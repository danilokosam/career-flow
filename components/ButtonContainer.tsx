"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ButtonContainerProps = {
  currentPage: number;
  totalPages: number;
};

type ButtonProps = {
  page: number;
  activeClass: boolean;
};

import { Button } from "./ui/button";

export const ButtonContainer = ({
  currentPage,
  totalPages,
}: ButtonContainerProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (page: number) => {
    const defaultParams = {
      search: searchParams.get("search") || "",
      jobStatus: searchParams.get("jobStatus") || "",
      page: String(page),
    };

    const params = new URLSearchParams(defaultParams);

    router.push(`${pathname}?${params.toString()}`);
  };

  const addPageButton = ({ page, activeClass }: ButtonProps) => {
    return (
      <Button
        key={page}
        size="icon"
        variant={activeClass ? "default" : "outline"}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </Button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons: React.ReactNode[] = [];
    const maxVisible = 3;

    let startPage: number;
    let endPage: number;

    if (totalPages <= maxVisible + 2) {
      // Few pages: show all, no ellipsis needed
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= maxVisible) {
      startPage = 1;
      endPage = maxVisible;
    } else if (currentPage >= totalPages - maxVisible + 1) {
      startPage = totalPages - maxVisible + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }

    // If showing all pages, just render them
    if (totalPages <= maxVisible + 2) {
      for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
          addPageButton({ page: i, activeClass: currentPage === i }),
        );
      }
      return pageButtons;
    }

    // First page
    pageButtons.push(
      addPageButton({ page: 1, activeClass: currentPage === 1 }),
    );

    // Left ellipsis or second page
    if (startPage > 2) {
      pageButtons.push(
        <Button size="icon" variant="outline" key="dots-1" disabled>
          ...
        </Button>,
      );
    } else {
      pageButtons.push(
        addPageButton({ page: 2, activeClass: currentPage === 2 }),
      );
    }

    // Middle page
    const middlePage = currentPage <= maxVisible
      ? 3
      : currentPage >= totalPages - maxVisible + 1
        ? totalPages - 2
        : currentPage;

    pageButtons.push(
      addPageButton({ page: middlePage, activeClass: currentPage === middlePage }),
    );

    // Right ellipsis or second-to-last page
    if (endPage < totalPages - 1) {
      pageButtons.push(
        <Button size="icon" variant="outline" key="dots-2" disabled>
          ...
        </Button>,
      );
    } else {
      pageButtons.push(
        addPageButton({
          page: totalPages - 1,
          activeClass: currentPage === totalPages - 1,
        }),
      );
    }

    // Last page
    pageButtons.push(
      addPageButton({
        page: totalPages,
        activeClass: currentPage === totalPages,
      }),
    );

    return pageButtons;
  };

  return (
    <div className="flex h-10 flex-nowrap items-center justify-center gap-x-1 overflow-hidden sm:gap-x-2">
      {/* prev */}
      <Button
        className="shrink-0 gap-x-1 sm:gap-x-2"
        size="sm"
        variant="outline"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = totalPages;
          handlePageChange(prevPage);
        }}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">prev</span>
      </Button>
      {renderPageButtons()}
      {/* next */}
      <Button
        className="shrink-0 gap-x-1 sm:gap-x-2"
        size="sm"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > totalPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
        variant="outline"
      >
        <span className="hidden sm:inline">next</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
