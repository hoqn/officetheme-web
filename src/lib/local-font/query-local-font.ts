declare global {
  function queryLocalFonts(options?: any): Promise<FontData[]>;

  interface FontData {
    family: string;
    fullName: string;
    postscriptName: string;
    style: string;
  }
}

export async function getLocalFonts(options?: { postscriptNames?: string[] }) {
  if ("queryLocalFonts" in window) {
    try {
      const availableFonts = await window.queryLocalFonts(options);
      return availableFonts;
    } catch (e) {
      // @ts-ignore
      console.error(e.name, e.message);
    }
  }

  return undefined;
}
