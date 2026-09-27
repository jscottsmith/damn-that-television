import { getHomepage } from '../../lib/content/read';
import { Home } from 'app/(main)/home';

export default function Page() {
  const homepage = getHomepage();
  return <Home introduction={homepage.body} />;
}
