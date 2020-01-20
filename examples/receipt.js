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
    fontSize: 8,
    font: openSans,
    fontColor: 33
  }
});

const style = {
  display: "block"
};

const flexStyle = {
  display: "flex"
};

const alignRight = {
  fontSize: 8,
  font: openSans,
  fontColor: 33,
  align: "right"
};
const titleStyle = { fontSize: 14, fontColor: "white" };
const headerStyle = {
  fontSize: 26,
  align: "right",
  fontFamily: openSansSemibold
};

const goMoneyImg = img(goMoneyLogo, { width: 52, height: 52 });
const firstRow = div(
  { margin: 4 },
  row({
    style: flexStyle,
    elements: [
      col(goMoneyImg, ["right"], 52),
      col(
        div(
          { margin: 0 },
          p("Statement", headerStyle),
          br(10),
          p("Sule Mandem Fari", alignRight),
          p("6 Adebisi Ogunniyi Lekki phase 1,", alignRight),
          p("Lagos,Nigeria.", alignRight),
          br(20)
        ),
        ["left"],
        160
      )
    ]
  })
);

const secondRow = div(
  { margin: 4 },
  row({
    style: flexStyle,
    elements: [
      col(bg(241, p("START DATE")), ["right"], 60),
      col(bg(241, p("ACCOUNT NUMBER", alignRight)), ["right", "left"], 100),
      col(bg(241, p("INCOME", alignRight)), ["left"], 60)
    ]
  })
);

const elements = [firstRow, secondRow];

render(context, elements);

save(context.raw, "output.pdf");
