import { Element, MultiPageLayout } from "../base";

export interface TableConfig<T> {
  /**
   * the header of the table. This will be draw on each new page
   */
  header: Element;
  /**
   * creates a row for individual data items
   */
  rowMapper: (data: T) => Element;
  /**
   * data to render on the table
   */
  data: T[];
}

/**
 * A table is basically a `block`without a definite height
 */
export class Table<T> implements MultiPageLayout {
  readonly newPageElement: Element;

  constructor(private config: TableConfig<T>) {
    this.newPageElement = this.config.header;
  }

  children(): Element[] {
    return this.config.data.map(this.config.rowMapper);
  }
}
