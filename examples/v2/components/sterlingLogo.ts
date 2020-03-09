import { join } from "path";
import { img } from "../../../src";
import { assetPath } from "./vars";

export const logoPath = join(assetPath, "./img/group-logo.png");

const sterlingLogo = img(logoPath, { width: 130, height: 36 });
export default sterlingLogo;
