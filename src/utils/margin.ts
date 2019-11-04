/**
 * Margins in english
 */
export interface Margins {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

/**
 * Check out MDN for [CSS margins](https://developer.mozilla.org/en-US/docs/Web/CSS/margin). Note it
 * only supports pixels(that should be obvious).
 */
export type CSSMargins =
  | number
  | [number, number]
  | [number, number, number]
  | [number, number, number, number];

/**
 * Convert CSS margin declaration to a margin object
 * that normal humans understand
 * @param cssMargins CSS style margins
 */
export function toEnglish(cssMargins?: CSSMargins) {
  if (!cssMargins) {
    return {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };
  }

  if (typeof cssMargins === 'number') {
    return {
      left: cssMargins,
      right: cssMargins,
      top: cssMargins,
      bottom: cssMargins
    };
  }
  switch (cssMargins.length) {
    case 2:
      return {
        left: cssMargins[1],
        right: cssMargins[1],
        top: cssMargins[0],
        bottom: cssMargins[0]
      };
    case 3:
      return {
        left: cssMargins[1],
        right: cssMargins[1],
        top: cssMargins[0],
        bottom: cssMargins[2]
      };
    case 4:
      return {
        left: cssMargins[3],
        right: cssMargins[1],
        top: cssMargins[0],
        bottom: cssMargins[2]
      };
    default:
      throw new Error('Learn CSS. And then read the docs');
  }
}
