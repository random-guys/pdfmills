import { autoRow, col, FontStyle, p, pad } from "../../../src";
import { baseFontSize, headerColor, robotoBold, robotoRegular } from "./vars";

export const infoTitleStyle: FontStyle = {
  fontSize: baseFontSize,
  fontColor: headerColor,
  fontFamily: robotoBold,
  lineHeight: 14
};

const infoContentStyle: FontStyle = {
  fontSize: baseFontSize,
  fontColor: headerColor,
  fontFamily: robotoRegular,
  lineHeight: 14
};

export default function accountInfo(account: any) {
  return [
    autoRow([
      col(pad([0, 3, 0, 0], p("Account Name:", infoTitleStyle))),
      col(p(account.account_name, infoContentStyle))
    ]),
    autoRow([
      col(pad([0, 3, 0, 0], p("Account Number:", infoTitleStyle))),
      col(p(account.account_number, infoContentStyle))
    ]),
    autoRow([
      col(pad([0, 3, 0, 0], p("Account Type:", infoTitleStyle))),
      col(p(account.ledger_name, infoContentStyle))
    ])
  ];
}
