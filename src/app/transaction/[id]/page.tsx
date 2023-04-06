import { getUserFromCookies } from "@/lib/auth";
import db from "@/lib/db";
import { cookies } from "next/headers";

type Props = {
  params: { id: string };
};

const getData = async (transactionId: string, userId: string) => {
  // TODO: Handle checking authz
  const data = await db.transaction.findFirstOrThrow({
    where: {
      id: transactionId,
      userId,
    },
  });
  return data;
};

export default async function Transaction({ params }: Props) {
  const user = await getUserFromCookies(cookies());

  if (!user) {
    return <p>Not authorized</p>;
  }

  const transaction = await getData(params.id, user.id);

  return (
    <main className="max-w-prose mx-auto">
      <p>name: {transaction.other}</p>
      <p>id: {params.id}</p>
    </main>
  );
}
