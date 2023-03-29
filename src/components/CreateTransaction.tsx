"use client";

import { FormEventHandler, useState } from "react";
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
      <label>
        To/From:
        <input
          type="text"
          value={other}
          onChange={(event) => setOther(event.target.value)}
        />
      </label>
      <label>
        Amount:
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
