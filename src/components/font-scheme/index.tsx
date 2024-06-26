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
import {
  MOComplexScriptFont,
  MOEastAsianFont,
  MOFontScheme,
  MOLatinFont,
  MOMajorFont,
  MOMinorFont,
  MOSupplementalFont,
} from "@/lib/msoffice/schemes/mo-font-scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useCallback, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { $FormFontCollection, $FormFontScheme } from "./common";
import FontCollectionFields from "./font-collection-fields";
import { LocalFontsProvider } from "./local-fonts-provider";
import FontSchemeXmlView from "./xml-view";

export function FontSchemeGenSection({ className }: { className?: string }) {
  const [result, setResult] = useState<{ name: string; xml: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<$FormFontScheme>({
    resolver: zodResolver($FormFontScheme),
    mode: "onSubmit",
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
          toast.success("생성되었어요!");
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

    toast.warning("다음 규칙이 지워졌어요.", {
      description: `${removedField.key || "(정해 지지 않은 문자)"}일 때 ${
        removedField.typeface || "(아직 정해지지 않은 글꼴)"
      } 쓰임`,
      action: {
        label: "되돌리기",
        onClick: () => void target.insert(removedIndex, removedField),
      },
    });
  }, []);

  const handleOnDeleteMajorFontField = handleOnDeleteFontCollectionField.bind(null, "majorFont");
  const handleOnDeleteMinorFontField = handleOnDeleteFontCollectionField.bind(null, "minorFont");

  return (
    <section className={className}>
      <Card className="max-w-screen-sm mx-auto">
        <Form {...form}>
          {/* <form onSubmit={handleOnSubmit}> */}
          <form onSubmit={handleOnSubmit}>
            <CardHeader>
              <CardTitle>새로운 글꼴 테마 꾸리기</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="fontSchemeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>글꼴 스키마 이름</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <LocalFontsProvider>
                  <FontCollectionFields
                    title="제목 글꼴"
                    control={form.control}
                    fieldName="majorFont"
                    onDeleteField={handleOnDeleteMajorFontField}
                    {...formMajorFont}
                  />
                  <FontCollectionFields
                    title="본문 글꼴"
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
                  "꾸리기"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      {/* Result */}
      <div className="mt-6 p-4 border rounded-md">
        {result ? (
          <FontSchemeXmlView name={result.name} xml={result.xml} />
        ) : (
          <span className="text-sm opacity-50">꾸리기 버튼을 눌러주세요</span>
        )}
      </div>
    </section>
  );
}
