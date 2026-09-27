import { Introduction } from './components/introduction';
import { RecruiterLink } from './components/recruiter-link';
import { HeroCanvas } from './hero-canvas';

export function Home({ introduction }: { introduction: string }) {
  return (
    <>
      <HeroCanvas />
      <Introduction source={introduction} />
      <RecruiterLink />
    </>
  );
}
