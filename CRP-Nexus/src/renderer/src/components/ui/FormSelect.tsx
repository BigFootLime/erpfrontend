import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../@/componentsui/ui/select";
import { Skeleton } from "../../@/componentsui/ui/skeleton";
import FormLabel from "./FormLabel";

function FormSelect({
  label: propsLabel,
  name: propsName,
  classNameSelectTrigger: propsClassNameSelectTrigger,
  disabled: propsDisabled,
  loading: propsLoading,
  register: propsRegister,
  validation: propsValidation,
  placeholder: propsPlaceholder,
  error: propsError,
  options: propsOptions, // Array of options
  light: propsLight, // New prop
}) {
  return (
    <div className="w-full">
      <FormLabel
        label={propsLabel}
        name={propsName}
        required={propsValidation?.required}
        className={`${propsLight ? "text-black" : ""}`}
      />
      {propsLoading ? (
        <Skeleton className="w-full h-10" />
      ) : (
        <Select
          {...propsRegister(propsName, propsValidation)}
          disabled={propsDisabled}
          defaultValue=""
        >
          <SelectTrigger
            className={`border rounded-md w-full border-indigo-500 hover:border-indigo-500 focus:border-indigo-500 ${
              propsClassNameSelectTrigger || ""
            } ${propsError ? "!border-red-500" : ""}`}
          >
            <SelectValue placeholder={propsPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{propsLabel}</SelectLabel>
              {propsOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
      {propsError && (
        <span className="text-sm text-red-500">{propsError?.message}</span>
      )}
    </div>
  );
}

export default FormSelect;
