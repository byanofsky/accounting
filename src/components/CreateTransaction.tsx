"use client";

import React, { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import Field from "./Field";
import Button from "./Button";
import Input from "./Input";
import Dropdown from "./Dropdown";
import { Category } from "@prisma/client";

interface Props {
  categories: Category[];
}

export default function CreateTransaction({ categories }: Props) {
  const router = useRouter();

  const [other, setOther] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    const res = await fetch("/api/transaction", {
      method: "POST",
      body: JSON.stringify({
        other,
        // TODO: Add validation
        amount,
        date,
        categoryId,
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
    setDate("");
    setCategoryId(undefined);
    router.refresh();
  };

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

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
