const {
  bg,
  div,
  p,
  img,
  pad,
  br,
  save,
  configure,
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

const context = configure({
  margins: 54,
  fontStyle: {
    fontSize: 5,
    font: openSans,
    fontColor: 33
  },
  backgroundColor: 128
});

const style = {
  display: "block"
};

const flexStyle = {
  display: "flex"
};

const fontStyle = { fontSize: 22, color: "white" };
const paragraph = () => div(style, bg(231, p(faker.lorem.sentences(10))));
const paragraph2 = () => div(style, bg(200, p(faker.lorem.sentences(10))));

const firstRow = div(
  style,
  row({
    style: flexStyle,
    elements: [
      col(pad(10, paragraph())),
      col(pad(10, paragraph())),
      col(pad(10, paragraph()))
    ]
  })
);

const secondRow = row({
  style: flexStyle,
  elements: [col(pad(20, img(goMoneyLogo, { width: 36, height: 36 })))]
});

const elements = [secondRow];

render(context, elements);

save(context.raw, "output.pdf");
