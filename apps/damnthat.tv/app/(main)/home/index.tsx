import { Introduction } from './components/introduction';
import { RecruiterLink } from './components/recruiter-link';
import { HeroCanvas } from './hero-canvas';

export function Home(props) {
  return (
    <>
      <HeroCanvas />
      <Introduction document={props.document} />
      <RecruiterLink />
    </>
  );
}
