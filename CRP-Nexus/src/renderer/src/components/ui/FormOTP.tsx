import React from "react";
import { useFormContext } from "react-hook-form";
import FormLabel from "./FormLabel";
import { Skeleton } from "../../../../../@/components/ui/skeleton";

export function FormOTP({ label, name, disabled, loading, validation, error }) {
  const { register, setValue } = useFormContext();

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (value.length > 1) {
      e.target.value = value[0];
    }

    const nextInput = document.getElementById(`${name}-${index + 1}`);
    if (nextInput && value) {
      nextInput.focus();
    }
    setValue(`${name}[${index}]`, value);
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    [...pasteData].forEach((char, index) => {
      const input = document.getElementById(`${name}-${index}`);
      if (input) {
        input.value = char;
        setValue(`${name}[${index}]`, char);
      }
    });
    e.preventDefault();
  };

  return (
    <div className="w-full">
      <FormLabel label={label} name={name} required={validation?.required} />
      {loading ? (
        <Skeleton className="w-full h-10" />
      ) : (
        <div
          id={name}
          className="border border-indigo-500 rounded-md w-full hover:border-indigo-500 focus:border-indigo-500 flex flex-row justify-center items-center text-gray-900"
        >
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              id={`${name}-${index}`}
              className="w-10 h-10 m-1 text-center bg-white text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              maxLength={1}
              onChange={(e) => handleChange(e, index)}
              onPaste={handlePaste}
              disabled={disabled}
              {...register(`${name}[${index}]`, {
                required: "Code de vérification est requis",
                maxLength: { value: 1, message: "Max length is 1" },
              })}
            />
          ))}
        </div>
      )}
      {error && <span className="text-sm text-red-500">{error.message}</span>}
    </div>
  );
}

export default FormOTP;
