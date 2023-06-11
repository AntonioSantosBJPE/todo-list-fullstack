"use client";
import { UseFormRegisterReturn } from "react-hook-form";

interface iInput {
  labelName: string;
  id: string;
  type: "text" | "password" | "email";
  disabled?: boolean;
  placeholder?: string;
  linkForm?: UseFormRegisterReturn<string>;
  error?: any;
}

export const Input = ({
  type,
  id,
  labelName,
  placeholder,
  linkForm,
  error,
  disabled,
}: iInput) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-zinc-950 text-base font-semibold pl-2"
      >
        {labelName}
      </label>
      <input
        autoComplete={"false"}
        type={type}
        id={id}
        placeholder={placeholder}
        {...linkForm}
        disabled={disabled}
        className=" w-full h-12 bg-zinc-50 border rounded-2xl px-5 py-3 placeholder:text-base placeholder:text-zinc-500"
      />
      {error && <p className="text-sm text-red-600 pl-2">{error}</p>}
    </div>
  );
};
