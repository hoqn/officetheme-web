import { Card, Label, Separator, Switch } from "@/components/ui";
import { MOFontScheme } from "@/lib/msoffice/schemes/mo-font-scheme";
import { cn, usePersistentState } from "@/lib/utils";
import { Variants, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontSchemeFormSection } from "./form-section";
import FontSchemeXmlView from "./xml-view";
import { LocalFontsProvider } from "./local-fonts-provider";
import FontSchemePreview from "./font-scheme-preview";

// Preview show/hidden anim
const animatePreview: Variants = {
  shown: {
    display: "",
    opacity: [0, 0, 1],
    flexGrow: [0, 1, 1],
    scale: [0.96, 0.96, 1],
    transition: {
      duration: 0.4,
    },
  },
  hidden: {
    opacity: [1, 0, 0],
    flexGrow: [1, 1, 0],
    scale: [1, 0.96, 0.96],
    transitionEnd: {
      display: "none",
    },
    transition: {
      duration: 0.4,
    },
  },
};

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
      <div className="flex flex-col md:flex-row flex-wrap bg-muted/40 -my-4 p-4 rounded-lg">
        <LocalFontsProvider>
          <FontSchemeFormSection onSchemeGenerated={(name, scheme) => void setFontScheme({ name, scheme })} />
        </LocalFontsProvider>
        <motion.div
          className="flex-1 pt-4 pl-0 md:pt-0 md:pl-4"
          initial={false}
          variants={animatePreview}
          animate={showPreview ? "shown" : "hidden"}
        >
          {fontScheme && <FontSchemePreview scheme={fontScheme.scheme} />}
        </motion.div>
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
