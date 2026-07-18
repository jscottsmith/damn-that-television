import { AppContent, AppHeader, AppPage } from '@/components/app-chrome';
import { Prose } from '@/components/typography/prose';

export default function Page() {
  return (
    <AppPage>
      <AppHeader>
        <h1>Design System</h1>
      </AppHeader>
      <AppContent>
        <div className="gap-6 flex max-w-3xl flex-col">
          <Prose>
            <p>
              Shared foundations, components, and interaction examples for Damn that
              television.
            </p>
          </Prose>
        </div>
      </AppContent>
    </AppPage>
  );
}
