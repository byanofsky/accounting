import db from "@/lib/db";

async function getData() {
  const transactions = await db.transaction.findMany({
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
  const data = await getData();

  return (
    <div className="relative bg-slate-50 rounded-xl overflow-auto">
      <div role="table" className="table table-auto w-full border-collapse">
        <div className="table-header-group">
          <div
            role="row"
            className="table-row border-b font-medium text-slate-400 text-left"
          >
            <div role="columnheader" className="table-cell p-4">
              Id
            </div>
            <div role="columnheader" className="table-cell p-4">
              To/From
            </div>
            <div role="columnheader" className="table-cell p-4">
              Amount
            </div>
            <div role="columnheader" className="table-cell p-4">
              Category
            </div>
          </div>
        </div>
        <div className="table-row-group bg-white text-slate-500">
          {data.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              id={transaction.id}
              other={transaction.other}
              amount={transaction.amount}
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
  category?: string;
}

function TransactionRow({ id, other, amount, category }: TransactionProps) {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount / 100);

  return (
    <div className="table-row border-b border-s">
      <div className="table-cell p-4">{id}</div>
      <div className="table-cell p-4">{other}</div>
      <div className="table-cell p-4">{formattedAmount}</div>
      <div className="table-cell p-4">{category}</div>
    </div>
  );
}
