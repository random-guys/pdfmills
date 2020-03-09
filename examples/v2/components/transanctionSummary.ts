import { maxBy } from "lodash";
import sumBy from "lodash/sumBy";
import { flexDiv, FontStyle, formatCurrency, p } from "../../../src";
import { Transaction } from "../data";
import { flexBR } from "./helpers";
import { baseFontSize, headerColor, robotoBold, robotoRegular } from "./vars";

const valueStyle: FontStyle = {
  fontSize: 12,
  fontColor: headerColor,
  fontFamily: robotoBold,
  letterSpacing: 0.12,
  align: "right"
};

const valueHeaderStyle: FontStyle = {
  fontSize: baseFontSize,
  fontColor: headerColor,
  fontFamily: robotoRegular,
  align: "right"
};

export default function transactionSummary(transactions: Transaction[]) {
  const latestTransaction = maxBy(transactions, "date");
  const latestBalance = formatCurrency("NGN", latestTransaction.balance);

  const totalCredit = sumBy(transactions, x =>
    x.transaction_type === "credit" ? x.amount : 0
  );
  const totalDebit = sumBy(transactions, x =>
    x.transaction_type === "debit" ? x.amount : 0
  );

  return flexDiv([
    p(latestBalance, valueStyle),
    flexBR(12, p("Current Balance", valueHeaderStyle)),

    p(formatCurrency("NGN", totalDebit), valueStyle),
    flexBR(12, p("Total Outgoings", valueHeaderStyle)),

    p(formatCurrency("NGN", totalCredit), valueStyle),
    flexBR(12, p("Total deposits", valueHeaderStyle))
  ]);
}
