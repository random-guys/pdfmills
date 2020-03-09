import { join } from "path";
import { configure, imgBg } from "../../../src";
import { assetPath, baseFontSize, headerColor, robotoRegular } from "./vars";

export const backgroundPath = join(assetPath, "./img/background.png");

export default function getApp() {
  return configure({
    margins: [40, 20],
    fontStyle: {
      fontSize: baseFontSize,
      fontFamily: robotoRegular,
      fontColor: headerColor
    },
    backgroundColor: imgBg(backgroundPath)
  });
}
