import CreateCategory from "@/components/CreateCategory";
import CreateTransaction from "@/components/CreateTransaction";
import TransactionTable from "@/components/TransactionTable";
import db from "@/lib/db";

const getCategories = async () => {
  const categories = await db.category.findMany();
  return categories;
};

export default async function Home() {
  const categories = await getCategories();

  return (
    <main className="max-w-prose mx-auto">
      <h1>Accounting</h1>
      <h2>Transactions</h2>
      {/* @ts-expect-error Server Component */}
      <TransactionTable />
      <h2>Create Transaction</h2>
      <CreateTransaction categories={categories} />
      <h2>Create Category</h2>
      <CreateCategory />
    </main>
  );
}
