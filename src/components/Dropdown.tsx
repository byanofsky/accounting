import React, { useMemo, useState } from "react";
import { clsx } from "clsx";

interface Props {
  id: string;
  options: { value: string; label: string }[];
  value: string | undefined;
  onChange: (value: string | undefined) => void;
}

// TODO: Handle a11y
export default function Dropdown({ id, options, value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const handleSelection = (value: string | undefined) => {
    onChange(value);
    setOpen(false);
  };

  const selectedOption = options.find((o) => o.value === value);

  const optionsWithNone = useMemo(
    () => [{ label: "None", value: undefined }, ...options],
    [options]
  );

  return (
    <div className="relative w-2/5">
      <button
        className="inline-flex shadow border rounded w-11/12 py-2 px-2 focus:shadow-outline focus:outline-none"
        type="button"
        onClick={() => setOpen((open) => !open)}
      >
        <span className="flex-1 text-left">
          {selectedOption ? selectedOption.label : "None"}
        </span>
        <span className="flex-none">
          <DownChevronIcon />
        </span>
      </button>
      <div
        className={clsx(
          "absolute bg-white rounded shadow w-full",
          !open && "hidden"
        )}
      >
        <ul>
          {optionsWithNone.map(({ value, label }) => (
            <li
              key={value ?? "none"}
              className="p-2 cursor-pointer hover:bg-slate-100"
              onClick={() => handleSelection(value)}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
    // <select id={id} value={value} onChange={onChange}>
    // </select>
  );
}

const DownChevronIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};
