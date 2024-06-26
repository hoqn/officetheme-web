import { useCallback, useEffect, useState } from "react";
import { getLocalFonts } from "./query-local-font";

export function useRequestLocalFonts() {
  const [fonts, setFonts] = useState<FontData[]>([]);

  const [supported, setSupported] = useState(() => "queryLocalFonts" in window);

  const requestFonts = useCallback(() => {
    getLocalFonts().then((fonts) => {
      if (fonts === undefined) {
        setSupported(false);
        return;
      }

      setSupported(true);
      setFonts(fonts);
    });
  }, []);

  useEffect(() => void requestFonts(), []);

  return { fonts, requestFonts, supported };
}
