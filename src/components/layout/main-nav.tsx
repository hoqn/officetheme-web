import { cn } from "@/lib/utils";
import { SelectTrigger as SelectTriggerPrim } from "@radix-ui/react-select";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Select, SelectContent, SelectItem } from "../ui";

function ThemeSelect({ className }: { className?: string }) {
  const { setTheme, themes, theme } = useTheme();

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTriggerPrim asChild>
        <Button className={className} size="icon" variant="ghost">
          <SunIcon className="size-4 inline dark:hidden" />
          <MoonIcon className="size-4 dark:inline hidden" />
        </Button>
      </SelectTriggerPrim>
      <SelectContent>
        {themes.map((t) => (
          <SelectItem key={t} value={t}>
            {t}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

interface MainNavProps extends Omit<React.ComponentPropsWithoutRef<"header">, "children"> {}

export function MainNav({ className, ...restProps }: MainNavProps) {
  const { scrollY } = useScroll();

  const [isTop, setIsTop] = useState(scrollY.get() <= 16);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest <= 16) setIsTop(true);
    else setIsTop(false);
  });

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 h-16 bg-background/75 backdrop-blur border-b",
        isTop && "border-transparent",
        className
      )}
      {...restProps}
    >
      <div className="container flex flex-row justify-between h-full">
        <div className="flex flex-row h-full items-center">
          <Link className="transition hover:opacity-50" to="/">
            <h2 className="text-base font-bold">MS Office Theme Tools</h2>
          </Link>
        </div>
        <nav className="flex flex-row h-full items-center">
          <ThemeSelect />
        </nav>
      </div>
    </header>
  );
}
