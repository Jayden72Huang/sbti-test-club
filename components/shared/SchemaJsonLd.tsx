import * as React from 'react';

export interface SchemaJsonLdProps {
  /**
   * A JSON-LD schema object (or array of objects) to inject into the page.
   * Uses dangerouslySetInnerHTML to avoid React escaping angle brackets
   * inside the JSON payload, which would break some crawlers.
   */
  schema: Record<string, unknown> | Record<string, unknown>[];
  /** Optional id for the <script> tag. */
  id?: string;
}

/**
 * Renders one or more schema.org JSON-LD blocks. Safe to drop into any
 * server component (layout, page, etc.). Strings inside the payload are
 * escaped to prevent </script> injection.
 */
export function SchemaJsonLd({ schema, id }: SchemaJsonLdProps) {
  const payload = JSON.stringify(schema).replace(/</g, '\\u003c');
  return (
    <script
      id={id}
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: payload }}
    />
  );
}
