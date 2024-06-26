import { FontSchemeGenSection } from "@/components/font-scheme";
import { MainLayout } from "@/components/layout";

export default function CraftFontSchemePage() {
  return (
    <MainLayout>
      <main className="container pt-4 animate-in fade-in-0 duration-300 ease-out slide-in-from-bottom-8">
        <FontSchemeGenSection className="mb-24" />
      </main>
    </MainLayout>
  );
}
