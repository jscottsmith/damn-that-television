'use client';
import React from 'react';

export default function EmbedBlock(props: { html: string | null }) {
  return <div dangerouslySetInnerHTML={{ __html: props.html || '' }} />;
}
