/** MajorFont, MinorFont와 같은 FontCollection에 대한 폼 */

import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { supplementalFontScripts } from "@/lib/msoffice/schemes/lang-scripts";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { ControllerRenderProps, FieldArrayPath, useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { $FormFontScheme } from "../common";
import FontSelect from "./font-select";

function CollectionKeySelect({
  field,
}: {
  field: ControllerRenderProps<$FormFontScheme, `${"majorFont" | "minorFont"}.${number}.key`>;
}) {
  const { t } = useTranslation();
  const { t: iso15924t } = useTranslation("iso15924");

  return (
    <FormItem className="w-[192px]">
      <FormControl>
        <Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger className="border-none">
            <SelectValue placeholder={t("craft_font.placeholder_script")} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="border-t">
              <SelectLabel className="text-muted-foreground">
                <div>보충</div>
                <p className="text-xs font-normal">더 좁은 범위, 특정 문자 체계별로 지정해요.</p>
              </SelectLabel>
              {supplementalFontScripts.map((value) => (
                <SelectItem key={value} value={value}>
                  {iso15924t(value)} <code className="text-xs bg-muted text-muted-foreground">{value}</code>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

function CollectionTypefaceInput({
  field,
}: {
  field: ControllerRenderProps<$FormFontScheme, `${"majorFont" | "minorFont"}.${number}.typeface`>;
}) {
  return (
    <FormItem className="flex-1">
      <FormControl>
        <FontSelect value={field.value} onChange={field.onChange} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

interface FontCollectionFieldsProps<
  TFieldValues extends $FormFontScheme = $FormFontScheme,
  TFieldArrayName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>
> {
  title: string;
  fieldName: TFieldArrayName;
}

export default function FontCollectionFields({ title, fieldName }: FontCollectionFieldsProps) {
  const { t } = useTranslation();
  const { t: iso15924t } = useTranslation("iso15924");

  const { getValues, control } = useFormContext<$FormFontScheme>();
  const fieldArray = useFieldArray({ control, name: fieldName });

  const handleDeleteField = (index: number) => {
    const fields = getValues()[fieldName];
    const removed = { ...fields[index] };

    fieldArray.remove(index);

    const undo = () => void fieldArray.insert(index, { key: removed.key, typeface: removed.typeface });

    toast.warning(t("craft_font.msg_following_rule_removed"), {
      description: t("craft_font.msg_following_rule_description", {
        script: removed.key || t("craft_font.msg_following_rule_empty_script"),
        font: removed.typeface || t("craft_font.msg_following_rule_empty_font"),
      }),
      action: {
        label: t("common.action_undo"),
        onClick: undo,
      },
    });
  };

  return (
    <div className="space-y-2">
      <FormLabel>{title}</FormLabel>
      <div className="w-full border rounded divide-y">
        {fieldArray.fields.map((collectionField, index) => {
          const isMandatory = index < 3; // 0 1 2

          return (
            <div key={collectionField.id} className="flex flex-row gap-2 p-2">
              {/* Mandatory */}
              {isMandatory && (
                <div className="w-[192px] h-10 px-3 py-2 flex flex-row justify-start items-center text-sm">
                  {iso15924t(collectionField.key)}
                  <code className="ml-2 text-xs bg-muted text-muted-foreground">{collectionField.key}</code>
                </div>
              )}
              {/* Supplemental */}
              {!isMandatory && (
                <FormField control={control} name={`${fieldName}.${index}.key`} render={CollectionKeySelect} />
              )}

              {/* Fontface Input */}
              <FormField control={control} name={`${fieldName}.${index}.typeface`} render={CollectionTypefaceInput} />

              {/* Action - Delete */}
              <Button
                type="button"
                aria-label="규칙 삭제"
                size="icon"
                variant="ghost"
                disabled={isMandatory} // 필수 태그들은 지울 수 없어야 함
                onClick={isMandatory ? undefined : () => void handleDeleteField(index)}
              >
                <Trash2Icon className="size-4" />
              </Button>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-center">
        <Button type="button" variant="ghost" onClick={() => void fieldArray.append({ key: "", typeface: "" })}>
          <PlusIcon className="size-4 mr-2" />
          {t("craft_font.add_new_font_rule")}
        </Button>
      </div>
    </div>
  );
}
