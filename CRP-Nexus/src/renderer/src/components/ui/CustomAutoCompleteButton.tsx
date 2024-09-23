import React from "react";
import { X, ChevronDown } from "lucide-react";
import { Button } from "../../../../../@/components/ui/button";
import { Label } from "../../../../../@/components/ui/label";

// Type definitions for props
interface CommandItem {
  name: string;
  value: string;
  key?: string;
}

interface CommandGroup {
  props: Record<string, any>;
  [key: string]: any;
}

interface ItemsProps {
  [key: number]: {
    commandGroup: CommandGroup;
  };
}

interface CustomAutoCompleteButtonProps {
  disabled?: boolean;
  simple?: boolean;
  selectedValues: string | string[];
  setOpen: (open: boolean) => void;
  items: ItemsProps;
  error?: string;
  size?: "small" | "medium" | "large"; // Adding size prop
}

const CustomAutoCompleteButton: React.FC<CustomAutoCompleteButtonProps> = ({
  disabled: propsDisabled,
  simple: propsSimple,
  selectedValues: propsSelectedValues,
  setOpen: propsSetOpen,
  items: propsItems,
  error: propsError,
  size = "medium", // Default size is medium
}) => {
  // Function to get the display name based on the selected value(s)
  function GetValue(value: string): string | undefined {
    if (!propsItems || Object.keys(propsItems).length === 0) return undefined;
    return Object.keys(propsItems)
      .map((key) => {
        const { commandGroup } = propsItems[key];
        if (!commandGroup) return null;
        return Object.keys(commandGroup)
          .filter((item) => item !== "props")
          .map((item) => {
            const { commandItem } = commandGroup[item];
            return commandItem;
          });
      })
      .flat()
      .find((item) => item?.value === value)?.name;
  }

  // Size-specific styles
  const sizeClass = {
    small: "h-8 text-sm px-2", // Small button
    medium: "h-10 text-base px-4", // Medium button (default)
    large: "h-12 text-lg px-6", // Large button
  };

  return (
    <Button
      type="button"
      className={`w-full bg-gray-50 justify-between !px-4 py-2 flex gap-3 mb-1 ${
        propsError ? "!border-red-500" : ""
      } ${sizeClass[size]}`} // Add dynamic class for size
      variant="outline"
      disabled={propsDisabled}
      onClick={() => propsSetOpen(true)}
    >
      <div className="flex flex-row gap-1 py-1 overflow-auto scrollxs">
        {propsSimple && (
          <Label className="m-0 text-black cursor-pointer">
            {GetValue(propsSelectedValues as string) || "Rechercher..."}
          </Label>
        )}

        {!propsSimple && Array.isArray(propsSelectedValues) && (
          <>
            {propsSelectedValues.map((item) => (
              <Button
                key={item}
                className="border border-slate-200 h-7 rounded bg-transparent px-2 py-1 hover:!bg-slate-300 cursor-pointer"
                fontSize="text-xs"
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  propsSetOpen(false);
                  propsSelectedValues = propsSelectedValues.filter(
                    (i) => i !== item,
                  );
                }}
              >
                <div className="flex items-center gap-2">
                  <Label className="text-xs m-0 text-black cursor-pointer max-w-[150px] truncate hover:!max-w-full">
                    {GetValue(item)}
                  </Label>
                  <X className="h-4 w-4 text-red-500" />
                </div>
              </Button>
            ))}
            {propsSelectedValues.length === 0 && (
              <Label className="m-0 text-black cursor-pointer">
                Selectionner...
              </Label>
            )}
          </>
        )}
      </div>
      <ChevronDown className="h-4 w-4 text-[#7b7e87]" />
    </Button>
  );
};

export default CustomAutoCompleteButton;
