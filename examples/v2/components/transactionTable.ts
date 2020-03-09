import format from "date-fns/format";
import { col, FontStyle, formatCurrency, p, pad, row } from "../../../src";
import { Transaction } from "../data";
import { infoTitleStyle } from "./accountInfo";
import { bb, dbb } from "./borders";
import { tableRow } from "./helpers";
import { baseFontSize, robotoRegular } from "./vars";

export const columnRatios = [13.5, 38.5, 16, 16, 16];

const tableHeaderMoneyStyle: FontStyle = {
  ...infoTitleStyle,
  align: "right"
};

const tableContentStyle: FontStyle = {
  fontSize: baseFontSize,
  fontColor: "#202742",
  fontFamily: robotoRegular,
  lineHeight: 14,
  letterSpacing: 0.1,
  verticalAlignment: true
};

const tableContentMoneyStyle: FontStyle = {
  ...tableContentStyle,
  align: "right"
};

export const transactionTableHeader = bb(
  "#2f444e",
  row({
    ratios: columnRatios,
    elements: [
      col(pad([0, 0, 9, 10], p("Date", infoTitleStyle))),
      col(pad([0, 0, 9], p("Description", infoTitleStyle))),
      col(pad([0, 0, 9], p("(NGN)Debit", tableHeaderMoneyStyle))),
      col(pad([0, 0, 9], p("(NGN)Credit", tableHeaderMoneyStyle))),
      col(pad([0, 10, 9, 0], p("(NGN)Balance", tableHeaderMoneyStyle)))
    ]
  })
);

export function transactionRow(transaction: Transaction) {
  const formattedDate = format(transaction.date, "dd/MMM/yyyy");
  const credit =
    transaction.transaction_type === "credit" ? transaction.amount : 0;
  const debit =
    transaction.transaction_type === "debit" ? transaction.amount : 0;

  return dbb(
    "#d9d8d8",
    tableRow(columnRatios, [
      col(pad([6, 0, 6], p(formattedDate, tableContentStyle))),
      col(pad([6, 0, 6], p(transaction.remark, tableContentStyle))),
      col(
        pad([6, 0, 6], p(formatCurrency("NGN", debit), tableContentMoneyStyle))
      ),
      col(
        pad([6, 0, 6], p(formatCurrency("NGN", credit), tableContentMoneyStyle))
      ),
      col(
        pad(
          [6, 0, 6],
          p(formatCurrency("NGN", transaction.balance), tableContentMoneyStyle)
        )
      )
    ])
  );
}
