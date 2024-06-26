import { CommandGroup, CommandItem, CommandList, Input, InputProps } from "@/components/ui";
import { cn } from "@/lib/utils";
import { CommandInput as CommandInputPrim, Command as CommandPrim } from "cmdk";
import { ChangeEventHandler, forwardRef, useState } from "react";

export type AutoCompleteOption = {
  value: string;
  label: React.ReactNode;
};

export interface AutoCompleteProps extends InputProps {
  options: AutoCompleteOption[];
  value: string;
  onValueChange(value: string): void;
  onValueSelect(value: string): void;
}

const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>(
  ({ options, value, onValueChange, onValueSelect, ...restProps }, ref) => {
    const [open, setOpen] = useState(false);

    const handleOnChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
      const newValue = ev.target.value;
      onValueChange && onValueChange(newValue);
    };

    const handleOnSelect = (newValue: string) => {
      onValueChange && onValueChange(newValue);
      onValueSelect && onValueSelect(newValue);
      setOpen(false);
    };

    return (
      <CommandPrim className="flex-1" onFocus={() => void setOpen(true)} onBlur={() => void setOpen(false)}>
        <CommandInputPrim ref={ref} value={value} onValueChange={onValueChange} {...restProps} asChild>
          <Input onFocus={() => void setOpen(true)} onChange={handleOnChange} />
        </CommandInputPrim>
        <div className={cn("relative", open ? "block" : "hidden")}>
          <CommandList className="absolute top-1 w-full rounded-lg bg-popover text-popover-foreground shadow z-10 fade-in-0 zoom-in-95 animate-in origin-top">
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={handleOnSelect}
                  className="felx flex-row justify-between items-center"
                >
                  <span>{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </div>
      </CommandPrim>
    );
  }
);

export default AutoComplete;
