import { useRequestLocalFonts } from "@/lib/local-font";
import { createContext, useContext, useEffect, useState } from "react";

type LocalFontsContextState = {
  fonts: FontData[];
  fontsByFamily: Record<string, FontData[]>;
  fontsRequestNotSupported: boolean;
  requestFonts(): void;
};

const LocalFontsContext = createContext<LocalFontsContextState | undefined>(undefined);

export function useLocalFonts() {
  const context = useContext(LocalFontsContext);

  if (!context) throw new Error("Local Fonts Provider가 설정되지 않았습니다!");

  return context;
}

export function LocalFontsProvider({ children }: { children: React.ReactNode }) {
  const { fonts, requestFonts, supported } = useRequestLocalFonts();
  
  const [fontsByFamily, setFontsByFamily] = useState<Record<string, FontData[]>>({});
  
  useEffect(() => {
    const groupped: Record<string, FontData[]> = {};
    
    fonts.forEach((font) => {
      if (!groupped[font.family]) groupped[font.family] = [];
      groupped[font.family].push(font);
    });

    setFontsByFamily(groupped);
  }, [fonts]);

  return (
    <LocalFontsContext.Provider value={{ fonts, fontsByFamily, requestFonts, fontsRequestNotSupported: !supported }}>
      {children}
    </LocalFontsContext.Provider>
  );
}
