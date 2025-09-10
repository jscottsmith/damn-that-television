# Prismic Types

This directory contains TypeScript type definitions for your Prismic integration.

## Files

- `prismic.ts` - **Manual types** (DO NOT overwrite) - Contains custom type definitions based on your Prismic schema

## Usage

The manual types in `prismic.ts` are imported and used throughout your application. These types are based on your actual Prismic schema and provide full type safety.

## When to Update Types

### Manual Types (`prismic.ts`)

Update this file when:

- You add new document types in Prismic
- You add new slice types in Prismic
- You modify existing field structures

## About Code Generation

The `prismic-ts-codegen` tool is configured but currently generates empty types because:

1. Your Prismic repository may not have custom types defined yet, OR
2. The codegen tool can't access your repository properly

This is normal and expected. The manual types in `prismic.ts` provide all the type safety you need.

## Best Practice

1. Keep your manual types in `prismic.ts` up to date with your Prismic schema
2. If you set up custom types in Prismic later, you can run `pnpm run prismic:codegen` to generate types
3. Compare generated types with your manual types and merge improvements as needed
