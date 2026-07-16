import { CardPadding } from "@/components/card";
import { Surface } from "@workspace/ui/components/surface";
import { Title } from "@/components/typography/title";
import { PropsWithChildren } from "react";

export function ComponentSection(props: PropsWithChildren<{ title: string }>) {
  return (
    <div className="py-24">
      <Title asChild className="mb-8">
        <h2>{props.title}</h2>
      </Title>
      <Surface variant="card" className="w-fit">
        <CardPadding>{props.children}</CardPadding>
      </Surface>
    </div>
  );
}
