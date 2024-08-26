import { Input } from "../../@/componentsui/ui/input";
import { Skeleton } from "../../@/componentsui/ui/skeleton";
import FormLabel from "./FormLabel";
import React from "react";

function FormInput({
  label: propsLabel,
  name: propsName,
  type: propsType,
  classNameInput: propsClassNameInput,
  disabled: propsDisabled,
  loading: propsLoading,
  register: propsRegister,
  validation: propsValidation,
  placeholder: propsPlaceholder,
  error: propsError,
  light: propsLight, // New prop
}) {
  return (
    <div className="w-full">
      <FormLabel
        label={propsLabel}
        name={propsName}
        required={propsValidation?.required}
        className={`${propsLight ? "text-black" : ""}`} // Apply black text color if `light` is true
      />
      {propsLoading ? (
        <Skeleton className="w-full h-10" />
      ) : (
        <Input
          id={propsName}
          disabled={propsDisabled}
          type={propsType}
          {...propsRegister(propsName, propsValidation)}
          className={`border rounded-md w-full border-indigo-500 hover:border-indigo-500 focus:border-indigo-500 ${
            propsClassNameInput || ""
          } ${propsError ? "!border-red-500" : ""}`}
          placeholder={propsPlaceholder}
        />
      )}
      {propsError && (
        <span className="text-sm text-red-500">{propsError?.message}</span>
      )}
    </div>
  );
}

export default FormInput;
