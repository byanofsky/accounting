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
          </div>
        </div>
        <div className="table-row-group bg-white text-slate-500">
          {data.map((transaction) => (
            <TransactionRow
              key={transaction.id}
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
  other: string;
  amount: number;
  date: Date;
  category?: string;
}

function TransactionRow({ other, amount, date, category }: TransactionProps) {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount / 100);

  const formattedDate = new Intl.DateTimeFormat("en-US").format(date);

  return (
    <div className="table-row border-b border-s">
      <div className="table-cell p-4">{other}</div>
      <div className="table-cell p-4">{formattedAmount}</div>
      <div className="table-cell p-4">{formattedDate}</div>
      <div className="table-cell p-4">{category}</div>
    </div>
  );
}
