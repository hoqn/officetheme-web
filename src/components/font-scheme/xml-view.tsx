import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@/components/ui";
import { concatJosa } from "@/lib/utils";
import { ClipboardCopyIcon, CopyIcon, DownloadIcon, LightbulbIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const FONT_THEME_PATH_MAC =
  "~/Library/Group Containers/UBF8T346G9.Office/User Content.localized/Themes.localized/Theme Fonts";
const FONT_THEME_PATH_WIN = "%appdata%\\Microsoft\\Templates\\Document Themes\\Theme Fonts";

interface FontSchemeXmlViewProps {
  name: string;
  xml: string;
}

export default function FontSchemeXmlView({ name, xml }: FontSchemeXmlViewProps) {
  const { t } = useTranslation();

  const [os, setOs] = useState<"mac" | "win">(() => {
    if (navigator.userAgent.indexOf("Mac") !== -1) return "mac";
    else return "win";
  });

  const fontThemePath = useMemo(() => (os === "mac" ? FONT_THEME_PATH_MAC : FONT_THEME_PATH_WIN), [os]);

  const handleOnClickDownload = useCallback(() => {
    const pseudoLink = document.createElement("a");
    const file = new Blob([xml], { type: "text/xml" });
    pseudoLink.href = URL.createObjectURL(file);
    pseudoLink.download = `${name}.xml`;
    pseudoLink.click();
    URL.revokeObjectURL(pseudoLink.href);
  }, []);

  return (
    <div>
      <pre id="result" className="p-2 bg-muted text-muted-foreground text-sm select-all overflow-x-auto">
        <code>{xml}</code>
      </pre>
      <div className="mt-4 space-x-2 text-right">
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            void navigator.clipboard
              .writeText(xml)
              .then(() => void toast(concatJosa(name, "이", "가") + " 클립보드에 복사되었어요."))
          }
        >
          <ClipboardCopyIcon className="size-4 mr-2" />
          <span>{t("common.action_copy")}</span>
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" size="sm" onClick={handleOnClickDownload}>
              <DownloadIcon className="size-4 mr-2" />
              <span>{t("craft_font.action_download_file")}</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("craft_font.msg_successfully_downloaded")}</DialogTitle>
            </DialogHeader>
            <div>
              <p>{t("craft_font.msg_post_download_description")}</p>
              <Separator orientation="horizontal" className="my-4" />
              <div className="text-sm">
                <p>{t("craft_font.label_1_post_download")}</p>
                <Select value={os} onValueChange={setOs as any}>
                  <SelectTrigger className="mt-4">
                    <SelectValue placeholder={t("craft_font.placeholder_os")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mac">macOS</SelectItem>
                    <SelectItem value="win">Windows</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator orientation="horizontal" className="my-4" />
              <div className="text-sm">
                <p>{t("craft_font.label_2_post_download")}</p>
                <div className="mt-4 w-full bg-muted text-muted-foreground rounded p-2">
                  <pre className="whitespace-pre-wrap select-all">{fontThemePath}</pre>
                  <div className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(fontThemePath).then(() => {
                          toast(t("craft_font.msg_post_download_path_copied"));
                        });
                      }}
                    >
                      <CopyIcon className="size-[1em] mr-2" />
                      {t("common.action_copy")}
                    </Button>
                  </div>
                </div>
                {os === "mac" && (
                  <div className="mt-2 text-xs">
                    <LightbulbIcon className="inline size-[1em] mr-2" />
                    <span>{t("craft_font.label_2_post_download_tip_mac")}</span>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
