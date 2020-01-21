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
const montserrat = join(assets, "fonts/Montserrat-Regular.ttf");
const montserratSemibold = join(assets, "fonts/Montserrat-Semibold.ttf");
const goMoneyLogo = join(assets, "img/logo.png");

const context = configure({
  margins: 54,
  fontStyle: {
    fontSize: 8,
    fontFamily: montserrat,
    fontColor: 33
  }
});

// draw header bg
context.raw.rect(box.x, box.y, box.width, box.height).fill(getRGB(251));

const style = {
  display: "block"
};

const flexStyle = {
  display: "flex"
};

const alignRight = {
  fontSize: 8,
  fontFamily: montserrat,
  fontColor: 33,
  align: "right"
};
const headerFont = { ...alignRight, fontColor: [130, 134, 145] };

const headerStyle = {
  fontSize: 26,
  align: "right",
  fontFamily: montserratSemibold
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
          p("Lagos,Nigeria.", alignRight)
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
      col(p("START DATE"), ["right"], 60),
      col(p("ACCOUNT NUMBER", alignRight), ["right", "left"], 100),
      col(p("INCOME", alignRight), ["left"], 60)
    ]
  }),
  row({
    style: flexStyle,
    elements: [
      col(p("12/03/07", { ...headerFont, align: "left" }), ["right"], 60),
      col(p("0087567843", headerFont), ["right", "left"], 100),
      col(p("₦250,000", headerFont), ["left"], 60)
    ]
  }),
  br(10),
  row({
    style: flexStyle,
    elements: [
      col(p("END DATE"), ["right"], 60),
      col(p("BALANCE", alignRight), ["right", "left"], 100),
      col(p("INCOME", alignRight), ["left"], 60)
    ]
  }),
  row({
    style: flexStyle,
    elements: [
      col(p("12/03/07", { ...headerFont, align: "left" }), ["right"], 60),
      col(p("₦560,000", headerFont), ["right", "left"], 100),
      col(p("₦25,000", headerFont), ["left"], 60)
    ]
  })
);

const thirdRow = div(
  { margin: 4 },
  row({
    style: flexStyle,
    elements: [
      col(p("START DATE"), ["right"], 60),
      col(p("₦560,000", alignRight), ["right", "left"], 100),
      col(p("₦25,000", alignRight), ["left"], 60)
    ]
  })
);

const elements = [firstRow, br(30), secondRow, br(20), thirdRow];

render(context, elements);

save(context.raw, "output.pdf");
