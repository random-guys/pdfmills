import faker from "faker";
import subDays from "date-fns/subDays";

type TransType = "debit" | "credit";

export interface Transaction {
  balance: number;
  date: Date;
  transaction_type: TransType;
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
  const trxType: TransType = faker.random.arrayElement(["debit", "credit"]);
  const amount = parseFloat(faker.finance.amount(10_000, 20_000_000, 0));
  const newBalance =
    previousTrx.balance + (trxType === "credit" ? amount : -amount);
  return {
    amount,
    balance: newBalance,
    date: date,
    remark:
      "gomoney is authorised by the Central Bank of Nigeria and all deposits are insured by the Nigerian Deposit Insurance Company, gomoney is authorised by the Central Bank of Nigeria and all deposits are insured by the Nigerian Deposit Insurance Company",
    reference: faker.random.uuid(),
    nuban: previousTrx.nuban,
    customer: previousTrx.customer,
    transaction_type: trxType
  };
}

function generateInitialTransaction(account: any, date: Date): Transaction {
  const trxType: TransType = faker.random.arrayElement(["debit", "credit"]);
  const balance = parseFloat(faker.finance.amount(100_000_000, 500_000_000));
  const amount = parseFloat(faker.finance.amount(10_000, 20_000_000, 0));
  return {
    amount,
    balance,
    date,
    remark:
      "gomoney is authorised by the Central Bank of Nigeria and all deposits are insured by the Nigerian Deposit Insurance Company, gomoney is authorised by the Central Bank of Nigeria and all deposits are insured by the Nigerian Deposit Insurance Company",
    reference: faker.random.uuid(),
    nuban: account.account_number,
    customer: account.customer_id,
    transaction_type: trxType
  };
}

export function generateTransactions(account: any) {
  const from = new Date();
  const allTransactions: Transaction[] = [];

  for (let i = 0; i < 1; i++) {
    const numTrx = faker.random.number({ max: 2 });
    const to = subDays(from, 1);
    const first = generateInitialTransaction(account, to);

    const transactions = Array.from({ length: numTrx }).map(() =>
      generateTransaction(first, to)
    );
    transactions.unshift(first);

    allTransactions.push(...transactions);
  }

  return allTransactions;
}
