import { AppContent, AppHeader, AppPage } from "@/components/app-chrome";
import { CardPadding } from "@/components/card";
import { Title } from "@/components/typography/title";
import { Surface } from "@workspace/ui/components/surface";

const semanticVariants = [
  "default",
  "primary",
  "secondary",
  "muted",
  "accent",
  "card",
  "popover",
  "sidebar",
] as const;

const decorativeVariants = ["glass", "pattern"] as const;

function SurfaceSwatch({
  variant,
}: {
  variant:
    | (typeof semanticVariants)[number]
    | (typeof decorativeVariants)[number];
}) {
  return (
    <Surface
      variant={variant}
      className="flex min-h-36 flex-col justify-between gap-4 p-6"
    >
      <p className="font-poppins text-sm font-bold">{variant}</p>
    </Surface>
  );
}

export default function Surfaces() {
  return (
    <AppPage>
      <AppHeader>
        <h1>Surfaces</h1>
      </AppHeader>
      <AppContent>
        <section className="py-8">
          <Title asChild className="mb-8">
            <h2>Semantic Surfaces</h2>
          </Title>
          <Surface variant="card" className="w-fit">
            <CardPadding>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {semanticVariants.map((variant) => (
                  <SurfaceSwatch key={variant} variant={variant} />
                ))}
              </div>
            </CardPadding>
          </Surface>

          <CardPadding className="w-fit">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {semanticVariants.map((variant) => (
                <SurfaceSwatch key={variant} variant={variant} />
              ))}
            </div>
          </CardPadding>
        </section>

        <section className="py-8">
          <Title asChild className="mb-8">
            <h2>Decorative Surfaces</h2>
          </Title>
          <div className="grid gap-4 sm:grid-cols-2">
            {decorativeVariants.map((variant) => (
              <SurfaceSwatch key={variant} variant={variant} />
            ))}
          </div>
        </section>
      </AppContent>
    </AppPage>
  );
}
