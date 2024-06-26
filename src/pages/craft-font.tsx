import { FontSchemeGenSection } from "@/components/font-scheme";
import { MainLayout } from "@/components/layout";

export default function CraftFontSchemePage() {
  return (
    <MainLayout>
      <main className="container pt-4">
        <FontSchemeGenSection className="mb-24" />
      </main>
    </MainLayout>
  );
}
