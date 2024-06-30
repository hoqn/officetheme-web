import { Toaster, TooltipProvider } from "@/components/ui";
import { ThemeProvider } from "next-themes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";

import "@/lib/i18n";

const router = createBrowserRouter(
  [
    {
      index: true,
      Component: HomePage,
    },
    {
      path: "craft",
      children: [
        {
          path: "font",
          lazy: () => import("@/pages/craft-font").then((it) => ({ Component: it.default })),
        },
        {
          path: "color",
          lazy: () => import("@/pages/craft-color").then((it) => ({ Component: it.default })),
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

export default function App() {
  return (
    <ThemeProvider enableSystem attribute="data-theme">
      <TooltipProvider>
        <RouterProvider router={router} />
        {/* <FileTest /> */}
        <Toaster position="bottom-center" richColors />
      </TooltipProvider>
    </ThemeProvider>
  );
}
