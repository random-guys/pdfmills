const { join } = require("path");
const {
  br,
  configure,
  getRGB,
  img,
  div,
  row,
  col,
  p,
  render,
  table,
  save,
  bg
} = require("..");
const faker = require("faker");
const format = require("date-fns/format");

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

/**
 * Converts Kobo to Naira and converts it to human readable format e.g 300000 -> 3,000
 * @param koboAmount
 */
const toNaira = koboAmount =>
  (koboAmount / 100)
    .toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    })
    .substr(1);

// draw header bg
context.raw.rect(0, 0, 595, 285).fill(getRGB(251));

const divStyle = {
  display: "block",
  margin: 0
};

const flexStyle = {
  display: "flex"
};

const alignRight = {
  fontSize: 8,
  fontColor: 33,
  align: "right",
  fontFamily: montserrat
};

const headerFont = {
  ...alignRight,
  fontFamily: montserrat,
  fontColor: [130, 134, 145]
};

const tblHdrFont = {
  fontFamily: montserrat,
  fontColor: [157, 168, 187]
};

const headerTitle = { ...alignRight, fontFamily: montserratSemibold };
const ratios = [4, 10, 38, 15, 13, 20];

const headerStyle = {
  fontSize: 26,
  align: "right",
  fontFamily: montserratSemibold
};

const goMoneyImg = img(goMoneyLogo, { width: 52, height: 52 });
const firstRow = div(
  divStyle,
  row({
    style: flexStyle,
    elements: [
      col(goMoneyImg, ["right"], 52),
      col(
        div(
          divStyle,
          p("Statement", headerStyle),
          br(10),
          p("Speedy Darlington Eze", alignRight),
          br(3),
          p("6 Adebisi Ogunniyi Lekki phase 1,", alignRight),
          br(3),
          p("Lagos,Nigeria.", alignRight)
        ),
        ["left"],
        160
      )
    ]
  })
);

const secondRow = div(
  divStyle,
  row({
    style: flexStyle,
    elements: [
      col(p("START DATE", { fontFamily: montserratSemibold }), ["right"], 60),
      col(p("ACCOUNT NUMBER", headerTitle), ["right", "left"], 100),
      col(p("INCOME", headerTitle), ["left"], 60)
    ]
  }),
  row({
    style: flexStyle,
    elements: [
      col(p("12/04/2007", { ...headerFont, align: "left" }), ["right"], 60),
      col(p("0087567843", headerFont), ["right", "left"], 100),
      col(p("₦250,000", headerFont), ["left"], 60)
    ]
  }),
  br(20),
  row({
    style: flexStyle,
    elements: [
      col(p("END DATE", { fontFamily: montserratSemibold }), ["right"], 60),
      col(p("BALANCE", headerTitle), ["right", "left"], 100),
      col(p("EXPENSE", headerTitle), ["left"], 60)
    ]
  }),
  row({
    style: flexStyle,
    elements: [
      col(p("12/04/2007", { ...headerFont, align: "left" }), ["right"], 60),
      col(p("₦560,000", headerFont), ["right", "left"], 100),
      col(p("₦25,000", headerFont), ["left"], 60)
    ]
  })
);

const thirdRow = div(
  divStyle,
  row({
    style: flexStyle,
    ratios,
    elements: [
      col(p("S/N", tblHdrFont), ["none"]),
      col(p("TRX DATE", tblHdrFont), ["none"]),
      col(p("DESCRIPTION", tblHdrFont), ["none"]),
      col(p("AMOUNT (₦)", tblHdrFont), ["none"]),
      col(p("CATEGORY", tblHdrFont), ["none"]),
      col(p("CLOSING BALANCE (₦)", { ...tblHdrFont, align: "right" }), ["none"])
    ]
  })
);

const mockCat = () =>
  faker.random.arrayElement([
    "Transfers",
    "Bills",
    "Transportation",
    "Entertainment"
  ]);

const randomAmount = () =>
  toNaira(faker.random.number({ min: 100000, max: 10000000 }));

const mockDescription = () => faker.lorem.sentence(10).substr(0, 35);
const mockDate = () => format(faker.date.past(1), "dd/MM/yy");

const mockRows = Array.from({ length: 100 }).map((_, i) => {
  return div(
    divStyle,
    row({
      style: flexStyle,
      ratios,
      elements: [
        col(p(`${i + 1}.`), ["left"]),
        col(p(mockDate()), ["left"]),
        col(p(mockDescription()), ["left"]),
        col(p(randomAmount()), ["right"]),
        col(p(mockCat()), ["left"]),
        col(p(randomAmount(), { align: "right" }), ["left"])
      ]
    }),
    div(
      divStyle,
      row({
        style: flexStyle,
        ratios: [100],
        elements: [col(bg(231, p("", { fontSize: 1 })))]
      })
    ),
    br(10)
  );
});

const transactionsRow = table(divStyle, ...mockRows);

const elements = [
  firstRow,
  br(50),
  secondRow,
  br(40),
  thirdRow,
  br(10),
  transactionsRow
];
render(context, elements);

save(context.raw, "output.pdf");
