import React, { useState, useEffect } from "react";
import classNames from "classnames";
import {
  ArrowLeft,
  ArrowRight,
  Edit2,
  Filter,
  Plus,
  Trash2,
  TrashIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../@/componentsui/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../@/componentsui/ui/tooltip";

interface ColumnConfig {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

interface FilterConfig {
  key: string;
  label: string;
  options: string[];
}

interface ViewOptionConfig {
  key: string;
  label: string;
  value: string;
}

interface DeployableTableProps {
  data: any[];
  columnsConfig: ColumnConfig[];
  filters: FilterConfig[];
  viewOptions: ViewOptionConfig[];
  onFilterChange: (filter: string) => void;
  onViewChange: (view: string) => void;
  onAddNew: () => void;
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  limitPerPage?: number; // Customizable limit per page
  showActions?: boolean; // Optional prop to show/hide actions column
  tableHeight?: string; // Prop to control table height
  tableWidth?: string; // Prop to control table width
  containerHeight?: string; // Prop to control container height
  containerWidth?: string; // Prop to control container width
  tableTitle?: string; // Prop to set table title
  tooltipContent?: string; // Prop to set tooltip content
  onAddNewAction?: () => void; // New prop to set different actions for the button
}

const DeployableTable: React.FC<DeployableTableProps> = ({
  data,
  columnsConfig,
  filters,
  viewOptions,
  onFilterChange,
  onViewChange,
  onAddNew,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
  limitPerPage = 15, // Default limit per page
  showActions = true, // Default to show actions column
  tableHeight = "24rem", // Default table height
  tableWidth = "100%", // Default table width
  containerWidth = "100%", // Default container width
  containerHeight = "auto", // Default container height
  tableTitle = "Table Title",
  tooltipContent = "Ajouter un élément", // Default tooltip content
  onAddNewAction = onAddNew, // Default action for the button
}) => {
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedView, setSelectedView] = useState<string | null>(null);

  useEffect(() => {
    const startIndex = (currentPage - 1) * limitPerPage;
    const paginatedData = data.slice(startIndex, startIndex + limitPerPage);
    setDisplayData(paginatedData);
  }, [data, currentPage, limitPerPage]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = event.target.value;
    setSelectedFilter(newFilter);
    onFilterChange(newFilter);
  };

  const handleViewChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newView = event.target.value;
    setSelectedView(newView);
    onViewChange(newView);
  };

  return (
    <div
      className={`rounded-lg shadow-lg bg-neutral-400 p-4  ${containerHeight} ${containerWidth}`}
    >
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-4">
        <div className="bg-neutral-50 rounded-lg ">
          <h2 className="text-3xl font-bold px-4 py-2 ">{tableTitle}</h2>
        </div>
        <div className="flex space-x-2">
          <Select
            onValueChange={handleFilterChange}
            value={selectedFilter || ""}
          >
            <SelectTrigger className="w-[180px] bg-neutral-50">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-neutral-700" />{" "}
                {selectedFilter ? (
                  <SelectValue />
                ) : (
                  <span className="text-neutral-400">Filtrer Par...</span>
                )}
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filtres</SelectLabel>
                {filters.map((filter) => (
                  <SelectItem key={filter.key} value={filter.key}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={handleViewChange} value={selectedView || ""}>
            <SelectTrigger className="w-[180px] bg-neutral-50 ">
              <SelectValue placeholder="Select a view" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>View Options</SelectLabel>
                {viewOptions.map((view) => (
                  <SelectItem key={view.key} value={view.value}>
                    {view.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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

      {/* Table Container for Scrollable Table */}
      <div
        className={`overflow-auto ${tableHeight} ${tableWidth} border-2 border-neutral-600 rounded-md`}
      >
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              {columnsConfig.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-2 text-left bg-neutral-500 sticky top-0"
                >
                  {column.label}
                </th>
              ))}
              {showActions && (
                <th className="px-4 py-2 bg-neutral-500 sticky top-0">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={
                  rowIndex % 2 === 0 ? "bg-neutral-300" : "bg-neutral-300"
                }
              >
                {columnsConfig.map((column) => (
                  <td key={column.key} className="px-4 py-2">
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
                {showActions && (
                  <td className="px-4 py-2 flex space-x-2">
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
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
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
                : "bg-indigo-600 shadow-lg hover:scale-105 text-white",
              "active:scale-95",
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
