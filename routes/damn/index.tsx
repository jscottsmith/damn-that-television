import { HeaderNav } from '../components/header-nav';
import { AppGame } from './components/app-game';

export function DamnRoute() {
  return (
    <>
      <HeaderNav />
      <div className="h-screen w-screen bg-lunar">
        <AppGame />
      </div>
      <div className="h-screen w-screen bg-deep" />
    </>
  );
}
