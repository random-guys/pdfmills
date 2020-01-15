const { bg, div, p, img, br, save, Context, render } = require("../dist");
const { join } = require("path");
const faker = require("faker");

const assets = join(__dirname, "assets");
const openSans = join(assets, "fonts/OpenSans-Regular.ttf");
const openSansSemibold = join(assets, "fonts/OpenSans-Semibold.ttf");
const goMoneyLogo = join(assets, "img/logo.png");

const context = new Context({
  margins: 54,
  fontStyle: {
    fontSize: 12,
    font: openSans,
    fontColor: 33
  },
  backgroundColor: 231
});

const divStyle = {
  display: "block",
  margin: 1
};

const elements = [
  div(
    style,
    bg(
      [0, 0, 0, 64],
      p("Transaction Statement", {
        font: openSansSemibold,
        fontColor: "white",
        fontSize: 22,
        align: "center"
      })
    ),
    br(10)
  ),
  div(
    style,
    img(goMoneyLogo, { height: 52, width: 52 }),
    br(14),
    p("Transaction Statement", {
      font: openSansSemibold,
      fontSize: 22
    }),
    br(10)
  ),
  div(
    style,
    div(
      style,
      p(faker.lorem.sentences(10)),
      br(10),
      p(faker.lorem.sentences(10)),
      br(10)
    ),
    div(
      style,
      p(faker.lorem.sentences(10)),
      br(10),
      p(faker.lorem.paragraph(10)),
      br(10)
    )
  ),
  div(
    style,
    p(faker.lorem.sentences(10)),
    br(10),
    p(faker.lorem.sentences(10)),
    br(10)
  ),
  div(
    style,
    p(faker.lorem.sentences(10)),
    br(10),
    p(faker.lorem.paragraph(10)),
    br(10)
  ),
  div(
    style,
    p(faker.lorem.sentences(10)),
    br(10),
    p(faker.lorem.sentences(10)),
    br(10)
  ),
  div(
    style,
    p(faker.lorem.sentences(10)),
    br(10),
    p(faker.lorem.paragraph(10)),
    br(10)
  ),
  div(
    style,
    p(faker.lorem.sentences(10)),
    br(10),
    p(faker.lorem.sentences(10)),
    br(10)
  ),
  div(
    style,
    p(faker.lorem.sentences(10)),
    br(10),
    p(faker.lorem.paragraph(10)),
    br(10),
  row(
    flexStyle,
    col(["left", "right"], bg("black", p("1", fontStyle))),
    col(["left", "right"], bg("black", p("2", fontStyle))),
    col(["left", "right"], bg("black", p("3", fontStyle)))
];

// const elements = [];
// elements.push(bg([251, 251, 251]));
// elements.push(
//   ...Array.from({ length: 44 }).map(it => bg(faker.internet.color(), br(50)))
// );
render(context, elements);

save(context.raw, "output.pdf");
