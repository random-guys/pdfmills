import sumBy from "lodash/sumBy";
import { autoRow, col, flexDiv, FontStyle, p } from "../../../src";
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

export default function transactionCount(transactions: Transaction[]) {
  const totalCredit = sumBy(transactions, x =>
    x.transaction_type === "credit" ? 1 : 0
  );
  const totalDebit = sumBy(transactions, x =>
    x.transaction_type === "debit" ? 1 : 0
  );

  return autoRow([
    col(
      flexDiv([
        p(totalDebit.toString(), valueStyle),
        flexBR(12, p("Debit Count", valueHeaderStyle)),

        p(totalCredit.toString(), valueStyle),
        flexBR(12, p("Credit Count", valueHeaderStyle))
      ]),
      ["left"]
    )
  ]);
}
