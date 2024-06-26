import { describe, expect, test } from "vitest";
import { MOEastAsianFont, MOFontScheme, MOLatinFont, MOMajorFont, MOSupplementalFont } from "./mo-font-scheme";

describe("FontScheme을 XML string으로 변환", () => {
  test("", () => {
    const element = new MOFontScheme("my-font-scheme");

    const majorFont = new MOMajorFont();
    majorFont.childElements.push(
      new MOLatinFont({ typeface: "Noto Sans" }),
      new MOEastAsianFont({ typeface: "Noto Sans KR" }),
      new MOSupplementalFont({ script: "Jpan", typeface: "Noto Sans JP" })
    );

    element.appendChild(majorFont);

    expect(element.toXmlString()).toBe(
      '<a:fontScheme name="my-font-scheme">' +
        '<a:majorFont >' +
          '<a:latin typeface="Noto Sans"/>' +
          '<a:ea typeface="Noto Sans KR"/>' +
          '<a:font script="Jpan" typeface="Noto Sans JP"/>' +
        '</a:majorFont>' +
      '</a:fontScheme>'
    );
  });
});
