import TransactionView from "@/components/TransactionView";
import { getUserFromCookies } from "@/lib/auth";
import db from "@/lib/db";
import { formatCurrency, formatDate, formatDateToInput } from "@/lib/format";
import { cookies } from "next/headers";

type Props = {
  params: { id: string };
};

const getData = async (transactionId: string, userId: string) => {
  // TODO: Handle checking authz
  const data = await db.transaction.findUniqueOrThrow({
    where: {
      id: transactionId,
    },
    select: {
      userId: true,
      other: true,
      amount: true,
      date: true,
      categoryId: true,
    },
  });

  if (data.userId !== userId) {
    // TODO: Better error handling
    throw new Error("Not authorized");
  }

  return data;
};

// TODO: Better enforcement of authz
const getCategories = async (userId: string) => {
  const categories = await db.category.findMany({
    where: {
      userId,
    },
  });

  return categories.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
};

export default async function Transaction({ params }: Props) {
  const user = await getUserFromCookies(cookies());

  if (!user) {
    return <p>Not authorized</p>;
  }

  const transaction = await getData(params.id, user.id);
  const categoryOptions = await getCategories(user.id);

  return (
    <main className="max-w-prose mx-auto">
      <TransactionView
        id={params.id}
        name={transaction.other}
        amount={String(transaction.amount / 100)}
        categoryId={transaction.categoryId || undefined}
        date={formatDateToInput(transaction.date)}
        categoryOptions={categoryOptions}
      />
    </main>
  );
}
