import React from 'react';

const sections = [
  [
    ['salmon-50', 'bg-salmon-50'],
    ['salmon-100', 'bg-salmon-100'],
    ['salmon-200', 'bg-salmon-200'],
    ['salmon-300', 'bg-salmon-300'],
    ['salmon-400', 'bg-salmon-400'],
    ['salmon-500', 'bg-salmon-500'],
    ['salmon-600', 'bg-salmon-600'],
    ['salmon-700', 'bg-salmon-700'],
    ['salmon-800', 'bg-salmon-800'],
    ['salmon-900', 'bg-salmon-900'],
  ],
  [
    ['plum-50', 'bg-plum-50'],
    ['plum-100', 'bg-plum-100'],
    ['plum-200', 'bg-plum-200'],
    ['plum-300', 'bg-plum-300'],
    ['plum-400', 'bg-plum-400'],
    ['plum-500', 'bg-plum-500'],
    ['plum-600', 'bg-plum-600'],
    ['plum-700', 'bg-plum-700'],
    ['plum-800', 'bg-plum-800'],
    ['plum-900', 'bg-plum-900'],
  ],
  [
    ['pepto-50', 'bg-pepto-50'],
    ['pepto-100', 'bg-pepto-100'],
    ['pepto-200', 'bg-pepto-200'],
    ['pepto-300', 'bg-pepto-300'],
    ['pepto-400', 'bg-pepto-400'],
    ['pepto-500', 'bg-pepto-500'],
    ['pepto-600', 'bg-pepto-600'],
    ['pepto-700', 'bg-pepto-700'],
    ['pepto-800', 'bg-pepto-800'],
    ['pepto-900', 'bg-pepto-900'],
  ],
  [
    ['lunar-50', 'bg-lunar-50'],
    ['lunar-100', 'bg-lunar-100'],
    ['lunar-200', 'bg-lunar-200'],
    ['lunar-300', 'bg-lunar-300'],
    ['lunar-400', 'bg-lunar-400'],
    ['lunar-500', 'bg-lunar-500'],
    ['lunar-600', 'bg-lunar-600'],
    ['lunar-700', 'bg-lunar-700'],
    ['lunar-800', 'bg-lunar-800'],
    ['lunar-900', 'bg-lunar-900'],
  ],
  [
    ['lit-50', 'bg-lit-50'],
    ['lit-100', 'bg-lit-100'],
    ['lit-200', 'bg-lit-200'],
    ['lit-300', 'bg-lit-300'],
    ['lit-400', 'bg-lit-400'],
    ['lit-500', 'bg-lit-500'],
    ['lit-600', 'bg-lit-600'],
    ['lit-700', 'bg-lit-700'],
    ['lit-800', 'bg-lit-800'],
    ['lit-900', 'bg-lit-900'],
  ],
  [
    ['miami-50', 'bg-miami-50'],
    ['miami-100', 'bg-miami-100'],
    ['miami-200', 'bg-miami-200'],
    ['miami-300', 'bg-miami-300'],
    ['miami-400', 'bg-miami-400'],
    ['miami-500', 'bg-miami-500'],
    ['miami-600', 'bg-miami-600'],
    ['miami-700', 'bg-miami-700'],
    ['miami-800', 'bg-miami-800'],
    ['miami-900', 'bg-miami-900'],
  ],
  [
    ['club-50', 'bg-club-50'],
    ['club-100', 'bg-club-100'],
    ['club-200', 'bg-club-200'],
    ['club-300', 'bg-club-300'],
    ['club-400', 'bg-club-400'],
    ['club-500', 'bg-club-500'],
    ['club-600', 'bg-club-600'],
    ['club-700', 'bg-club-700'],
    ['club-800', 'bg-club-800'],
    ['club-900', 'bg-club-900'],
  ],
  [
    ['lavender-50', 'bg-lavender-50'],
    ['lavender-100', 'bg-lavender-100'],
    ['lavender-200', 'bg-lavender-200'],
    ['lavender-300', 'bg-lavender-300'],
    ['lavender-400', 'bg-lavender-400'],
    ['lavender-500', 'bg-lavender-500'],
    ['lavender-600', 'bg-lavender-600'],
    ['lavender-700', 'bg-lavender-700'],
    ['lavender-800', 'bg-lavender-800'],
    ['lavender-900', 'bg-lavender-900'],
  ],
  [
    ['cream-50', 'bg-cream-50'],
    ['cream-100', 'bg-cream-100'],
    ['cream-200', 'bg-cream-200'],
    ['cream-300', 'bg-cream-300'],
    ['cream-400', 'bg-cream-400'],
    ['cream-500', 'bg-cream-500'],
    ['cream-600', 'bg-cream-600'],
    ['cream-700', 'bg-cream-700'],
    ['cream-800', 'bg-cream-800'],
    ['cream-900', 'bg-cream-900'],
  ],
  [
    ['fab-50', 'bg-fab-50'],
    ['fab-100', 'bg-fab-100'],
    ['fab-200', 'bg-fab-200'],
    ['fab-300', 'bg-fab-300'],
    ['fab-400', 'bg-fab-400'],
    ['fab-500', 'bg-fab-500'],
    ['fab-600', 'bg-fab-600'],
    ['fab-700', 'bg-fab-700'],
    ['fab-800', 'bg-fab-800'],
    ['fab-900', 'bg-fab-900'],
  ],
  [
    ['ghost-50', 'bg-ghost-50'],
    ['ghost-100', 'bg-ghost-100'],
    ['ghost-200', 'bg-ghost-200'],
    ['ghost-300', 'bg-ghost-300'],
    ['ghost-400', 'bg-ghost-400'],
    ['ghost-500', 'bg-ghost-500'],
    ['ghost-600', 'bg-ghost-600'],
    ['ghost-700', 'bg-ghost-700'],
    ['ghost-800', 'bg-ghost-800'],
    ['ghost-900', 'bg-ghost-900'],
  ],
  [
    ['soft-pink-50', 'bg-soft-pink-50'],
    ['soft-pink-100', 'bg-soft-pink-100'],
    ['soft-pink-200', 'bg-soft-pink-200'],
    ['soft-pink-300', 'bg-soft-pink-300'],
    ['soft-pink-400', 'bg-soft-pink-400'],
    ['soft-pink-500', 'bg-soft-pink-500'],
    ['soft-pink-600', 'bg-soft-pink-600'],
    ['soft-pink-700', 'bg-soft-pink-700'],
    ['soft-pink-800', 'bg-soft-pink-800'],
    ['soft-pink-900', 'bg-soft-pink-900'],
  ],
];

function ColorSwatch(props: { color: string; name: string }) {
  return (
    <div className="inline-flex flex-col items-center">
      <div className={'h-36 w-36 ' + props.color} />
      <p className="font-poppins text-xs font-bold">{props.name}</p>
    </div>
  );
}

export default function Colors() {
  return (
    <div className="bg-white">
      {sections.map((colors, i) => {
        return (
          <section key={i}>
            {colors.map((entry, i) => {
              return <ColorSwatch key={i} color={entry[1]} name={entry[0]} />;
            })}
          </section>
        );
      })}
    </div>
  );
}
