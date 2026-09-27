import { writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { readImageSize } from './images';

const pixelPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);
const pixelGif = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  'base64',
);

describe('given an image file next to content', () => {
  test('then the reader reports its pixel size for next/image', () => {
    const directory = tmpdir();
    const png = path.join(directory, 'content-pixel.png');
    const gif = path.join(directory, 'content-pixel.gif');
    writeFileSync(png, pixelPng);
    writeFileSync(gif, pixelGif);

    expect(readImageSize(png)).toEqual({ width: 1, height: 1 });
    expect(readImageSize(gif)).toEqual({ width: 1, height: 1 });
    expect(readImageSize(path.join(directory, 'missing.jpg'))).toBeNull();
  });
});
