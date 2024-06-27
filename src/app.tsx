import { Toaster, TooltipProvider } from "@/components/ui";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CraftFontSchemePage from "./pages/craft-font";
import CraftColorSchemePage from "./pages/craft-color";
import HomePage from "./pages/home";
import { ThemeProvider } from "next-themes";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "craft",
    children: [
      {
        path: "font",
        Component: CraftFontSchemePage,
      },
      {
        path: "color",
        Component: CraftColorSchemePage,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
});

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
