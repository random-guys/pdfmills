import { br, div, FontStyle, p } from "../../../src";
import { infoTitleStyle } from "./accountInfo";
import { baseFontSize, robotoRegular } from "./vars";

const disclaimerStyle: FontStyle = {
  fontSize: baseFontSize,
  fontColor: "#202742",
  fontFamily: robotoRegular,
  lineHeight: 14,
  letterSpacing: 0.1,
  verticalAlignment: true
};

const disclaimer = div([
  p("DISCLAIMER", infoTitleStyle),
  br(12),
  p(
    "This is a computer generated statement requiring no signature and it represents our records of your transactions with us. Any exceptions must be advised to the bank immediately. If we do not hear from you within 2 weeks, we will assume that you are in agreement with the details stated. All products are subject to the bank's terms and conditions. For any enquiries, please contact Sterling Bank's customer care team on 0700STERLING (070078375464) or send an email to customercare@sterlingbankng.com.",
    disclaimerStyle
  )
]);
export default disclaimer;
