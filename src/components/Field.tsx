import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

interface FieldProps extends React.PropsWithChildren {
  htmlFor: string;
  label: string;
}

export default function Field({ htmlFor, label, children }: FieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={htmlFor} className="block font-bold mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}
