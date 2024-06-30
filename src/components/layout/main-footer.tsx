import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export interface MainFooterProps extends Omit<React.ComponentPropsWithoutRef<"footer">, "children"> {}

export default function MainFooter({ className, ...restProps }: MainFooterProps) {
  return (
    <footer className={cn("border-t", className)} {...restProps}>
      <div className="container">
        <p className="mt-8 text-sm text-center">© 2024. Hogyun Jeon. All rights reserved.</p>
        <p className="mt-4 mb-8 text-sm text-center">
          <Link className="underline" to="https://github.com/hoqn" target="_blank">Github</Link>
        </p>
      </div>
    </footer>
  );
}
