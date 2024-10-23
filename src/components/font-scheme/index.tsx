import { Card, Label, Separator, Switch } from "@/components/ui";
import { MOFontScheme } from "@/lib/msoffice/schemes/mo-font-scheme";
import { cn, usePersistentState } from "@/lib/utils";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontSchemeFormSection } from "./form-section";
import { LocalFontsProvider } from "./local-fonts-provider";
import FontSchemeXmlView from "./xml-view";

export function FontSchemeGenSection({ className }: { className?: string }) {
  const { t } = useTranslation();

  const [showPreview, setShowPreview] = usePersistentState(true, "show-preview");

  const [fontScheme, setFontScheme] = useState<{ name: string; scheme: MOFontScheme }>();
  const fontSchemeXml = useMemo(() => fontScheme?.scheme.toXmlString(), [fontScheme?.scheme]);

  return (
    <section className={cn("-mx-8", className)}>
      <div className="p-4 text-right border-b mb-4">
        <span className="inline-flex flex-row items-center gap-2">
          <Switch id="toggle_preview" onCheckedChange={setShowPreview} checked={showPreview} />
          <Label htmlFor="toggle_preview" className="leading-6">
            {showPreview ? t("craft_font.label_preview_on") : t("craft_font.label_preview_off")}
          </Label>
        </span>
      </div>
      {/* Form */}
      <div className="bg-muted/40 -my-4 p-4 rounded-lg">
        <LocalFontsProvider>
          <FontSchemeFormSection
            showPreview={showPreview}
            onSchemeGenerated={(name, scheme) => void setFontScheme({ name, scheme })}
          />
        </LocalFontsProvider>
      </div>
      <Separator orientation="horizontal" className="my-4" />
      {/* Result */}
      <Card className="p-4 border rounded-md">
        {fontScheme && fontSchemeXml ? (
          <FontSchemeXmlView name={fontScheme.name} xml={fontSchemeXml} />
        ) : (
          <span className="text-sm opacity-50">{t("craft_font.request_for_action_craft")}</span>
        )}
      </Card>
    </section>
  );
}
