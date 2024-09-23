import React, { useRef, useState } from "react";
import { PlusCircle, Check } from "lucide-react";
import { Skeleton } from "../../../../../@/components/ui/skeleton";
import FormLabel from "../../components/ui/FormLabel";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverContentWithoutPortal,
} from "../../../../../@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "../../../../../@/components/ui/command";
import CustomButton from "./CustomButton";
import CustomAutoCompleteButton from "./CustomAutoCompleteButton"; // Created a separate button component

interface CommandItemProps {
  name: string;
  value: string;
  key?: string;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

interface CommandGroupProps {
  props: {
    heading: string;
  };
  [key: string]: any;
}

interface ItemsProps {
  [key: number]: {
    commandGroup: CommandGroupProps;
  };
}

interface CustomAutocompleteProps {
  label: string;
  simple?: boolean;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
  items: ItemsProps;
  displayItems?: number;
  showViewMore?: boolean; // New prop to show/hide the View More button
  size?: "small" | "medium" | "large"; // New prop for controlling size
  onFilterChange: (value: string | string[]) => void; // Callback function to pass selected values to parent
}

const CustomAutoComplete = ({
  label,
  simple = true,
  disabled = false,
  loading = false,
  error = "",
  items,
  displayItems = 50,
  showViewMore = false, // Disabling View More button
  size = "large", // Set size to large by default
  onFilterChange,
}: CustomAutocompleteProps) => {
  const [open, setOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const [filterBool, setFilterBool] = useState(false);
  const [values, setValues] = useState<string>("");
  const [selectedValues, setSelectedValues] = useState<string | string[]>("");

  const handleSelectValue = (selectedValue: string) => {
    if (selectedValue === "All") {
      setSelectedValues(""); // Clear selection
      onFilterChange(""); // Notify parent to show all data
    } else {
      if (simple) {
        setSelectedValues(selectedValue);
        setOpen(false);
        onFilterChange(selectedValue);
      } else {
        const updatedValues = Array.isArray(selectedValues)
          ? selectedValues.includes(selectedValue)
            ? selectedValues.filter((v) => v !== selectedValue)
            : [...selectedValues, selectedValue]
          : [selectedValue];
        setSelectedValues(updatedValues);
        onFilterChange(updatedValues);
      }
    }
  };

  // Apply size-specific styles to the popover
  const popoverSizeClass = {
    small: "min-w-[200px]", // Small popover
    medium: "min-w-[300px]", // Medium popover (default)
    large: "min-w-[400px]", // Large popover
  };

  return (
    <div className="w-full" ref={divRef}>
      <FormLabel
        label={label}
        className={error ? "text-red-500" : "text-black"}
      />
      {loading ? (
        <Skeleton className="w-full h-10" />
      ) : (
        <Popover id={label} open={open} onOpenChange={setOpen}>
          <PopoverTrigger className="w-full">
            <CustomAutoCompleteButton
              error={error}
              disabled={disabled}
              simple={simple}
              selectedValues={selectedValues}
              setOpen={setOpen}
              items={items}
              size={size} // Pass size prop
            />
          </PopoverTrigger>

          <PopoverContentWithoutPortal
            className={`p-0 bg-white ${popoverSizeClass[size]}`} // Apply dynamic popover size class
            style={{
              width: `${divRef.current?.offsetWidth}px`,
            }}
          >
            <Command>
              <CommandInput
                className="bg-gray-50 border-none "
                placeholder="Rechercher..."
                onValueChange={(e) => {
                  setFilterBool(e !== "");
                  setValues(e);
                }}
              />
              <CommandList className="scrollsm overflow-x-auto bg-white">
                <CommandEmpty>No data found</CommandEmpty>
                {/* Add the 'All' option to clear the filter */}
                <CommandItem value="All" className="p-0 bg-white">
                  <button
                    type="button"
                    className="w-full flex flex-row px-2 py-1 text-left"
                    onClick={() => handleSelectValue("All")}
                  >
                    <div className="w-6" />
                    <b>Tout Afficher ...</b>
                  </button>
                </CommandItem>
                {Object.keys(items).map((key) => {
                  const { commandGroup } = items[key];
                  if (!commandGroup || !commandGroup.props) return null;

                  return (
                    <CommandGroup key={key} {...commandGroup.props}>
                      {Object.keys(commandGroup)
                        .filter((item) => item !== "props")
                        .map((item) => {
                          const { commandItem } = commandGroup[item];
                          if (!commandItem) return null;
                          return (
                            <CommandItem
                              key={commandItem.key || commandItem.name}
                              value={commandItem.value}
                              className="p-0 bg-white"
                            >
                              <button
                                type="button"
                                className="w-full flex flex-row px-2 py-1 text-left"
                                onClick={() =>
                                  handleSelectValue(commandItem.value)
                                }
                              >
                                {(simple &&
                                  selectedValues === commandItem.value) ||
                                (!simple &&
                                  Array.isArray(selectedValues) &&
                                  selectedValues.includes(
                                    commandItem.value,
                                  )) ? (
                                  <Check className="!h-4 !w-4 mr-2" />
                                ) : (
                                  <div className="w-6" />
                                )}
                                {commandItem.name}
                              </button>
                            </CommandItem>
                          );
                        })}
                    </CommandGroup>
                  );
                })}
              </CommandList>
            </Command>
          </PopoverContentWithoutPortal>
        </Popover>
      )}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default CustomAutoComplete;
