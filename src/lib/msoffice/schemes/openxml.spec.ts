import { describe, expect, test } from "vitest";
import { OpenXmlElement } from "./openxml";

describe("Element를 XML string으로 변환", () => {
  test("태그 이름을 제외한 모든 속성 없음", () => {
    const element = new OpenXmlElement("foo");

    expect(element.toXmlString()).toBe("<foo />");
  });

  test("속성만 가지고 있음", () => {
    const element = new OpenXmlElement("foo");
    element.attributes["bar"] = "hello";

    expect(element.toXmlString()).toBe('<foo bar="hello"/>');
  });

  test("속성과 자식을 가지고 있음", () => {
    const element = new OpenXmlElement("foo");
    element.attributes["bar"] = "hello";
    element.childElements.push(new OpenXmlElement("foo2"));

    expect(element.toXmlString()).toBe('<foo bar="hello"><foo2 /></foo>');
  });
});
