const {
  bg,
  div,
  p,
  img,
  br,
  row,
  col,
  save,
  Context,
  render
} = require("../dist");
const { join } = require("path");
const faker = require("faker");

const assets = join(__dirname, "assets");
const openSans = join(assets, "fonts/OpenSans-Regular.ttf");
const openSansSemibold = join(assets, "fonts/OpenSans-Semibold.ttf");
const goMoneyLogo = join(assets, "img/logo.png");

const context = new Context(54, {
  font: openSans,
  fontSize: 8,
  color: 33
});

const divStyle = {
  display: "block",
  margin: 1
};

const flexStyle = {
  display: "flex",
  margin: 1
};

const fontStyle = { fontSize: 22, color: "white" };

const elements = [
  bg(231),
  row(
    flexStyle,
    col(["left", "right"], bg("black", p("1", fontStyle))),
    col(["left", "right"], bg("black", p("2", fontStyle))),
    col(["left", "right"], bg("black", p("3", fontStyle)))
    // col(["left", "right"], bg("black", p("4", fontStyle)))
  )
];

render(context, elements);

save(context.raw, "output.pdf");
