import { z } from "zod";

// Font Scheme 섹션에서 사용하는 공통 모듈

// Zod Schema
export const $FormFont = z.object({ key: z.string(), typeface: z.string() });
export const $FormFontCollection = z.array($FormFont).default([
  { key: "latin", typeface: "" },
  { key: "ea", typeface: "" },
  { key: "cs", typeface: "" },
]);
export const $FormFontScheme = z.object({
  fontSchemeName: z.string().min(1, "반드시 입력해주셔야 해요!").default(""),

  // latin, ea, cs는 필수
  // font script= 는 선택
  majorFont: $FormFontCollection,
  minorFont: $FormFontCollection,
});

export type $FormFont = z.infer<typeof $FormFont>;
export type $FormFontCollection = z.infer<typeof $FormFontCollection>;
export type $FormFontScheme = z.infer<typeof $FormFontScheme>;
