"use client";

import { FormEventHandler, useState } from "react";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Field from "./Field";
import Input from "./Input";

type SubmitValues = {
  other: string;
  amount: string;
  date: string;
  categoryId: string | undefined;
};

export type Props = {
  // Returns true if successful.
  onSubmit: (values: SubmitValues) => Promise<boolean>;
  clearOnSuccess: boolean;
  categoryOptions: { value: string; label: string }[];
  initialOther?: string;
  initialAmount?: string;
  initialDate?: string;
  initialCategoryId?: string;
};

export default function TransactionForm({
  onSubmit,
  clearOnSuccess,
  categoryOptions,
  initialOther,
  initialAmount,
  initialDate,
  initialCategoryId,
}: Props) {
  const [other, setOther] = useState(initialOther ?? "");
  const [amount, setAmount] = useState(initialAmount ?? "");
  const [date, setDate] = useState(initialDate ?? "");
  const [categoryId, setCategoryId] = useState<string | undefined>(
    initialCategoryId ?? undefined
  );

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    const result = await onSubmit({
      other,
      amount,
      date,
      categoryId,
    });

    if (result && clearOnSuccess) {
      setAmount("");
      setOther("");
      setDate("");
      setCategoryId(undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field htmlFor="other-field" label="Name">
        <Input
          id="other-field"
          type="text"
          placeholder="Name"
          value={other}
          onChange={(event) => setOther(event.target.value)}
        />
      </Field>
      <Field htmlFor="amount" label="Amount">
        <Input
          id="amount"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          step={0.01}
        />
      </Field>
      <Field htmlFor="date" label="Date">
        <Input
          id="date"
          type="date"
          placeholder="Date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </Field>
      <Field htmlFor="category" label="Category">
        <Dropdown
          id="category"
          options={categoryOptions}
          value={categoryId}
          onChange={(value) => setCategoryId(value)}
        />
      </Field>

      <Button type="submit">Submit</Button>
    </form>
  );
}
