import styles from "./page.module.css";
import prisma from "@/lib/db";
import CreateTransaction from "@/components/CreateTransaction";

async function getData() {
  const transactions = await prisma.transaction.findMany();
  return transactions;
}

export default async function Home() {
  const data = await getData();
  return (
    <main className={styles.main}>
      <h2>Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>To/Form</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              id={transaction.id}
              other={transaction.other}
              amount={transaction.amount}
            />
          ))}
        </tbody>
      </table>
      <h2>Create Transaction</h2>
      <CreateTransaction />
    </main>
  );
}

interface TransactionProps {
  id: string;
  other: string;
  amount: number;
}

function TransactionRow({ id, other, amount }: TransactionProps) {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount / 100);

  return (
    <tr>
      <td>{id}</td>
      <td>{other}</td>
      <td>{formattedAmount}</td>
    </tr>
  );
}
