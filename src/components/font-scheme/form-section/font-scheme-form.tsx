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
import { t } from "i18next";
import { Loader2Icon } from "lucide-react";
import { ControllerRenderProps, SubmitHandler, UseFormReturn } from "react-hook-form";
import { $FormFontScheme } from "../common";
import FontCollectionFields from "./font-collection-fields";

function FontSchemeNameInput({ field }: { field: ControllerRenderProps<$FormFontScheme, "fontSchemeName"> }) {
  return (
    <FormItem>
      <FormLabel>{t("craft_font.label_schema_name")}</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

export function FontSchemeForm({
  form,
  onSubmit,
}: {
  form: UseFormReturn<$FormFontScheme>;
  onSubmit: SubmitHandler<$FormFontScheme>;
}) {
  const isSubmitting = form.formState.isSubmitting;

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
