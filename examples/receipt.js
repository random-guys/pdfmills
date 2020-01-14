const { bg, div, p, img, br, save, Context, render } = require("../dist");
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

// const elements = [
//   bg([251, 251, 251]),
//   div(
//     style,
//     bg(
//       [0, 0, 0, 64],
//       p("Transaction Statement", {
//         font: openSansSemibold,
//         color: "white",
//         fontSize: 22,
//         align: "center"
//       })
//     ),
//     br(46)
//   ),
//   div(
//     style,
//     img(goMoneyLogo, { height: 52, width: 52 }),
//     br(14),
//     p("Transaction Statement", {
//       font: openSansSemibold,
//       fontSize: 22
//     }),
//     br(46)
//   ),
//   div(
//     style,
//     div(
//       style,
//       p(faker.lorem.paragraph(10)),
//       br(10),
//       p(faker.lorem.paragraph(10)),
//       br(10)
//     ),
//     div(
//       style,
//       p(faker.lorem.paragraph(10)),
//       br(10),
//       p(faker.lorem.paragraph(10)),
//       br(10)
//     )
//   )
//   // div(style, br(70))
//   // div(
//   //   style,
//   //   {
//   //     weight: 60,
//   //     element: div(style, p("A(1,1)"), br(10), p("A(1,2)"))
//   //   },
//   //   {
//   //     weight: 20,
//   //     element: div(style, p("A(2,1)"), br(10), p("A(2,2)"))
//   //   },
//   //   {
//   //     weight: 20,
//   //     element: div(style, p("A(3,1)"), br(10), p("A(3,2)"))
//   //   }
//   // )
// ];

const elements = [];
elements.push(bg([251, 251, 251]));
elements.push(
  ...Array.from({ length: 44 }).map(it => bg(faker.internet.color(), br(50)))
);
render(context, elements);

save(context.raw, "output.pdf");
