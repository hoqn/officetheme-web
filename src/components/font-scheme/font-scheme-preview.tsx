import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardTitle } from "../ui";
import { $FormFontCollection } from "./common";

const dummyMajor = {
  DEFAULT: "Dies ist die Überschrift",
  ea: "제목 タイトル 標題 标题",
  cs: "هذا هو العنوان",
};

const dummyMinor = {
  DEFAULT: [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, itaque. Iste sapiente quas unde? Ipsam veniam voluptatem exercitationem eveniet suscipit tempora, dicta molestias inventore magni nulla delectus velit consectetur perspiciatis?",
  ],
  ea: [
    "모든 국민은 법 앞에 평등하다. 누구든지 성별·종교 또는 사회적 신분에 의하여 정치적·경제적·사회적·문화적 생활의 모든 영역에 있어서 차별을 받지 아니한다.",
    "重え展消ハシワ若権ヤ文景帰サレフ度93趣狙アサ神里へを同次ハル安群ぶ治書れまみけ著載橋奮浸なら。",
    "投挙無戸対潔題女末載主実視策。開参半坂京責関聞場中活掲料潜聞。",
  ],
  cs: [
    "سياسة واستمر الإحتفاظ و عدم, أم جهة بهيئة الصفحة استبدال. فعل أي جسيمة الإنزال ويكيبيديا, أم بلا مدينة الأمم الصين, وبعد كانتا التقليدي و بعض. من فصل بحشد عقبت المضي, بل وبعد ثانية كُلفة يتم. ثم يعبأ الضغوط وبولندا هذا. أملاً والكساد قد بعض, من يكن الدول التقليدي المتاخمة. و كنقطة اسبوعين الربيع، لكل.",
  ],
};

interface FontSchemePreviewProps {
  className?: string;
  majorFont: $FormFontCollection;
  minorFont: $FormFontCollection;
}

export default function FontSchemePreview({ className, majorFont, minorFont }: FontSchemePreviewProps) {
  const { t } = useTranslation();
  const { t: iso15924t } = useTranslation("iso15924");

  const fonts = useMemo(() => {
    // { [key]: { majorFont, minorFont } }
    const ret: Record<string, { majorFont?: string; minorFont?: string }> = {};

    majorFont.forEach(({ key, typeface }) => {
      if (!(key in ret)) ret[key] = {};
      ret[key].majorFont = typeface;
    });

    minorFont.forEach(({ key, typeface }) => {
      if (!(key in ret)) ret[key] = {};
      ret[key].minorFont = typeface;
    });

    return ret;
  }, [JSON.stringify(majorFont), JSON.stringify(minorFont)]);

  return (
    <Card className={cn("p-4", className)}>
      <CardTitle>{t("craft_font.title_preview")}</CardTitle>
      {Object.entries(fonts).map(([key, { majorFont, minorFont }]) => (
        <div key={key} className="mt-4">
          <div className="text-xs text-muted-foreground">{iso15924t(key)}</div>
          <h2 className="text-base mt-2" style={{ fontFamily: majorFont }}>
            {dummyMajor[key as "DEFAULT"] || dummyMajor.DEFAULT}
          </h2>
          <p className="text-sm mt-2" style={{ fontFamily: minorFont }}>
            {dummyMinor[key as "DEFAULT"] || dummyMinor.DEFAULT}
          </p>
        </div>
      ))}
    </Card>
  );
}
