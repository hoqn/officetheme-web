import { Input, Popover, PopoverContent } from "@/components/ui";
import AutoComplete, { AutoCompleteOption } from "@/components/ui-hoqn/autocomplete";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocalFonts } from "../local-fonts-provider";

export default function FontSelect({ onChange, value }: { onChange(value: string): void; value: string }) {
  const { t } = useTranslation();

  const { fontsByFamily, fontsRequestNotSupported } = useLocalFonts();

  const [options, setOptions] = useState<AutoCompleteOption[] | null>(null);

  useEffect(() => {
    setOptions(
      Object.keys(fontsByFamily).map((it) => ({
        value: it,
        label: <span style={{ fontFamily: it }}>{it}</span>,
      }))
    );
  }, [fontsByFamily]);

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    onChange(ev.target.value);
  };

  const [altOpen, setAltOpen] = useState(false);

  if (fontsRequestNotSupported) {
    return (
      <Popover open={altOpen} onOpenChange={setAltOpen}>
        <PopoverAnchor>
          <Input
            onFocus={() => void setAltOpen(true)}
            onBlur={() => void setAltOpen(false)}
            style={{ fontFamily: value }}
            value={value}
            onChange={handleOnChange}
          />
        </PopoverAnchor>
        <PopoverContent
          className="text-xs text-muted-foreground my-2 whitespace-pre-line"
          onOpenAutoFocus={(ev) => void ev.preventDefault()}
          onFocusOutside={(ev) => void ev.preventDefault()}
        >
          {t("common.msg_unsupported_local_font_access_api")}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <AutoComplete
      style={{ fontFamily: value }}
      options={options || []}
      value={value}
      onValueChange={onChange}
      onValueSelect={() => {}}
      placeholder={t("common.placeholder_font_select")}
    />
  );
}
