// Import libs
import React from "react";
// Import shad components
import { Label } from "../../@/componentsui/ui/label";

function FormLabel({
  label: propsLabel,
  name: propsName,
  required: propsRequired,
  className: propsClassName,
}) {
  return !propsLabel ? null : (
    <Label
      htmlFor={propsName}
      className={`text-sm truncate max-w-full m-0 hover:max-w-max text-white hover:z-50 hover:relative hover:pr-2 ${propsClassName}`}
    >
      {propsLabel}{" "}
      {propsRequired ? <span className="!text-orange-500">*</span> : null}
    </Label>
  );
}

export default FormLabel;
