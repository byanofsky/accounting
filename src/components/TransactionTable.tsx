import { getUserFromCookies } from "@/lib/auth";
import db from "@/lib/db";
import { formatCurrency, formatDate } from "@/lib/format";
import { cookies } from "next/headers";
import Link from "next/link";

async function getData(userId: string) {
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  return transactions;
}

export default async function TransactionTable() {
  // TODO: Move to middleware
  const user = await getUserFromCookies(cookies());
  // TODO: Redirect when not authorized.
  if (!user) {
    return <p>Not authorized</p>;
  }

  const data = await getData(user.id);

  return (
    <div className="relative bg-slate-50 rounded-xl overflow-auto">
      <div role="table" className="table table-auto w-full border-collapse">
        <div className="table-header-group">
          <div
            role="row"
            className="table-row border-b font-medium text-slate-400 text-left"
          >
            <div role="columnheader" className="table-cell p-4">
              Name
            </div>
            <div role="columnheader" className="table-cell p-4">
              Amount
            </div>
            <div role="columnheader" className="table-cell p-4">
              Date
            </div>
            <div role="columnheader" className="table-cell p-4">
              Category
            </div>
            <div role="columnheader" className="table-cell p-4"></div>
          </div>
        </div>
        <div className="table-row-group bg-white text-slate-500">
          {data.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              id={transaction.id}
              other={transaction.other}
              amount={transaction.amount}
              date={transaction.date}
              category={transaction.category?.name}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5"></div>
    </div>
  );
}

interface TransactionProps {
  id: string;
  other: string;
  amount: number;
  date: Date;
  category?: string;
}

function TransactionRow({
  id,
  other,
  amount,
  date,
  category,
}: TransactionProps) {
  const formattedAmount = formatCurrency(amount);

  const formattedDate = formatDate(date);

  return (
    <div className="table-row border-b border-s">
      <div className="table-cell p-4">{other}</div>
      <div className="table-cell p-4">{formattedAmount}</div>
      <div className="table-cell p-4">{formattedDate}</div>
      <div className="table-cell p-4">{category}</div>
      <div className="table-cell p-4">
        <Link href={`/transaction/${id}`}>Edit</Link>
      </div>
    </div>
  );
}
