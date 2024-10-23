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
import { useForm } from "react-hook-form";
import { $FormFontCollection, $FormFontScheme } from "../common";

function parseFontCollection(collection: Record<"key" | "typeface", string>[]) {
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
}

export function parseFontSchemeForm(data: $FormFontScheme) {
  const schemeName = data.fontSchemeName;

  const scheme = new MOFontScheme(schemeName);

  const majorFont = new MOMajorFont();
  const minorFont = new MOMinorFont();

  majorFont.appendChild(...parseFontCollection(data.majorFont));
  minorFont.appendChild(...parseFontCollection(data.minorFont));
  scheme.appendChild(majorFont, minorFont);

  return { name: schemeName, scheme };
}

export function useFontSchemeForm() {
  const form = useForm<$FormFontScheme>({
    resolver: zodResolver($FormFontScheme),
    mode: "onBlur",
    defaultValues: {
      fontSchemeName: "",
      majorFont: $FormFontCollection.parse(undefined),
      minorFont: $FormFontCollection.parse(undefined),
    },
  });

  return form;
}
