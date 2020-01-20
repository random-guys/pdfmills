export class RatioMissingError extends Error {
  constructor() {
    super("Column ratio cannot be less than 1");
  }
}

export class RatioSumError extends Error {
  constructor() {
    super("Item percentages must add up to 100");
  }
}

export class ItemWidthError extends Error {
  constructor() {
    super("All items should have an item width");
  }
}

export class InvalidItemError extends Error {
  constructor() {
    super("Only `col()` should be children of `row()`");
  }
}
