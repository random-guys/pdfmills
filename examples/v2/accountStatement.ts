import format from "date-fns/format";
import faker from "faker";
import { maxBy, minBy } from "lodash";
import {
  autoRow,
  br,
  col,
  flexDiv,
  p,
  pad,
  render,
  save,
  table
} from "../../src";
import accountInfo from "./components/accountInfo";
import getApp from "./components/app";
import disclaimer from "./components/disclaimer";
import { flexBR } from "./components/helpers";
import sterlingLogo from "./components/sterlingLogo";
import transactionCount from "./components/transactionCount";
import {
  transactionRow,
  transactionTableHeader
} from "./components/transactionTable";
import transactionSummary from "./components/transanctionSummary";
import { headerColor, robotoBold } from "./components/vars";
import { generateTransactions, Transaction } from "./data";

export default function accountStatement(
  account: any,
  transactions: Transaction[]
) {
  const context = getApp();

  render(context, [
    pad(
      [0, 20],
      autoRow([
        col(flexDiv([flexBR(39, sterlingLogo), ...accountInfo(account)]), [
          "right"
        ]),
        col(
          flexDiv([
            flexBR(12, documentTitle),
            flexBR(16, transactionPeriod(transactions)),
            transactionSummary(transactions)
          ]),
          ["left"]
        )
      ])
    ),
    br(64),
    table(transactionTableHeader, transactions, transactionRow),
    br(35),
    pad([5, 0, 0], transactionCount(transactions)),
    br(27),
    pad([5, 0, 0], disclaimer)
  ]);

  save(context.raw, "output.pdf");
}

const documentTitle = pad(
  [6, 0],
  p("Statement", {
    fontColor: headerColor,
    fontFamily: robotoBold,
    align: "right",
    fontSize: 19,
    letterSpacing: 0.53
  })
);

function transactionPeriod(transactions: Transaction[]) {
  const oldest = minBy(transactions, "date");
  const latest = maxBy(transactions, "date");

  return p(
    `${format(oldest.date, "dd/MM/yyyy")} to ${format(
      latest.date,
      "dd/MM/yyyy"
    )}`,
    {
      fontColor: headerColor,
      fontFamily: robotoBold,
      align: "right",
      fontSize: 16,
      letterSpacing: 0.4
    }
  );
}

const account = {
  account_name: faker.company.companyName(),
  account_number: faker.finance.account(10),
  ledger_name: faker.finance.accountName(),
  customer_id: faker.finance.account(6)
};
const transactions = generateTransactions(account);
accountStatement(account, transactions);
