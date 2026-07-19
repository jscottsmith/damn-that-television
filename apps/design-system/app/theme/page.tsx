import { AppContent, AppHeader, AppPage } from "@/components/app-chrome";

const colorGroups = [
  ["background", "foreground"],
  ["card", "card-foreground"],
  ["popover", "popover-foreground"],
  ["primary", "primary-foreground"],
  ["secondary", "secondary-foreground"],
  ["muted", "muted-foreground"],
  ["accent", "accent-foreground"],
  ["destructive"],
  ["border"],
  ["input"],
  ["ring"],
  ["sidebar", "sidebar-foreground"],
  ["sidebar-primary", "sidebar-primary-foreground"],
  ["sidebar-accent", "sidebar-accent-foreground"],
  ["sidebar-border"],
  ["sidebar-ring"],
] as const;

export default function Theme() {
  return (
    <AppPage>
      <AppHeader>
        <h1>Theme</h1>
      </AppHeader>
      <AppContent>
        <section className="flex max-w-md flex-col gap-4 py-8">
          {colorGroups.map((group) => (
            <div key={group.join("/")} className="flex flex-col gap-1.5">
              <div className="flex overflow-hidden rounded-md">
                {group.map((color) => (
                  <div
                    key={color}
                    className="h-12 min-w-0 flex-1"
                    style={{ backgroundColor: `var(--${color})` }}
                    title={color}
                  />
                ))}
              </div>
              <div className="flex">
                {group.map((color) => (
                  <p
                    key={color}
                    className="min-w-0 flex-1 font-poppins text-xs font-medium text-muted-foreground"
                  >
                    {color}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </section>
      </AppContent>
    </AppPage>
  );
}
