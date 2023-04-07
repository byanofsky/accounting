"use client";

import TransactionForm, {
  Props as TransactionFormProps,
} from "./TransactionForm";

type Props = {
  id: string;
  name: string;
  amount: string;
  categoryId: string | undefined;
  date: string;
  categoryOptions: { value: string; label: string }[];
};

export default function TransactionView({
  id,
  name,
  amount,
  categoryId,
  date,
  categoryOptions,
}: Props) {
  const handleSubmit: TransactionFormProps["onSubmit"] = async (
    transaction
  ) => {
    const res = await fetch(`/api/transaction/${id}`, {
      method: "PUT",
      body: JSON.stringify(transaction),
    });
    if (!res.ok) {
      // TODO: Better error handling.
      throw new Error("Transaction update failed");
    }
    return true;
  };

  return (
    <TransactionForm
      onSubmit={handleSubmit}
      clearOnSuccess={false}
      categoryOptions={categoryOptions}
      initialOther={name}
      initialAmount={amount}
      initialDate={date}
      initialCategoryId={categoryId}
    />
  );
}
