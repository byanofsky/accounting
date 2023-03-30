import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

interface InputProps {
  id: string;
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  step?: InputHTMLAttributes<HTMLInputElement>["step"];
}

export default function Input({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  step,
}: InputProps) {
  return (
    <input
      id={id}
      className="shadow appearance-none border rounded w-full py-2 px-3 focus:shadow-outlin focus:outline-none"
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      step={step}
    />
  );
}
