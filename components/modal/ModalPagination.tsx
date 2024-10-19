"use client"

import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faAnglesLeft, faAnglesRight} from "@fortawesome/free-solid-svg-icons"

interface ModalPaginationProps {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  totalPages: number;
}

const ModalPagination: React.FC<ModalPaginationProps> = ({currentPage, setCurrentPage, totalPages}) => {


  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }


  const pageNumbers = []
  const ellipsis = <span className="px-2">...</span>

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) {
        pageNumbers.push(i)
      }
      pageNumbers.push(null) // ellipsis
      pageNumbers.push(totalPages)
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1)
      pageNumbers.push(null) // ellipsis
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(1)
      pageNumbers.push(null) // ellipsis
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i)
      }
      pageNumbers.push(null) // ellipsis
      pageNumbers.push(totalPages)
    }
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded bg-white px-3 py-1 text-blue-500 hover:bg-blue-100 disabled:opacity-50"
      >
        <FontAwesomeIcon icon={faAnglesLeft}/>
      </button>
      {pageNumbers.map((number, index) =>
        number === null ? (
          ellipsis
        ) : (
          <button
            key={index}
            onClick={() => handlePageChange(number)}
            className={`px-3 py-1 rounded ${
              currentPage === number
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 hover:bg-blue-100"
            }`}
          >
            {number}
          </button>
        )
      )}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded bg-white px-3 py-1 text-blue-500 hover:bg-blue-100 disabled:opacity-50"
      >
        <FontAwesomeIcon icon={faAnglesRight}/>
      </button>
    </div>
  )
}

export default ModalPagination