import "./styles.css";
import { useSearchParams } from "react-router-dom";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { useState } from "react";

interface PaginationProps {
  pages: number;
  items: number;
  page: number;
  itemsPerPage: number; // Nova propriedade para controlar a quantidade de itens exibidos por página
}

export const Pagination = ({ items, page, pages, itemsPerPage }: PaginationProps) => {
  const [, setSearchParams] = useSearchParams();
  const [totalItems, setTotalItems] = useState(itemsPerPage);

  function firsPage() {
    setSearchParams((params) => {
      params.set("page", "1");

      return params;
    });
    setTotalItems(itemsPerPage);
  }

  function previousPage() {
    if (page - 1 <= 0) return;

    setSearchParams((params) => {
      params.set("page", String(page - 1));

      return params;
    });

    if (totalItems > itemsPerPage) setTotalItems(totalItems - itemsPerPage);
  }

  function nextPage() {
    if (page + 1 > pages) return;

    setSearchParams((params) => {
      params.set("page", String(page + 1));

      return params;
    });

    setTotalItems(totalItems + itemsPerPage);
  }

  function lasPage() {
    setSearchParams((params) => {
      params.set("page", String(pages));

      return params;
    });
    setTotalItems(items);
  }

  function goToPage(newPage: number) {
    setSearchParams((params) => {
      params.set("page", String(newPage));
      return params;
    });
  }

  function handleItemsPerPageChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newItemsPerPage = parseInt(event.target.value);
    const newPage = newItemsPerPage / 10
    goToPage(newPage);
    setTotalItems(newItemsPerPage);
  }

  const options = Array.from({ length: 10 }, (_, index) => (index + 1) * 10);
  
  return (
    <div className="containerPagination">
      <div className="paginationItems">
        <span className="colorWhite">
          Showing {totalItems} of {items} items
        </span>
      </div>

      <div className="subContainer">
      <select className="colorWhite select" value={totalItems} onChange={handleItemsPerPageChange}>
          {/* Cria automaticamente as opções para o número de itens por página */}
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <div>
          <button onClick={firsPage} disabled={page - 1 <= 0}>
            <ChevronsLeft size="10" />
          </button>
          <button onClick={previousPage} disabled={page - 1 <= 0}>
            <ChevronLeft size="10" />
          </button>
          <button onClick={nextPage} disabled={page + 1 > pages}>
            <ChevronRight size="10" />
          </button>
          <button onClick={lasPage} disabled={page + 1 > pages}>
            <ChevronsRight size="10" />
          </button>
        </div>
      </div>
    </div>
  );
};
