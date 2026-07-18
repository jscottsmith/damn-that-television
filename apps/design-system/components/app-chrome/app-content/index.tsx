import { type PropsWithChildren } from "react";

export function AppContent({ children }: PropsWithChildren) {
  return (
    <div className="flex-1 px-3" data-slot="app-content">
      {children}
    </div>
  );
}
