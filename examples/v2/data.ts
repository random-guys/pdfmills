import faker from "faker";
import subDays from "date-fns/subDays";

export interface Transaction {
  balance: number;
  date: Date;
  transaction_type: "debit" | "credit";
  amount: number;
  remark: string;
  reference?: string;
  nuban: string;
  customer: string;
}

function generateTransaction(
  previousTrx: Transaction,
  date: Date
): Transaction {
  const trxType = faker.random.arrayElement(["debit", "credit"]);
  const amount = parseFloat(faker.finance.amount(10_000, 20_000_000, 0));
  const newBalance =
    previousTrx.balance + (trxType === "credit" ? amount : -amount);
  return {
    amount,
    balance: newBalance,
    date: date,
    remark: faker.lorem.sentence(),
    reference: faker.random.uuid(),
    nuban: previousTrx.nuban,
    customer: previousTrx.customer,
    // @ts-ignore
    transaction_type: trxType
  };
}

function generateInitialTransaction(account: any, date: Date): Transaction {
  const trxType = faker.random.arrayElement(["debit", "credit"]);
  const balance = parseFloat(faker.finance.amount(100_000_000, 500_000_000));
  const amount = parseFloat(faker.finance.amount(10_000, 20_000_000, 0));
  return {
    amount,
    balance,
    date,
    remark: faker.lorem.sentence(),
    reference: faker.random.uuid(),
    nuban: account.account_number,
    customer: account.customer_id,
    // @ts-ignore
    transaction_type: trxType
  };
}

export function generateTransactions(account: any) {
  const from = new Date();
  const allTransactions: Transaction[] = [];

  for (let i = 0; i < 7; i++) {
    const numTrx = faker.random.number({ min: 1, max: 10 });
    const to = subDays(from, i);
    const first = generateInitialTransaction(account, to);

    const transactions = Array.from({ length: numTrx }).map(() =>
      generateTransaction(first, to)
    );
    transactions.unshift(first);

    allTransactions.push(...transactions);
  }

  return allTransactions;
}
