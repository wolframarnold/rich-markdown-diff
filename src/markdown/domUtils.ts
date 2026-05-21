/*
 * MIT License
 *
 * Copyright (c) 2026 Rich Markdown Diff Authors
 */

/**
 * Finds the matching closing tag for a given opening tag in an HTML string.
 * Supports nested tags of the same name.
 */
export function findClosing(
  html: string,
  start: number,
  tagName: string,
): number {
  let depth = 0;
  const tagNameLower = tagName.toLowerCase();
  const openTagBase = `<${tagNameLower}`;
  const closeTag = `</${tagNameLower}>`;

  for (let i = start; i < html.length; i++) {
    if (html[i] === "<") {
      // Check for opening tag with word boundary
      if (html.slice(i, i + openTagBase.length).toLowerCase() === openTagBase) {
        const charAfter = html[i + openTagBase.length];
        if (!charAfter || /[\s/>]/.test(charAfter)) {
          depth++;
        }
      } else if (
        html.slice(i, i + closeTag.length).toLowerCase() === closeTag
      ) {
        depth--;
        if (depth === 0) {
          return i + closeTag.length;
        }
      }
    }
  }
  return -1;
}
