import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "../ui/FormInput";
import FormAutoComplete from "../ui/FormAutoComplete";

export default function DevisLandingPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      numdevis: "12345", // Set your default value here
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle the form data as needed
  };

  return (
    <div className="h-[85vh] sm:h-[80vh] md:h-[75vh] lg:h-[75vh] xl:h-[85vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-lg rounded-xl p-6 sm:p-8 md:p-10"
      >
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-center text-2xl sm:text-3xl font-bold">
            Générer un Devis
          </h1>
        </div>

        <div className="mb-4">
          <FormAutoComplete
            light={true}
            label="N° Devis"
            name="numdevis"
            register={register}
            validation={{ required: "This field is required" }}
            error={errors.numdevis}
          />
        </div>

        <div className="flex justify-start">
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
