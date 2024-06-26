/**
 * 공통적으로 사용될 OpenXML 형식을 js object 형태로 매핑하기 위한 포맷
 */

// https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.openxmlelement?view=openxml-3.0.1
export class OpenXmlElement {
  public localName: string;
  public attributes: Record<string, any>;
  public childElements: OpenXmlElement[];

  constructor(localName: string) {
    this.localName = localName;
    this.attributes = {};
    this.childElements = [];
  }

  // 자식에 추가
  public appendChild<T extends typeof this.childElements>(...elements: T) {
    this.childElements.push(...elements);
  }

  // XML string 생성
  public toXmlString(prefix?: string): string {
    let ret = "";

    // TODO: 현재는 구현의 편의를 위해 재귀적으로 구현. 추후 외부 라이브러리 또는 다른 방법으로 성능을 높여야 할 듯!

    const tag = prefix ? `${prefix}:${this.localName}` : `${this.localName}`;

    // Attributes 적용
    ret += "<";
    ret += [tag, ...Object.entries(this.attributes).map(([key, value]) => `${key}="${value}"`)].join(" ");

    if (this.childElements && this.childElements.length > 0) {
      // 하위 엘리먼트 존재
      ret += ">\n";
      for (const child of this.childElements) {
        ret += child.toXmlString(prefix);
      }
      ret += "</" + tag + ">\n";
    } else {
      // 단말 엘리먼트
      ret += "/>\n";
    }

    return ret;
  }
}

// https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.openxmlcompositeelement?view=openxml-3.0.1
export class OpenXmlCompositeElement extends OpenXmlElement {
  constructor(localName: string) {
    super(localName);
  }
}

// https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.openxmlleafelement?view=openxml-3.0.1
export class OpenXmlLeafElement extends OpenXmlElement {
  declare childElements: [];

  constructor(localName: string) {
    super(localName);
  }
}
