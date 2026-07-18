import { type PropsWithChildren } from "react";

export function AppPage({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-full flex-col" data-slot="app-page">
      {children}
    </div>
  );
}
