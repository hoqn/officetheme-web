import MainFooter from "./main-footer";
import { MainNav } from "./main-nav";

export interface MainLayoutProps {
  hasMainNav?: boolean;
  children: React.ReactNode;
}

export function MainLayout({ hasMainNav = true, children }: MainLayoutProps) {
  return (
    <div className="h-full min-h-full">
      {hasMainNav && <MainNav />}
      <div className="h-16" /> {/* Skip MainNav height */}
      {children}
      <MainFooter />
    </div>
  );
}
