import { Input, Popover, PopoverAnchor, PopoverContent } from "@/components/ui";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import React, { forwardRef, useEffect, useState } from "react";

export type AutoCompleteOption = {
  value: string;
  label: React.ReactNode;
};

export interface AutoCompleteProps extends React.HTMLAttributes<HTMLDivElement> {
  options: AutoCompleteOption[];
  value: string;
  onValueChange(value: string): void;
  onValueSelect(value: string): void;
  placeholder?: string;
}

const AutoComplete = forwardRef<HTMLDivElement, AutoCompleteProps>(
  (
    {
      options,
      value,
      onValueChange,
      onValueSelect,
      className,
      placeholder,
      "aria-placeholder": ariaPlaceholder,
      ...restProps
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);

    const autoCompleteValue = useDebounce(value, { delay: 100 });
    const [autoCompleteOptions, setAutoCompleteOptions] = useState<AutoCompleteOption[]>(options);

    useEffect(() => {
      const filtered = options.filter((option) =>
        // TODO: option에 auto-completing을 위한 별도의 field 제공
        option.value.toString().toLowerCase().includes(autoCompleteValue.toLowerCase())
      );

      setAutoCompleteOptions(filtered);
    }, [autoCompleteValue, options]);

    const handleOnSelect = (newValue: string) => {
      onValueChange && onValueChange(newValue);
      onValueSelect && onValueSelect(newValue);
      setOpen(false);
    };

    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleKeyEvent: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      switch (e.key) {
        case "ArrowDown":
          setSelectedIndex((prev) => Math.min(prev + 1, autoCompleteOptions.length - 1));
          break;
        case "ArrowUp":
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          handleOnSelect(autoCompleteOptions[selectedIndex].value);
          break;
        case "Escape":
          setOpen(false);
          e.currentTarget.blur();
          break;
        default:
          return;
      }

      e.preventDefault();
    };

    return (
      <div ref={ref} className={className} {...restProps}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverAnchor asChild>
            <Input
              value={value}
              onChange={(e) => void onValueChange(e.target.value)}
              onFocus={() => void setOpen(true)}
              onClick={() => void setOpen(true)}
              onKeyDown={handleKeyEvent}
              placeholder={placeholder}
              aria-placeholder={ariaPlaceholder}
            />
          </PopoverAnchor>
          <PopoverContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            onFocusOutside={(e) => e.preventDefault()}
            className="rounded-lg bg-popover text-popover-foreground shadow z-10 fade-in-0 zoom-in-95 animate-in origin-top overflow-y-auto"
            style={{
              width: `var(--radix-popover-trigger-width)`,
              maxHeight: `var(--radix-popover-content-available-height)`,
            }}
          >
            <ul>
              {autoCompleteOptions.map((option, i) => (
                <li
                  key={option.value}
                  className={cn("h-8 px-2 text-sm/8 hover:bg-secondary", i === selectedIndex && "bg-secondary")}
                  onClick={() => void handleOnSelect(option.value)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

export default AutoComplete;
