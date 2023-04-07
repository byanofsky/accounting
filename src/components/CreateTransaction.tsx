"use client";

import React, { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import Field from "./Field";
import Button from "./Button";
import Input from "./Input";
import Dropdown from "./Dropdown";
import { Category } from "@prisma/client";
import TransactionView from "./TransactionView";
import TransactionForm, {
  Props as TransactionFormProps,
} from "./TransactionForm";

interface Props {
  categories: Category[];
}

export default function CreateTransaction({ categories }: Props) {
  const router = useRouter();

  const handleSubmit: TransactionFormProps["onSubmit"] = async ({
    other,
    amount,
    date,
    categoryId,
  }) => {
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

    router.refresh();
    return true;
  };

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <TransactionForm
      onSubmit={handleSubmit}
      clearOnSuccess={true}
      categoryOptions={categoryOptions}
    />
  );
}
