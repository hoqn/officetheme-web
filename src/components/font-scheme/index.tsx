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
  Label,
  Separator,
  Switch,
} from "@/components/ui";
import {
  MOComplexScriptFont,
  MOEastAsianFont,
  MOFontScheme,
  MOLatinFont,
  MOMajorFont,
  MOMinorFont,
  MOSupplementalFont,
} from "@/lib/msoffice/schemes/mo-font-scheme";
import { cn, usePersistentState } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Variants, motion } from "framer-motion";
import { Loader2Icon } from "lucide-react";
import { useCallback, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { $FormFontCollection, $FormFontScheme } from "./common";
import FontCollectionFields from "./font-collection-fields";
import FontSchemePreview from "./font-scheme-preview";
import { LocalFontsProvider } from "./local-fonts-provider";
import FontSchemeXmlView from "./xml-view";

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
    }
};

export function FontSchemeGenSection({ className }: { className?: string }) {
  const { t } = useTranslation();

  const [result, setResult] = useState<{ name: string; xml: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<$FormFontScheme>({
    resolver: zodResolver($FormFontScheme),
    mode: "onBlur",
    defaultValues: {
      fontSchemeName: "",
      majorFont: $FormFontCollection.parse(undefined),
      minorFont: $FormFontCollection.parse(undefined),
    },
  });

  const formMajorFont = useFieldArray({ control: form.control, name: "majorFont" });
  const formMinorFont = useFieldArray({ control: form.control, name: "minorFont" });

  const handleOnSubmit = useCallback(
    form.handleSubmit(async (data) => {
      setLoading(true);

      return new Promise<void>((resolve) => {
        const scheme = new MOFontScheme(data.fontSchemeName);

        const getMappedFontCollection = (collection: Record<"key" | "typeface", string>[]) => {
          return collection.map(({ key, typeface }) => {
            switch (key) {
              case "latin":
                return new MOLatinFont({ typeface });
              case "ea":
                return new MOEastAsianFont({ typeface });
              case "cs":
                return new MOComplexScriptFont({ typeface });
              default: // 나머지는 supplement font (<font script={...} />)
                return new MOSupplementalFont({ script: key, typeface });
            }
          });
        };

        const majorFontScheme = new MOMajorFont();
        majorFontScheme.appendChild(...getMappedFontCollection(data.majorFont));

        const minorFontScheme = new MOMinorFont();
        minorFontScheme.appendChild(...getMappedFontCollection(data.minorFont));

        scheme.appendChild(majorFontScheme, minorFontScheme);

        setResult({ name: data.fontSchemeName, xml: scheme.toXmlString() });

        resolve();
      })
        .then(() => {
          toast.success(t("craft_font.msg_successfully_created"));
        })
        .finally(() => {
          setLoading(false);
        });
    }),
    [form.handleSubmit]
  );

  const handleOnDeleteFontCollectionField = useCallback((ns: "majorFont" | "minorFont", index: number) => {
    const removedIndex = index;
    const removedField = form.getValues(`${ns}.${index}`);

    const target = ns === "majorFont" ? formMajorFont : formMinorFont;

    target.remove(removedIndex);

    toast.warning(t("craft_font.msg_following_rule_removed"), {
      description: t("craft_font.msg_following_rule_description", {
        script: removedField.key || t("craft_font.msg_following_rule_empty_script"),
        font: removedField.typeface || t("craft_font.msg_following_rule_empty_font"),
      }),
      action: {
        label: t("common.action_undo"),
        onClick: () => void target.insert(removedIndex, removedField),
      },
    });
  }, []);

  const handleOnDeleteMajorFontField = handleOnDeleteFontCollectionField.bind(null, "majorFont");
  const handleOnDeleteMinorFontField = handleOnDeleteFontCollectionField.bind(null, "minorFont");

  const [showPreview, setShowPreview] = usePersistentState(true, "show-preview");

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
        <Card className="flex-1 max-w-screen-sm mx-auto">
          <Form {...form}>
            {/* <form onSubmit={handleOnSubmit}> */}
            <form onSubmit={handleOnSubmit}>
              <CardHeader>
                <CardTitle>{t("craft_font.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="fontSchemeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("craft_font.label_schema_name")}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <LocalFontsProvider>
                    <FontCollectionFields
                      title={t("craft_font.label_major_font")}
                      control={form.control}
                      fieldName="majorFont"
                      onDeleteField={handleOnDeleteMajorFontField}
                      {...formMajorFont}
                    />
                    <FontCollectionFields
                      title={t("craft_font.label_minor_font")}
                      control={form.control}
                      fieldName="minorFont"
                      onDeleteField={handleOnDeleteMinorFontField}
                      {...formMinorFont}
                    />
                  </LocalFontsProvider>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading} aria-disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2Icon className="animate-spin size-4 mr-2" />
                      꾸리는 중...
                    </>
                  ) : (
                    t("craft_font.action_craft")
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
        {/* {showPreview && ( */}
        {
          <motion.div
            className="flex-1 pt-4 pl-0 md:pt-0 md:pl-4"
            initial={false}
            variants={animatePreview}
            animate={showPreview ? "shown" : "hidden"}
          >
            <FontSchemePreview majorFont={form.watch("majorFont")} minorFont={form.watch("minorFont")} />
          </motion.div>
        }
      </div>
      <Separator orientation="horizontal" className="my-4" />
      {/* Result */}
      <Card className="p-4 border rounded-md">
        {result ? (
          <FontSchemeXmlView name={result.name} xml={result.xml} />
        ) : (
          <span className="text-sm opacity-50">{t("craft_font.request_for_action_craft")}</span>
        )}
      </Card>
    </section>
  );
}
