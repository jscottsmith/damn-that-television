import { HeroTitle } from '@/components/typography/hero-title';
import { Prose } from '@/components/typography/prose';

export default function Page() {
  return (
    <div className="gap-lg flex max-w-3xl flex-col">
      <HeroTitle asChild>
        <h1>Design System</h1>
      </HeroTitle>
      <Prose>
        <p>
          Shared foundations, components, and interaction examples for Damn that
          television.
        </p>
      </Prose>
    </div>
  );
}
