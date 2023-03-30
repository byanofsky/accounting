import CreateTransaction from "@/components/CreateTransaction";
import TransactionTable from "@/components/TransactionTable";

export default async function Home() {
  return (
    <main className="max-w-prose mx-auto">
      <h1>Accounting</h1>
      <h2>Transactions</h2>
      {/* @ts-expect-error Server Component */}
      <TransactionTable />
      <h2>Create Transaction</h2>
      <CreateTransaction />
    </main>
  );
}
