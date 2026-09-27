import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

export const CONTENT_IMAGE_PREFIX = '/content-images';

const IMAGE_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.webp',
  '.avif',
  '.svg',
]);

const CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
};

export function defaultContentRoot(): string {
  const candidates = [
    path.join(process.cwd(), 'content'),
    path.join(process.cwd(), 'apps/damnthat.tv/content'),
  ];

  for (const candidate of candidates) {
    if (existsSync(path.join(candidate, 'homepage.md'))) {
      return candidate;
    }
  }

  return candidates[0]!;
}

export function resolveContentImageSrc(
  contentRoot: string,
  directory: string,
  relativePath: string,
): string {
  if (!relativePath) {
    return '';
  }

  if (
    relativePath.startsWith('/') ||
    /^(https?:)?\/\//.test(relativePath) ||
    relativePath.startsWith('data:')
  ) {
    return relativePath;
  }

  const root = path.resolve(contentRoot);
  const absolute = path.resolve(directory, relativePath);
  const relative = path.relative(root, absolute);

  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`Image path escapes content root: ${relativePath}`);
  }

  const urlPath = relative.split(path.sep).join('/');
  return `${CONTENT_IMAGE_PREFIX}/${urlPath}`;
}

export function resolveContentImageFile(
  contentRoot: string,
  segments: string[],
): string | null {
  if (segments.length === 0) {
    return null;
  }

  const root = path.resolve(contentRoot);
  const absolute = path.resolve(root, ...segments);
  const relative = path.relative(root, absolute);

  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    return null;
  }

  const extension = path.extname(absolute).toLowerCase();
  if (!IMAGE_EXTENSIONS.has(extension)) {
    return null;
  }

  return absolute;
}

export function contentImageContentType(filePath: string): string | null {
  return CONTENT_TYPES[path.extname(filePath).toLowerCase()] ?? null;
}

function readUInt24LE(buffer: Buffer, offset: number): number {
  return (
    buffer[offset]! + buffer[offset + 1]! * 256 + buffer[offset + 2]! * 65536
  );
}

export function readImageSize(
  filePath: string,
): { width: number; height: number } | null {
  if (!existsSync(filePath)) {
    return null;
  }

  const buffer = readFileSync(filePath);

  if (
    buffer.length >= 24 &&
    buffer[0] === 0x89 &&
    buffer.toString('ascii', 1, 4) === 'PNG'
  ) {
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
    };
  }

  if (buffer.length >= 10 && buffer.toString('ascii', 0, 3) === 'GIF') {
    return {
      width: buffer.readUInt16LE(6),
      height: buffer.readUInt16LE(8),
    };
  }

  if (
    buffer.length >= 30 &&
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WEBP'
  ) {
    const format = buffer.toString('ascii', 12, 16);

    if (format === 'VP8X') {
      return {
        width: 1 + readUInt24LE(buffer, 24),
        height: 1 + readUInt24LE(buffer, 27),
      };
    }

    if (format === 'VP8 ') {
      return {
        width: buffer.readUInt16LE(26) & 0x3fff,
        height: buffer.readUInt16LE(28) & 0x3fff,
      };
    }

    if (format === 'VP8L') {
      const bits = buffer.readUInt32LE(21);
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >> 14) & 0x3fff) + 1,
      };
    }
  }

  if (buffer.length >= 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;

    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) {
        break;
      }

      const marker = buffer[offset + 1]!;
      const length = buffer.readUInt16BE(offset + 2);

      if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
        return {
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7),
        };
      }

      offset += 2 + length;
    }
  }

  return null;
}
