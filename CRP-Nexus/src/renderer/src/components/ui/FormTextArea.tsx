import React from "react";
import { Textarea } from "../../@/componentsui/ui/textarea";
import { Skeleton } from "../../@/componentsui/ui/skeleton";
import FormLabel from "./FormLabel";

function FormTextArea({
  label: propsLabel,
  name: propsName,
  classNameTextarea: propsClassNameTextarea,
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
        <Skeleton className="w-full h-24" />
      ) : (
        <Textarea
          id={propsName}
          disabled={propsDisabled}
          {...propsRegister(propsName, propsValidation)}
          className={`border rounded-md w-full border-indigo-500 hover:border-indigo-500 focus:border-indigo-500 ${
            propsClassNameTextarea || ""
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

export default FormTextArea;
