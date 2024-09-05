import React from "react";
import { X, ChevronDown } from "lucide-react";
import { Button } from "../../@/componentsui/ui/button";
import { Label } from "../../@/componentsui/ui/label";

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

interface FormAutocompleteButtonProps {
  disabled?: boolean;
  simple?: boolean;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  items: ItemsProps;
  setOpen: (open: boolean) => void;
  error?: boolean;
}

const FormAutocompleteButton: React.FC<FormAutocompleteButtonProps> = ({
  disabled: propsDisabled,
  simple: propsSimple,
  value: propsValue,
  onChange: propsOnChange,
  items: propsItems,
  setOpen: propsSetOpen,
  error: propsError,
}) => {
  function GetValue(value: string): string | undefined {
    return Object.keys(propsItems)
      .map((key) => {
        const { commandGroup } = propsItems[key];
        return Object.keys(commandGroup)
          .filter((item) => item !== "props")
          .map((item) => {
            const { commandItem } = commandGroup[item];
            return commandItem;
          });
      })
      .flat()
      .find((item) => item.value === value)?.name;
  }

  return (
    <Button
      type="button"
      className={`w-full bg-gray-50 justify-between !px-4 py-2 flex gap-3 mb-1 ${
        propsError ? "!border-red-500" : ""
      }`}
      variant="outline"
      disabled={propsDisabled}
      onClick={() => propsSetOpen(true)}
    >
      <div className="flex flex-row gap-1 py-1 overflow-auto scrollxs">
        {propsSimple && (
          <Label className="m-0 text-black cursor-pointer">
            {GetValue(propsValue as string) || "Sélectionner ..."}
          </Label>
        )}

        {!propsSimple && Array.isArray(propsValue) && (
          <>
            {propsValue.map((item) => (
              <Button
                key={item}
                className="border border-slate-200 h-7 rounded bg-transparent px-2 py-1 hover:!bg-slate-300 cursor-pointer"
                fontSize="text-xs"
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  propsOnChange(propsValue.filter((i) => i !== item));
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
            {propsValue.length === 0 && (
              <Label className="m-0 text-black cursor-pointer">
                Sélectionner ...
              </Label>
            )}
          </>
        )}
      </div>
      <ChevronDown className="h-4 w-4 text-[#7b7e87]" />
    </Button>
  );
};

export default FormAutocompleteButton;
