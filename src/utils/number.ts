export function truncate(num: number) {
  return Number.parseFloat(num.toFixed(2));
}

export function formatCurrency(currency: string, amount: number) {
  if (currency === "NGN") {
    const amountStr = new Intl.NumberFormat("en-US", {
      currency: "USD",
      style: "currency"
    }).format(amount);
    return amountStr.replace("$", "₦");
  }

  new Intl.NumberFormat("en-US", {
    currency,
    style: "currency"
  }).format(amount);
}
