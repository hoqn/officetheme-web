import { Input, Tooltip } from "@/components/ui";
import AutoComplete, { AutoCompleteOption } from "@/components/ui-hoqn/autocomplete";
import { useEffect, useState } from "react";
import { useLocalFonts } from "./local-fonts-provider";

export default function FontSelect({ onChange, value }: { onChange(value: string): void; value: string }) {
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

  if (fontsRequestNotSupported) {
    return (
      <Tooltip>
        <Input value={value} onChange={handleOnChange} />
      </Tooltip>
    );
  }

  return (
    <AutoComplete
      style={{ fontFamily: value }}
      options={options || []}
      value={value}
      onValueChange={onChange}
      onValueSelect={() => {}}
      placeholder="글꼴..."
    />
  );
}
