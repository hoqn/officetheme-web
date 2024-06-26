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
import { tMandatoryFontTypes, tSupplementalFontScripts } from "@/lib/i18n/ko/lang-scripts.i18n";
import { AnimatePresence } from "framer-motion";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { Control, FieldArrayPath, UseFieldArrayReturn } from "react-hook-form";
import { $FormFontScheme } from "./common";
import FontSelect from "./font-select";

interface FontCollectionFieldsProps<
  TFieldValues extends $FormFontScheme,
  TFieldArrayName extends FieldArrayPath<TFieldValues>
> extends UseFieldArrayReturn<TFieldValues, TFieldArrayName> {
  title: string;
  fieldName: TFieldArrayName;
  onDeleteField(index: number): void;
  control: Control<TFieldValues>;
}

export default function FontCollectionFields({
  title,
  fieldName,
  onDeleteField,
  control,
  // extends UseFieldArrayReturn
  fields,
  append,
}: FontCollectionFieldsProps<$FormFontScheme, "majorFont"> | FontCollectionFieldsProps<$FormFontScheme, "minorFont">) {
  return (
    <div className="space-y-2">
      <FormLabel>{title}</FormLabel>
      <div className="w-full border rounded divide-y">
        <AnimatePresence mode="popLayout" initial={false}>
          {fields.map((collectionField, index) => {
            const isMandatory = index < 3; // 0 1 2

            return (
              <div key={collectionField.id} className="flex flex-row gap-2 p-2">
                {/* Mandatory */}
                {isMandatory && (
                  <div className="w-[192px] h-10 px-3 py-2 flex flex-row justify-start items-center text-sm">
                    {tMandatoryFontTypes[collectionField.key as "latin"]}
                    <code className="ml-2 text-xs bg-muted text-muted-foreground">{collectionField.key}</code>
                  </div>
                )}

                {/* Supplemental */}
                {!isMandatory && (
                  <FormField
                    control={control}
                    name={`${fieldName}.${index}.key`}
                    render={({ field }) => (
                      <FormItem className="w-[192px]">
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="border-none">
                              <SelectValue placeholder="문자 집합..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup className="border-t">
                                <SelectLabel className="text-muted-foreground">
                                  <div>보충</div>
                                  <p className="text-xs font-normal">더 좁은 범위, 특정 문자 체계별로 지정해요.</p>
                                </SelectLabel>
                                {Object.entries(tSupplementalFontScripts).map(([value, label]) => (
                                  <SelectItem key={value} value={value}>
                                    {label} <code className="text-xs bg-muted text-muted-foreground">{value}</code>
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={control}
                  key={collectionField.id}
                  name={`${fieldName}.${index}.typeface` as any}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <FontSelect value={field.value} onChange={(value) => void field.onChange(value)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {isMandatory && <div className="size-10" />}
                {!isMandatory && (
                  <Button
                    type="button"
                    aria-label="규칙 삭제"
                    size="icon"
                    variant="ghost"
                    disabled={isMandatory} // 필수 태그들은 지울 수 없어야 함
                    onClick={() => void onDeleteField(index)}
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                )}
              </div>
            );
          })}
        </AnimatePresence>
      </div>
      <div className="flex justify-center items-center">
        <Button type="button" variant="ghost" onClick={() => void append({ key: "", typeface: "" })}>
          <PlusIcon className="size-4 mr-2" />
          새로운 규칙 넣기
        </Button>
      </div>
    </div>
  );
}
