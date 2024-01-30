import React from "react";

interface PaginationProps {
  nPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ nPages, currentPage, setCurrentPage }) => {
  // const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
 // Pagination Component
    return (
        <nav className="w-full px-4 py-4 rounded-b-lg mt-4 ml-96">
        <ul className="pagination flex items-center justify-center text-slate-800">
            <li className="page-item flex">
            {currentPage > 1 && (
                <a
                className="page-link text-link-color"
                onClick={goToPrevPage}
                href="#"
                >
                Previous
                </a>
            )}
            </li>
            <li className="min-w-fit flex justify-center">
            Page {currentPage} of {nPages}
            </li>
            <li className="page-item flex">
            {currentPage < nPages && (
                <a
                className="page-link text-link-color"
                onClick={goToNextPage}
                href="#"
                >
                Next
                </a>
            )}
            </li>
        </ul>
        <p className="page-info"></p>
        </nav>
    );
  
  
};

export default Pagination;