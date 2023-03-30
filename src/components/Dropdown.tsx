import React from "react";

interface Props {
  id: string;
  options: { value: string; label: string }[];
  value: string | undefined;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export default function Dropdown({ id, options, value, onChange }: Props) {
  return (
    <select id={id} value={value} onChange={onChange}>
      <option value={undefined}>None</option>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
