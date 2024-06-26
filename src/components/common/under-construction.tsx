import { cn } from "@/lib/utils";
import { ConstructionIcon } from "lucide-react";
import { Button } from "../ui";
import { useCallback } from "react";

export interface UnderConstructionProps extends React.ComponentPropsWithoutRef<"div"> {}

export default function UnderConstruction({ className, ...restProps }: UnderConstructionProps) {
  const handleOnClickPrev: React.MouseEventHandler = useCallback((ev) => {
    ev.preventDefault();
    window.history.back();
  }, []);

  return (
    <div className={cn("container", className)} {...restProps}>
      <h2 className="mt-8 flex flex-row items-center text-lg font-bold">
        <ConstructionIcon className="size-[1.8em] mr-2" />
        <span>Under Construction!</span>
      </h2>
      <p className="mt-4 text-sm">이 기능은 준비 중이에요. 열심히 만들고 있으니, 곧 만나요!</p>
      <p className="mt-4">
        <Button onClick={handleOnClickPrev}>뒤로 돌아가기</Button>
      </p>
    </div>
  );
}
