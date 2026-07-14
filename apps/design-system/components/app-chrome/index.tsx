"use client";

import { PropsWithChildren, useEffect } from "react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "@workspace/ui/components/sidebar";
import { EyeMan } from "@workspace/ui/components/eye-button";
import { ThemeToggle } from "@workspace/ui/components/theme-toggle";

import { AppChromeRoutes } from "./types";

import { HomeIcon } from "@heroicons/react/16/solid";

export const APP_CHROME_SIDEBAR_ID = "app-chrome-sidebar";

type AppChromeProps = PropsWithChildren<{
  routes: AppChromeRoutes;
}>;

function AppChromeLayout({ routes, children }: AppChromeProps) {
  const { setOpen, isMobile } = useSidebar();

  useEffect(() => {
    if (!isMobile) {
      setOpen(true);
    }
  }, [isMobile]); /* oxlint-disable-line react-hooks/exhaustive-deps */

  return (
    <>
      <Sidebar id={APP_CHROME_SIDEBAR_ID} side="left" collapsible="icon">
        <SidebarHeader>
          <Link href="/" className="block group/eye-man">
            <span
              className="block size-8 shrink-0 [&_svg]:size-full"
              aria-hidden
            >
              <EyeMan />
            </span>
          </Link>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="group/eye-man"
                render={<Link href="/" />}
              >
                <HomeIcon className="size-4" /> Home
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <nav>
                <SidebarMenu>
                  {Object.values(routes).flatMap((route) =>
                    route.children
                      ? Object.entries(route.children).map(
                          ([childPath, childRoute]) => (
                            <SidebarMenuItem key={childPath}>
                              <SidebarMenuButton
                                render={<Link href={childRoute.absolutePath} />}
                              >
                                {childRoute.title}
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          )
                        )
                      : []
                  )}
                </SidebarMenu>
              </nav>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="items-start">
          <ThemeToggle />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </>
  );
}

export function AppChrome(props: AppChromeProps) {
  return (
    <SidebarProvider defaultOpen>
      <AppChromeLayout {...props} />
    </SidebarProvider>
  );
}
