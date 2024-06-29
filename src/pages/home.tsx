import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui";
import { motion } from "framer-motion";
import { TypeIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <main className="">
        <section className="bg-background text-foreground">
          <div className="container flex flex-col h-96 items-center justify-center">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-primary">{t("main.hero_title")}</h2>
            <h4 className="mt-2 text-sm font-normal text-muted-foreground">{t("main.hero_subtitle")}</h4>
            <div className="mt-8 animate-in duration-500 fade-in-0 slide-in-from-bottom-4">
              {t("main.hero_description")}
            </div>
            <motion.div
              className="mt-8 flex flex-row gap-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button variant="outline" className="" asChild>
                <Link to="/craft/font">
                  <TypeIcon className="size-4 mr-2" />
                  {t("main.link_craft_font_theme")}
                </Link>
              </Button>
              {/* <Popover modal>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="">
                    <PaintBucketIcon className="size-4 mr-2" />색 테마 꾸리기
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="text-sm text-popover-foreground text-center">
                  <p>이 기능은 준비 중이에요.</p>
                  <p>열심히 만들고 있으니 곧 만나요!</p>
                </PopoverContent>
              </Popover> */}
            </motion.div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
