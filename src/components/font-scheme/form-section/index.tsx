import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import { MOFontScheme } from "@/lib/msoffice/schemes/mo-font-scheme";
import { t } from "i18next";
import { Loader2Icon } from "lucide-react";
import { ControllerRenderProps } from "react-hook-form";
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
  onSchemeGenerated(name: string, scheme: MOFontScheme): void;
}

export function FontSchemeFormSection({ onSchemeGenerated }: FontSchemeFormSectionProps) {
  const form = useFontSchemeForm();
  const isSubmitting = form.formState.isSubmitting;

  const handleSubmit = (data: $FormFontScheme) => {
    // async
    const { name, scheme } = parseFontSchemeForm(data);
    onSchemeGenerated(name, scheme);
    toast.success(t("craft_font.msg_successfully_created"));
  };

  return (
    <Card className="flex-1 max-w-screen-sm mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardHeader>
            <CardTitle>{t("craft_font.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <FormField control={form.control} name="fontSchemeName" render={FontSchemeNameInput} />
              <FontCollectionFields title={t("craft_font.label_major_font")} fieldName="majorFont" />
              <FontCollectionFields title={t("craft_font.label_minor_font")} fieldName="minorFont" />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting} aria-disabled={isSubmitting}>
              {isSubmitting && <Loader2Icon className="animate-spin mr-2" />}
              {t("craft_font.action_craft")}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
