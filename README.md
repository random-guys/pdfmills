# pdfmills

A simple wrapper around [pdfkit](https://github.com/foliojs/pdfkit) that favors declarative style.

## What's inside

- Elements:
  - `Text` or `Paragraph`s
  - `Image`s
- Layouts:
  - `Block`
  - `Flex`
  - `RatioFlex`
  - `EqualFlex`
- Spacing:
  - `LineBreaks` for vertical spaces
  - `Margin`
  - `Padding`
- Automatic page management

## How to install

```sh
yarn add @random-guys/pdfmills
```

or

```sh
npm i @random-guys/pdfmills
```

## Get Started

```ts
import { block, Text } from "@random-guys/pdfmills";

// arrange elements vertically
const divStyle: BlockStyle = {
  display: "block",
  margin: 0
};

const flexStyle: FlexStyle = {
  display: "flex"
};

div(
  { ...divStyle, margin: 4 },
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
  br(20),
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

// arrange elements horizontally
const headerFont: FontStyle = { ...alignRight, fontColor: [130, 134, 145] };
row({
  style: flexStyle,
  elements: [
    col(p("12/03/07", { ...headerFont, align: "left" }), ["right"], 60),
    col(p("0087567843", headerFont), ["right", "left"], 100),
    col(p("₦250,000", headerFont), ["left"], 60)
  ]
});

// load the element
const elements = [firstRow, br(50), secondRow, br(40), thirdRow];

// write the elements to the buffer
render(context, elements);

// write the buffer to the file stream
save(context.raw, "output.pdf");
```

Checkout the [examples](https://github.com/random-guys/pdfmills/tree/develop/examples) folder for real life examples.
