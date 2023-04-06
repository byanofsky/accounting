"use client";

import Field from "@/components/Field";
import Input from "@/components/Input";
import { FormEventHandler, useState } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status !== 200) {
      // TODO: handle login error
      return;
    }

    router.push("/");
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
