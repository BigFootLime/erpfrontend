import React, { useRef, useState } from "react";
import { Controller } from "react-hook-form";
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
import FormAutocompleteButton from "./FormAutoCompleteButton";
import CustomButton from "./CustomButton";

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

interface FormAutocompleteProps<TFieldValues extends FieldValues> {
  label: string;
  name: string;
  control: Control<TFieldValues>;
  simple?: boolean;
  disabled?: boolean;
  loading?: boolean;
  register: UseFormRegister<TFieldValues>;
  validation?: Record<string, any>;
  error?: FieldError;
  items: ItemsProps;
  displayItems?: number;
}

function FormAutocomplete<TFieldValues extends FieldValues>({
  label: propsLabel,
  name: propsName,
  control: propsControl,
  simple: propsSimple,
  disabled: propsDisabled,
  loading: propsLoading,
  register: propsRegister,
  validation: propsValidation,
  error: propsError,
  items: propsItems,
  displayItems: propsDisplayItems,
}: FormAutocompleteProps<TFieldValues>) {
  const [open, setOpen] = useState(false);
  const [viewMore, setViewMore] = useState(propsDisplayItems || 50);
  const divRef = useRef<HTMLDivElement>(null);
  const [filterBool, setFilterBool] = useState(false);
  const [values, setValues] = useState<string>("");

  const handleViewMore = () => {
    setViewMore(viewMore + (propsDisplayItems || 50));
  };

  return (
    <Controller
      control={propsControl}
      name={propsName}
      {...propsRegister(propsName, propsValidation)}
      render={({ field: { onChange, value, ref } }) => {
        return (
          <div className="w-full" ref={divRef}>
            <FormLabel
              label={propsLabel}
              name={propsName.split(".").join("")}
              required={propsValidation?.required}
              className={propsError ? "text-red-500" : "text-black"}
            />
            {propsLoading ? (
              <Skeleton className="w-full h-10" />
            ) : (
              <Popover
                id={propsName.split(".").join("")}
                ref={ref}
                open={open}
                onOpenChange={setOpen}
              >
                <PopoverTrigger className="w-full">
                  <FormAutocompleteButton
                    error={propsError}
                    disabled={propsDisabled}
                    simple={propsSimple}
                    value={value}
                    onChange={onChange}
                    items={propsItems}
                    setOpen={setOpen}
                  />
                </PopoverTrigger>
                <PopoverContentWithoutPortal
                  className="p-0 bg-white"
                  style={{
                    width: `${divRef.current?.offsetWidth}px`,
                  }}
                >
                  <Command>
                    <CommandInput
                      className="bg-gray-50 border-none"
                      placeholder="Rechercher ..."
                      onValueChange={(e) => {
                        setFilterBool(e !== "");
                        setValues(e);
                      }}
                    />

                    <CommandList className="scrollsm overflow-x-auto bg-white">
                      <CommandEmpty>Aucune donnée</CommandEmpty>
                      {Object.keys(propsItems).map((key) => {
                        const { commandGroup } = propsItems[key];

                        return (
                          <CommandGroup key={key} {...commandGroup.props}>
                            {Object.keys(commandGroup)
                              .filter((item, index) => {
                                if (item === "props") return false;
                                if (propsDisplayItems) {
                                  if (!filterBool) {
                                    return index < viewMore;
                                  }
                                  if (
                                    values &&
                                    values.toLowerCase().length >= 3
                                  ) {
                                    return commandGroup[item].commandItem.name
                                      .toLowerCase()
                                      .includes(values.toLowerCase());
                                  }
                                  return index < viewMore;
                                }
                                return true;
                              })
                              .map((item) => {
                                const { commandItem } = commandGroup[item];
                                return (
                                  <CommandItem
                                    key={commandItem.key || commandItem.name}
                                    value={commandItem.value}
                                    className="p-0 bg-white"
                                    data-disabled={false} // Explicitly set data-disabled to false
                                  >
                                    <button
                                      type="button"
                                      className="w-full flex flex-row px-2 py-1 text-left"
                                      onClick={() => {
                                        if (propsSimple) {
                                          onChange(commandItem.value);
                                          setOpen(false);
                                          return;
                                        }
                                        if (Array.isArray(value)) {
                                          if (
                                            value.includes(commandItem.value)
                                          ) {
                                            onChange(
                                              value.filter(
                                                (v: string) =>
                                                  v !== commandItem.value,
                                              ),
                                            );
                                          } else {
                                            onChange([
                                              ...value,
                                              commandItem.value,
                                            ]);
                                          }
                                        }
                                      }}
                                    >
                                      {(propsSimple &&
                                        value === commandItem.value) ||
                                      (!propsSimple &&
                                        Array.isArray(value) &&
                                        value.includes(commandItem.value)) ? (
                                        <Check className="!h-4 !w-4 mr-2" />
                                      ) : (
                                        <div className="w-6" />
                                      )}
                                      {commandItem.name}
                                    </button>
                                  </CommandItem>
                                );
                              })}
                            {(Object.keys(commandGroup).length > 3000 ||
                              propsDisplayItems) && (
                              <CommandItem className="p-0 bg-white">
                                <CustomButton
                                  type="button"
                                  icon={
                                    <PlusCircle className="!h-4 !w-4 mr-2" />
                                  }
                                  text="Voir plus"
                                  className="bg-blue-600 w-full text-white h-8"
                                  onClick={handleViewMore}
                                />
                              </CommandItem>
                            )}
                          </CommandGroup>
                        );
                      })}
                    </CommandList>
                  </Command>
                </PopoverContentWithoutPortal>
              </Popover>
            )}
            {propsError && (
              <span className="text-xs text-red-500">
                {propsError?.message}
              </span>
            )}
          </div>
        );
      }}
    />
  );
}

export default FormAutocomplete;
