import React from "react";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

type InputFieldProps = {
  label?: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
};

export default function InputField({
  name,
  rules,
  label,
  placeholder,
  disabled,
}: InputFieldProps) {
  const id = React.useId();
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div
          className={"text-sm my-1.5 w-full " + (disabled ? "opacity-50" : "")}
        >
          {label && (
            <label
              htmlFor={id}
              className={
                "block text-base text-left mb-1 pl-1" +
                (error ? " text-red-500" : " text-gray-500") +
                (rules?.required
                  ? " after:content-['*'] after:ml-0.5 after:text-red-500"
                  : "")
              }
            >
              {label}
            </label>
          )}
          <input
            {...field}
            id={id}
            className={
              "block w-full px-2 py-1 border-2 rounded-[4px] border-blue-500 focus:border-gray-500 focus:rounded-[4px] focus:outline-0" +
              (error ? " border-red-500" : "")
            }
            type="text"
            placeholder={placeholder}
            disabled={disabled}
          />
        </div>
      )}
    />
  );
}
