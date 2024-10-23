import { MOFontScheme } from "@/lib/msoffice/schemes/mo-font-scheme";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { t } from "i18next";
import { toast } from "sonner";
import { $FormFontScheme } from "../common";
import { parseFontSchemeForm, useFontSchemeForm } from "../hooks/use-font-scheme-form";
import { FontSchemeForm } from "./font-scheme-form";
import FontSchemePreview from "./font-scheme-preview";
import { cn } from "@/lib/utils";

// Preview show/hidden anim
const animatePreview = {
  shown: {
    opacity: 1,
    scale: 1,
    transition: {
      ease: "easeOut",
      duration: 0.2,
    },
  },
  hidden: {
    opacity: 0,
    scale: 0.92,
    transition: {
      ease: "easeIn",
      duration: 0.2,
    },
  },
} satisfies Variants;

interface FontSchemeFormSectionProps {
  showPreview?: boolean;
  onSchemeGenerated(name: string, scheme: MOFontScheme): void;
}

export function FontSchemeFormSection({ showPreview = false, onSchemeGenerated }: FontSchemeFormSectionProps) {
  const form = useFontSchemeForm();

  const handleSubmit = (data: $FormFontScheme) => {
    // async
    const { name, scheme } = parseFontSchemeForm(data);
    onSchemeGenerated(name, scheme);
    toast.success(t("craft_font.msg_successfully_created"));
  };

  return (
    <div className="flex flex-col lg:flex-row flex-wrap">
      <motion.div
        className={cn("flex-1 w-full max-w-screen-sm mx-auto z-10", !showPreview && "flex-grow-[2]")}
        layout="position"
      >
        <motion.div>
          <FontSchemeForm form={form} onSubmit={handleSubmit} />
        </motion.div>
      </motion.div>

      <AnimatePresence initial={false}>
        {showPreview ? (
          <motion.div
            className="flex-1 pt-4 pl-0 md:pt-0 md:pl-4"
            variants={animatePreview}
            initial="hidden"
            animate="shown"
            exit="hidden"
          >
            <FontSchemePreview form={form} />
          </motion.div>
        ) : (
          <div />
        )}
      </AnimatePresence>
    </div>
  );
}
