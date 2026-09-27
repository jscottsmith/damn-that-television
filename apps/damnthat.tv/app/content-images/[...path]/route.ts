import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import {
  contentImageContentType,
  defaultContentRoot,
  resolveContentImageFile,
} from '../../../lib/content/images';

interface RouteParams {
  params: Promise<{ path: string[] }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { path: segments } = await params;
  const filePath = resolveContentImageFile(defaultContentRoot(), segments);

  if (!filePath || !existsSync(filePath)) {
    return new Response(null, { status: 404 });
  }

  const contentType = contentImageContentType(filePath);
  const body = await readFile(filePath);

  return new Response(body, {
    headers: {
      'Content-Type': contentType ?? 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
