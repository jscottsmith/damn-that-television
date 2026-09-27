import EmbedBlock from '@/components/embed-block';
import { SectionSpacing } from '@/components/section-spacing';

export function Embed({ html }: { html: string | null }) {
  return (
    <SectionSpacing asChild>
      <section data-content-block="embed">
        <EmbedBlock html={html} />
      </section>
    </SectionSpacing>
  );
}
