import { PropsWithChildren } from "react";

import { AppHeader } from "@/components/app-header";
import { SiteWrapper } from "@/components/site-wrapper";

export function AppPage({ children }: PropsWithChildren) {
  return (
    <SiteWrapper className="min-h-screen" padY>
      <AppHeader />
      {children}
    </SiteWrapper>
  );
}
