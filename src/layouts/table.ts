import { Element, MultiPageLayout } from "../base";

export interface TableConfig<T> {
  /**
   * the header of the table. This will be draw on each new page
   */
  header?: Element;
  /**
   * the footer of the table. Like the header, this will be drawn on new
   * pages
   */
  footer?: Element;
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
  footer = null;
  multipage: true;

  constructor(private config: TableConfig<T>) {}

  children(): Element[] {
    return [];
  }
}
