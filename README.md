# pdfmills

A simple wrapper around [pdfkit](https://github.com/foliojs/pdfkit) that favors declarative style.

## What's inside

- Basic objects like `Text`, `Image`
- Layouts like `SpaceBetween`(equivalent of `justify-content: space-between`), `Block`, `WeightedRow`
- Spacing using `LineBreak` and `Margin`
- `Table` layout for free
- Draw over multiple pages using `Multipage`

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
block(context, [
  new LineBreak(32),
  new Text("Some Heading", { fontSize: 22 }),
  new LineBreak(10)
  new Text("Some Sub-heading", { fontSize: 18 }),
]);

// arrange elements horizontally
spaceBetween(context, [
  new Block([new Text("A(1,1)"), new LineBreak(10), new Text("A(1,2)")]),
  new Block([new Text("A(2,1)"), new LineBreak(10), new Text("A(2,2)")]),
  new Block([new Text("A(3,1)"), new LineBreak(10), new Text("A(3,2)")])
]);
```

Checkout the [examples](https://github.com/random-guys/pdfmills/tree/develop/examples) folder for real life examples.

## TODO

- [ ] Single `Flex` layout with multple strategies
  - [ ] `space-between`
  - [ ] `space-around`
  - [ ] `space-evenly`
  - [ ] `weighted`
  - [ ] `auto`
- [ ] Layout Tests
  - [ ] `SpaceBetween`
  - [ ] `WeightedRow`
  - [ ] `Block`
