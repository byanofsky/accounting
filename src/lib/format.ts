export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount / 100);
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
  }).format(date);
};

export const formatDateToInput = (date: Date) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  return `${parts[4].value}-${parts[0].value}-${parts[2].value}`;
};
