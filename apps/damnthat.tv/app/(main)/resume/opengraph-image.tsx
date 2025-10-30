import Eye from '@/components/eye';
import { PointerFinger } from '@/components/pointer-finger';
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

const nameCopy = 'J Scott Smith';
const pageCopy = 'Résumé';
const tagCopy = 'Engineering Leader and Creative Developer';
const ctaCopy = 'Damn that TV!';

export const alt = `${pageCopy} | ${nameCopy} ${tagCopy}`;

// Image generation
export default async function Image() {
  // Font loading, process.cwd() is Next.js project directory
  const fptExtraboldOblique = await readFile(
    join(process.cwd(), 'fonts/fpt/fpt_extrabold-oblique.woff'),
  );

  const fptBookOblique = await readFile(
    join(process.cwd(), 'fonts/fpt/fpt_book-oblique.woff'),
  );
  const fptBook = await readFile(
    join(process.cwd(), 'fonts/fpt/fpt_book.woff'),
  );
  const fptBold = await readFile(
    join(process.cwd(), 'fonts/fpt/fpt_bold.woff'),
  );

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontFamily: 'futura',
          backgroundImage: 'linear-gradient(to bottom, #6574ff, #72dbde)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '48px 96px 0 0',
        }}
        className="bg-gray-950"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            marginLeft: 48,
            marginBottom: 32,
            paddingRight: 48,
          }}
        >
          <Eye
            style={{
              height: 50,
              width: 100,
              marginRight: 48,
              color: '#2c2f34',
            }}
          />
          <div
            style={{
              fontWeight: 900,
              fontSize: 72,
              lineHeight: 1,
              fontStyle: 'italic',
              textTransform: 'uppercase',
              color: '#2c2f34',
            }}
          >
            {pageCopy}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            paddingLeft: 48,
            background: 'white',
            borderRadius: '0 64px 0 0',
          }}
        >
          <div
            style={{
              fontSize: 100,
              lineHeight: 1,
              fontStyle: 'italic',
              fontWeight: 400,
              marginTop: 48,
              color: '#3a4155',
            }}
          >
            {nameCopy}
          </div>
          <div
            style={{
              fontSize: 59,
              lineHeight: 1.4,
              fontWeight: 400,
              color: '#3a4155',
            }}
          >
            {tagCopy}
          </div>
          <div
            style={{
              display: 'flex',
              flexGrow: 0,
              alignSelf: 'flex-start',
              padding: 45,
              fontSize: 48,
              textTransform: 'uppercase',
              borderRadius: 24,
              marginTop: 30,
              lineHeight: 1,
              fontWeight: 700,
              backgroundColor: '#72dbde',
              color: '#232839',
            }}
          >
            {ctaCopy}
            <PointerFinger
              style={{
                position: 'absolute',
                top: 0,
                right: -110,
                width: 160, // 0.801369863
                height: 200,
                transform: 'rotate(-25deg)',
              }}
            />
          </div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: 'futura',
          data: fptExtraboldOblique,
          style: 'italic',
          weight: 900,
        },
        {
          name: 'futura',
          data: fptBookOblique,
          style: 'italic',
          weight: 400,
        },
        {
          name: 'futura',
          data: fptBook,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'futura',
          data: fptBold,
          style: 'normal',
          weight: 700,
        },
      ],
    },
  );
}
