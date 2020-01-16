const {
  bg,
  div,
  p,
  img,
  br,
  save,
  Context,
  render,
  row,
  col
} = require("../dist");
const { join } = require("path");
const faker = require("faker");

const assets = join(__dirname, "assets");
const openSans = join(assets, "fonts/OpenSans-Regular.ttf");
const openSansSemibold = join(assets, "fonts/OpenSans-Semibold.ttf");
const goMoneyLogo = join(assets, "img/logo.png");

const context = new Context({
  margins: 54,
  fontStyle: {
    fontSize: 5,
    font: openSans,
    fontColor: 33
  }
});

const style = {
  display: "block",
  margin: 1
};

const flexStyle = {
  display: "flex",
  margin: 1
};

const fontStyle = { fontSize: 22, color: "white" };
const paragraph = () => div(style, bg(231, p(faker.lorem.sentences(10))));
const paragraph2 = () => div(style, bg(200, p(faker.lorem.sentences(10))));

const firstRow = div(
  style,
  row({
    style: flexStyle,
    ratios: [30, 10, 10, 10, 10, 10, 10, 10],
    elements: [
      col(paragraph()),
      col(paragraph()),
      col(paragraph()),
      col(paragraph()),
      col(paragraph()),
      col(paragraph()),
      col(paragraph()),
      col(paragraph())
    ]
  })
);

const secondRow = row({
  style: flexStyle,
  elements: [
    col(paragraph2(), ["left"]),
    col(paragraph2(), ["left", "right"]),
    col(paragraph2(), ["left", "right"])
  ]
});

const elements = [
  div(style, firstRow),
  div(style, br(20)),
  div(style, secondRow)
];

render(context, elements);

save(context.raw, "output.pdf");
