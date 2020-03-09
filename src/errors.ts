export class RatioMissingError extends Error {
  constructor() {
    super("There must be as many ratio values as items");
  }
}

export class RatioSumError extends Error {
  constructor() {
    super("RatioFlex ratios must all sum up to 100");
  }
}

export class ItemWidthError extends Error {
  constructor() {
    super("All items in a FixedFlex must have an item width");
  }
}
