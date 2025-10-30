/**
 * Creates a URL-friendly slug from a given string
 *
 * @param text - The text to convert to a slug
 * @returns A URL-friendly slug string
 *
 * @example
 * ```ts
 * createSlug("Hello World!") // "hello-world"
 * createSlug("Company Name & Co.") // "company-name-co"
 * createSlug("Multiple   Spaces") // "multiple-spaces"
 * ```
 */
export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};
