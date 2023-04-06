import { RegisterForm } from "@/components/RegisterForm";

export default async function Register() {
  return (
    <main className="max-w-prose mx-auto">
      <h1>Accounting</h1>
      <h2>Create account</h2>
      <RegisterForm />
    </main>
  );
}
