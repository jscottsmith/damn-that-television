import { AppContent, AppHeader, AppPage } from '@/components/app-chrome';

const sections = [
  [
    ['pepto', 'bg-pepto'],
    ['pepto-600', 'bg-pepto-600'],
  ],
  [['lunar', 'bg-lunar']],
  [['lit', 'bg-lit']],
  [
    ['miami', 'bg-miami'],
    ['miami-700', 'bg-miami-700'],
    ['miami-old', 'bg-miami-old'],
  ],
  [
    ['club', 'bg-club'],
    ['club-600', 'bg-club-600'],
    ['club-700', 'bg-club-700'],
    ['club-800', 'bg-club-800'],
  ],
  [
    ['cream', 'bg-cream'],
    ['cream-400', 'bg-cream-400'],
  ],
  [['ghost', 'bg-ghost']],
  [['fab', 'bg-fab']],
  [
    ['soft-pink', 'bg-soft-pink'],
    ['soft-pink-400', 'bg-soft-pink-400'],
    ['softy', 'bg-softy'],
  ],
  [['plum', 'bg-plum']],
  [['salmon-800', 'bg-salmon-800']],
  [
    ['peach', 'bg-peach'],
    ['deep', 'bg-deep'],
  ],
];

function ColorSwatch(props: { color: string; name: string }) {
  return (
    <div className="inline-flex flex-col items-center">
      <div className={'h-36 w-36 ' + props.color} />
      <p className="font-poppins text-xs font-bold dark:text-white">
        {props.name}
      </p>
    </div>
  );
}

export default function Colors() {
  return (
    <AppPage>
      <AppHeader>
        <h1>Colors</h1>
      </AppHeader>
      <AppContent>
        {sections.map((colors, i) => {
          return (
            <section key={i}>
              {colors.map((entry, i) => {
                return <ColorSwatch key={i} color={entry[1]} name={entry[0]} />;
              })}
            </section>
          );
        })}
      </AppContent>
    </AppPage>
  );
}
