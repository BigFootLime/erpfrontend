import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";
import FormInput from "../ui/FormInput";

interface LoginFormValues {
  Loginemail: string;
  password: string;
}

const getDefaultValues = (): LoginFormValues => ({
  Loginemail: "",
  password: "",
});

const Login: React.FC = () => {
  const [loading, setLoading] = useState({
    loginemail: false,
    password: false,
  });
  const [error, setError] = useState<string | null>(null);
  const defaultValue = getDefaultValues();
  const history = useHistory(); // Use useHistory hook

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: "all",
    defaultValues: defaultValue,
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setLoading({ loginemail: true, password: true });
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.Loginemail,
          password: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const result = await response.json();
      console.log(result);
      // handle successful login (e.g., store token, redirect to dashboard, etc.)
      history.push("/dashboard"); // Redirect to Dashboard
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading({ loginemail: false, password: false });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8 ">
      <div className="w-full max-w-md space-y-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="../src/assets/CRPL1.svg"
            className="mx-auto h-20 w-auto sm:h-24 lg:h-28"
          />
          <img
            alt="Your Company"
            src="../src/assets/CRPL2.svg"
            className="mx-auto h-20 w-auto sm:h-24 lg:h-28"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <div className="mt-2">
                <FormInput
                  loading={loading.loginemail}
                  register={register}
                  label={"Email address"}
                  name="Loginemail"
                  type="email"
                  validation={{ required: "Email is required" }}
                  error={errors.Loginemail}
                  classNameInput="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:!ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <FormInput
                loading={loading.password}
                register={register}
                label={"Password"}
                name="password"
                type="password"
                validation={{ required: "Password is required" }}
                error={errors.password}
                classNameInput="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:!ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>

            {error && <div className="text-sm text-red-500">{error}</div>}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-400">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
