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
    // For 5 or fewer pages, show all (no shifting possible)
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1).map((page) =>
        addPageButton({ page, activeClass: currentPage === page }),
      );
    }

    // Always exactly 5 slots: [1] [2|...] [mid] [n-1|...] [n]
    const buttons: React.ReactNode[] = [];

    if (currentPage <= 3) {
      // Near start: [1] [2] [3] [...] [last]
      buttons.push(addPageButton({ page: 1, activeClass: currentPage === 1 }));
      buttons.push(addPageButton({ page: 2, activeClass: currentPage === 2 }));
      buttons.push(addPageButton({ page: 3, activeClass: currentPage === 3 }));
      buttons.push(
        <Button size="icon" variant="outline" key="dots-r" disabled>
          ...
        </Button>,
      );
      buttons.push(addPageButton({ page: totalPages, activeClass: false }));
    } else if (currentPage >= totalPages - 2) {
      // Near end: [1] [...] [n-2] [n-1] [n]
      buttons.push(addPageButton({ page: 1, activeClass: false }));
      buttons.push(
        <Button size="icon" variant="outline" key="dots-l" disabled>
          ...
        </Button>,
      );
      buttons.push(addPageButton({ page: totalPages - 2, activeClass: currentPage === totalPages - 2 }));
      buttons.push(addPageButton({ page: totalPages - 1, activeClass: currentPage === totalPages - 1 }));
      buttons.push(addPageButton({ page: totalPages, activeClass: currentPage === totalPages }));
    } else {
      // Middle: [1] [...] [current] [...] [last]
      buttons.push(addPageButton({ page: 1, activeClass: false }));
      buttons.push(
        <Button size="icon" variant="outline" key="dots-l" disabled>
          ...
        </Button>,
      );
      buttons.push(addPageButton({ page: currentPage, activeClass: true }));
      buttons.push(
        <Button size="icon" variant="outline" key="dots-r" disabled>
          ...
        </Button>,
      );
      buttons.push(addPageButton({ page: totalPages, activeClass: false }));
    }

    return buttons;
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
