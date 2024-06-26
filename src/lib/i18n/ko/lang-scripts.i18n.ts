import { SupplementalFontScripts } from "@/lib/msoffice/schemes/lang-scripts";

export const tMandatoryFontTypes = {
  latin: "로마자",
  ea: "동아시아 문자",
  cs: "복잡한 문자체계",
} as const;

export const tSupplementalFontScripts: Record<SupplementalFontScripts, string> = {
  Adlm: "아들람 문자",
  Afak: "아파카 문자",
  Aghb: "코카시안 알바니아 문자",
  Ahom: "아홈 문자",
  Arab: "아랍 문자",
  Aran: "아랍 문자 (나스탈리크체)",
  Armi: "제국 아람 문자",
  Armn: "아르메니아 문자",
  Avst: "아베스탄 문자",
  Bali: "발리 문자",
  Bamu: "바뭄 문자",
  Bass: "바사바흐 문자",
  Batk: "바탁 문자",
  Beng: "벵골 문자",
  Bhks: "바이크수키",
  Blis: "",
  Bopo: "보포모포",
  Brah: "",
  Brai: "",
  Bugi: "",
  Buhd: "",
  Cakm: "",
  Cans: "캐나다 원주민 통합 음절문자",
  Cari: "",
  Cham: "",
  Cher: "체로키 문자",
  Chis: "",
  Chrs: "",
  Cirt: "",
  Copt: "",
  Cpmn: "",
  Cprt: "",
  Cyrl: "키릴 문자",
  Cyrs: "키릴 문자 (교회 슬라브어)",
  Deva: "",
  Diak: "",
  Dogr: "",
  Dsrt: "",
  Dupl: "",
  Egyd: "",
  Egyh: "",
  Egyp: "",
  Elba: "",
  Elym: "",
  Ethi: "",
  Gara: "",
  Geok: "",
  Geor: "",
  Glag: "",
  Gong: "",
  Gonm: "",
  Goth: "고트 문자",
  Gran: "",
  Grek: "",
  Gujr: "",
  Gukh: "",
  Guru: "",
  Hanb: "",
  Hang: "한글",
  Hani: "한자",
  Hano: "",
  Hans: "간체 한자",
  Hant: "번체 한자",
  Hatr: "",
  Hebr: "히브리 문자",
  Hira: "히라가나",
  Hluw: "",
  Hmng: "",
  Hmnp: "",
  Hrkt: "가나 (히라가나와 가타카나)",
  Hung: "고대 헝가리 문자",
  Inds: "",
  Ital: "고대 이탈리아어 (에트루리아어, 오스크어 등)",
  Jamo: "한글 자모",
  Java: "",
  Jpan: "일본어 (한자, 히라가나, 가타카나)",
  Jurc: "",
  Kali: "",
  Kana: "가타카나",
  Kawi: "",
  Khar: "",
  Khmr: "크메르 문자",
  Khoj: "",
  Kitl: "",
  Kits: "",
  Knda: "",
  Kore: "한국어 표기 (한글과 한자)",
  Kpel: "",
  Krai: "",
  Kthi: "",
  Lana: "",
  Laoo: "라오 문자",
  Latf: "프락투어체 로마자",
  Latg: "게일체 로마자",
  Latn: "로마자",
  Leke: "",
  Lepc: "",
  Limb: "",
  Lina: "",
  Linb: "",
  Lisu: "",
  Loma: "",
  Lyci: "",
  Lydi: "",
  Mahj: "",
  Maka: "",
  Mand: "",
  Mani: "",
  Marc: "",
  Maya: "마야 상형문자",
  Medf: "",
  Mend: "",
  Merc: "",
  Mero: "",
  Mlym: "",
  Modi: "",
  Mong: "몽골 문자",
  Moon: "",
  Mroo: "",
  Mtei: "",
  Mult: "",
  Mymr: "미얀마 문자",
  Nagm: "",
  Nand: "",
  Narb: "",
  Nbat: "",
  Newa: "",
  Nkdb: "",
  Nkgb: "",
  Nkoo: "",
  Nshu: "",
  Ogam: "오감 문자",
  Olck: "",
  Onao: "",
  Orkh: "",
  Orya: "",
  Osge: "",
  Osma: "",
  Ougr: "",
  Palm: "",
  Pauc: "",
  Pcun: "",
  Pelm: "",
  Perm: "고대 페름 문자",
  Phag: "",
  Phli: "",
  Phlp: "",
  Phlv: "",
  Phnx: "",
  Plrd: "",
  Piqd: "클링온 문자",
  Prti: "",
  Psin: "",
  Qaaa: "",
  Qabx: "",
  Ranj: "",
  Rjng: "",
  Rohg: "",
  Roro: "",
  Runr: "룬 문자",
  Samr: "",
  Sara: "",
  Sarb: "",
  Saur: "",
  Sgnw: "",
  Shaw: "",
  Shrd: "",
  Shui: "",
  Sidd: "",
  Sidt: "",
  Sind: "",
  Sinh: "싱할라 문자",
  Sogd: "",
  Sogo: "",
  Sora: "",
  Soyo: "",
  Sund: "",
  Sunu: "",
  Sylo: "",
  Syrc: "",
  Syre: "고전체 시리아 문자",
  Syrj: "",
  Syrn: "",
  Tagb: "",
  Takr: "",
  Tale: "",
  Talu: "",
  Taml: "",
  Tang: "",
  Tavt: "",
  Tayo: "",
  Telu: "",
  Teng: "텡과르",
  Tfng: "",
  Tglg: "",
  Thaa: "",
  Thai: "타이 문자",
  Tibt: "",
  Tirh: "",
  Tnsa: "",
  Todr: "",
  Tols: "",
  Toto: "",
  Tutg: "",
  Ugar: "",
  Vaii: "",
  Visp: "비저블 스피치",
  Vith: "",
  Wara: "",
  Wcho: "",
  Wole: "",
  Xpeo: "고대 페르시아 설형 문자",
  Xsux: "",
  Yezi: "",
  Yiii: "",
  Zanb: "",
  Zinh: "",
  Zmth: "",
  Zsye: "기호 (이모지)",
  Zsym: "기호",
  Zxxx: "표기되지 않은 문서",
  Zyyy: "확인되지 않은 표기 체계",
  Zzzz: "부호화되지 않은 표기 체계",
};