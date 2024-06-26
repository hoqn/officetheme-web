/**
 * MS Office FontScheme XML 포맷 타입
 * @author Hogyun Jeon
 */

import { OpenXmlCompositeElement, OpenXmlLeafElement } from "./openxml";

export class MOTextFontType extends OpenXmlLeafElement {
  declare attributes: {
    charset?: string; // CharacterSet
    panose?: string; // Panose
    pitchFamily?: string; // PitchFamily
    typeface?: string; // Typeface
  };

  constructor(localName: string, attributes: MOTextFontType["attributes"]) {
    super(localName);
    this.attributes = {
      ...this.attributes,
      ...attributes,
    };
  }
}

// https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.supplementalfont?view=openxml-3.0.1
export class MOSupplementalFont extends OpenXmlLeafElement {
  declare attributes: {
    script?: string;
    typeface?: string;
  };

  constructor(attributes: MOSupplementalFont["attributes"]) {
    super("font");
    this.attributes = {
      ...this.attributes,
      ...attributes,
    };
  }
}

export class MOComplexScriptFont extends MOTextFontType {
  declare localName: "cs";

  constructor(attributes: MOTextFontType["attributes"]) {
    super("cs", attributes);
  }
}

export class MOEastAsianFont extends MOTextFontType {
  declare localName: "ea";

  constructor(attributes: MOTextFontType["attributes"]) {
    super("ea", attributes);
  }
}

export class MOLatinFont extends MOTextFontType {
  declare localName: "latin";

  constructor(attributes: MOTextFontType["attributes"]) {
    super("latin", attributes);
  }
}

// https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.fontcollectiontype?view=openxml-3.0.1
/**
 * The following table lists the possible child types:
 * LatinFont <a:latin>
 * EastAsianFont <a:ea>
 * ComplexScriptFont <a:cs>
 * SupplementalFont <a:font>
 * ExtensionList <a:extLst>
 */
export class MOFontCollectionType extends OpenXmlCompositeElement {
  declare childElements: (MOComplexScriptFont | MOEastAsianFont | MOLatinFont | MOSupplementalFont)[];

  constructor(localName: string) {
    super(localName);
  }

  // 폰트 추가
  // <majorFont>
  //   <latin typeface="Calibri"/>
  //   <ea typeface="Arial"/>
  //   <cs typeface="Arial"/>
  //   <font script="Jpan" typeface="ＭＳ Ｐゴシック"/>
  //   <font script="Hang" typeface="HY중고딕"/>
  // </majorFont>
}

// https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.majorfont?view=openxml-3.0.1
export class MOMajorFont extends MOFontCollectionType {
  declare localName: "majorFont";
  constructor() {
    super("majorFont");
  }
}
export class MOMinorFont extends MOFontCollectionType {
  declare localName: "minorFont";
  constructor() {
    super("minorFont");
  }
}

// https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.fontscheme?view=openxml-3.0.1
export class MOFontScheme extends OpenXmlCompositeElement {
  declare localName: "fontScheme";
  declare childElements: /*extLst,*/ (MOMajorFont | MOMinorFont)[];

  declare attributes: {
    name: string; // Name
  };

  constructor(name: string) {
    super("fontScheme");
    this.attributes.name = name;
  }

  // <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  // <a:fontScheme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="??">
  // 로 시작하지 않으면 인식되지 않음

  public toXmlString(): string {
    let ret = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n';

    // @ts-ignore
    this.attributes["xmlns:a"] = "http://schemas.openxmlformats.org/drawingml/2006/main";
    ret += super.toXmlString("a");

    return ret;
  }
}
