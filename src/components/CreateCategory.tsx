"use client";

import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import Button from "./Button";
import Field from "./Field";
import Input from "./Input";

export default function CreateCategory() {
  const router = useRouter();

  const [name, setName] = useState("");

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    const res = await fetch("/api/category", {
      method: "POST",
      body: JSON.stringify({
        name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`Category Create Error`);
    }
    // TODO: Handle success
    setName("");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field htmlFor="category-name" label="Category">
        <Input
          id="category-name"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Field>

      <Button type="submit">Submit</Button>
    </form>
  );
}
