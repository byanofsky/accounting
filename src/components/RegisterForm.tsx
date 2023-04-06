"use client";

import Field from "@/components/Field";
import Input from "@/components/Input";
import { FormEventHandler, useState } from "react";
import Button from "./Button";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        name,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field htmlFor="email" label="Email">
        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Field>

      <Field htmlFor="name" label="Name">
        <Input
          id="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Field>

      <Field htmlFor="password" label="Password">
        <Input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Field>

      <Button type="submit">Submit</Button>
    </form>
  );
};
