import React, { useState, useEffect, useMemo } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Edit2,
  Trash2,
  Plus,
  Search,
} from "lucide-react";
import CustomAutoComplete from "./CustomAutoComplete"; // Import CustomAutoComplete
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../@/componentsui/ui/tooltip";
import { Skeleton } from "../../@/componentsui/ui/skeleton";
import { Input } from "../../@/componentsui/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from "../../@/componentsui/ui/table";
import classNames from "classnames";

interface ColumnConfig {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
  width?: string;
}

interface DeployableTableProps {
  data: any[];
  columnsConfig: ColumnConfig[];
  filters: { key: string; label: string }[]; // Now used for autocomplete filtering
  viewOptions: { key: string; label: string; value: string }[];
  onFilterChange: (filter: string) => void;
  onViewChange: (view: string) => void;
  onAddNew: () => void;
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  limitPerPage?: number;
  showActions?: boolean;
  tableHeight?: string;
  tableWidth?: string;
  containerHeight?: string;
  containerWidth?: string;
  tableTitle?: string;
  tooltipContent?: string;
  loading?: boolean;
  tableCaption?: string;
}

const DeployableTable: React.FC<DeployableTableProps> = ({
  data,
  columnsConfig,
  filters, // Accept filters prop for autocomplete
  viewOptions,
  onFilterChange,
  onViewChange,
  onAddNew,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
  limitPerPage = 15,
  showActions = true,
  tableHeight = "24rem",
  tableWidth = "100%",
  containerWidth = "100%",
  containerHeight = "auto",
  tableTitle = "Table Title",
  tooltipContent = "Ajouter un élément",
  loading = false,
  tableCaption,
}) => {
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>(""); // Track the selected filter value
  const [searchTerm, setSearchTerm] = useState<string>(""); // For search functionality
  const [sortColumn, setSortColumn] = useState<string>(""); // For sorting functionality
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc"); // Track the sort direction

  // Sorting logic
  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  // Memoized data filtering and sorting
  const filteredAndSortedData = useMemo(() => {
    let filteredData = data;

    // Filter based on CustomAutoComplete selection
    if (selectedFilter && selectedFilter !== "All") {
      filteredData = data.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(selectedFilter.toLowerCase()),
        ),
      );
    }

    // Filter by search term
    if (searchTerm) {
      filteredData = filteredData.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    }

    if (sortColumn) {
      filteredData = filteredData.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        }

        return 0;
      });
    }

    return filteredData;
  }, [data, selectedFilter, searchTerm, sortColumn, sortDirection]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * limitPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + limitPerPage);
  }, [filteredAndSortedData, currentPage, limitPerPage]);

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    onFilterChange(value);
  };

  return (
    <div
      className={`rounded-lg shadow-lg bg-neutral-400 p-4 ${containerHeight} ${containerWidth}`}
    >
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-4">
        <div className="bg-neutral-50 rounded-lg">
          <h2 className="text-3xl font-bold px-4 py-2">{tableTitle}</h2>
        </div>
        <div className="flex space-x-2">
          {/* Custom AutoComplete for filtering */}
          <CustomAutoComplete
            items={filters}
            onFilterChange={handleFilterChange} // Pass filter change handler
            size="large" // Make the component and popover bigger
            showViewMore={false} // Remove View More button
          />
          {/* Search Input */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-md bg-muted text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <button
                onClick={onAddNew}
                className="bg-neutral-50 text-black px-2 py-2 rounded-full"
              >
                <Plus className="bg-white" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{tooltipContent}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Table Container */}
      <div
        className={`overflow-auto ${tableHeight} border-2 border-neutral-600 rounded-md`}
        style={{ width: tableWidth }}
      >
        <Table
          className="bg-gray-50"
          style={{ tableLayout: "fixed", width: "100%" }}
        >
          <TableCaption>{tableCaption}</TableCaption>
          <TableHeader className="bg-gray-800 ">
            <TableRow className="hover:bg-gray-800">
              {columnsConfig.map((column) => (
                <TableHead
                  key={column.key}
                  className="cursor-pointer "
                  onClick={() => handleSort(column.key)}
                  style={{ width: column.width }}
                >
                  {column.label}
                  {sortColumn === column.key && (
                    <span className="ml-2">
                      {sortDirection === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </TableHead>
              ))}
              {showActions && (
                <TableHead className="w-[150px]">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: limitPerPage }).map((_, index) => (
                  <TableRow key={index}>
                    {columnsConfig.map((column, colIndex) => (
                      <TableCell key={colIndex}>
                        <Skeleton className="w-full h-10" />
                      </TableCell>
                    ))}
                    {showActions && (
                      <TableCell>
                        <Skeleton className="w-full h-10" />
                      </TableCell>
                    )}
                  </TableRow>
                ))
              : paginatedData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columnsConfig.map((column) => (
                      <TableCell
                        key={column.key}
                        style={{ width: column.width }}
                      >
                        {column.render
                          ? column.render(row[column.key], row)
                          : row[column.key]}
                      </TableCell>
                    ))}
                    {showActions && (
                      <TableCell className="flex space-x-2">
                        <button
                          onClick={() => onEdit(row)}
                          className="bg-indigo-500 text-white px-2 py-1 rounded"
                        >
                          <Edit2 />
                        </button>
                        <button
                          onClick={() => onDelete(row)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          <Trash2 />
                        </button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className={classNames(
              "px-2 py-2 rounded-full transition-transform duration-150 ease-in-out",
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 hover:scale-105 text-white",
            )}
          >
            <ArrowLeft />
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className={classNames(
              "px-2 py-2 rounded-full transition-transform duration-150 ease-in-out",
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 hover:scale-105 text-white",
            )}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeployableTable;
