import { LoginForm } from "@/components/LoginForm";

export default async function Login() {
  return (
    <main className="max-w-prose mx-auto">
      <h1>Accounting</h1>
      <h2>Login</h2>
      <LoginForm />
    </main>
  );
}
