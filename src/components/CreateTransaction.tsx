"use client";

import React, {
  ButtonHTMLAttributes,
  FormEventHandler,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useState,
} from "react";
import { useRouter } from "next/navigation";

export default function CreateTransaction() {
  const router = useRouter();

  const [other, setOther] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    const res = await fetch("/api/transaction", {
      method: "POST",
      body: JSON.stringify({
        other,
        // TODO: Add validation
        amount,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`Transaction Create Error`);
    }
    // TODO: Handle success
    setAmount("");
    setOther("");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        value={other}
        label="To/From"
        onChange={(event) => setOther(event.target.value)}
        placeholder="Name"
        id="other-field"
        type="text"
      />
      <TextField
        value={amount}
        label="Amount"
        onChange={(event) => setAmount(event.target.value)}
        placeholder="Amount"
        id="amount"
        type="number"
        step={0.01}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
}

interface TextFieldProps {
  value: string;
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  id: string;
  type: HTMLInputTypeAttribute;
  step?: InputHTMLAttributes<HTMLInputElement>["step"];
}

function TextField({
  id,
  value,
  onChange,
  placeholder,
  label,
  type = "text",
  step,
}: TextFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block font-bold mb-2">
        {label}
      </label>
      <input
        id={id}
        className="shadow appearance-none border rounded w-full py-2 px-3 focus:shadow-outlin focus:outline-none"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        step={step}
      />
    </div>
  );
}

interface ButtonProps extends React.PropsWithChildren {
  type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

const Button = ({ type, children }: ButtonProps) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type={type}
    >
      {children}
    </button>
  );
};
