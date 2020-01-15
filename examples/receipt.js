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

const style = {
  display: "block",
  margin: 1
};

const flexStyle = {
  display: "flex",
  margin: 1
};

const elements = [
  bg(251),
  row(
    flexStyle,
    col("left", bg(faker.internet.color(), p("1"))),
    col("none", bg(faker.internet.color(), p("2"))),
    col("right", bg(faker.internet.color(), p("3"))),
    col("right", bg(faker.internet.color(), p("4")))
  )
];

render(context, elements);

save(context.raw, "output.pdf");
