import { Button, Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import { PaintBucketIcon, TypeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout";

export default function HomePage() {
  return (
    <MainLayout>
      <main className="">
        <section className="bg-background text-foreground">
          <div className="container flex flex-col h-96 items-center justify-center">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-primary">MS Office Theme Tools</h2>
            <h4 className="mt-2 text-sm font-normal text-muted-foreground">마이크로소프트 오피스 테마 도구</h4>
            <div className="mt-8 animate-in duration-500 fade-in-0 slide-in-from-bottom-4">
              macOS에서도, Windows에서도 자유롭게 색 테마와 글꼴 테마를 만들고 공유하세요!
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
                  글꼴 테마 꾸리기
                </Link>
              </Button>
              <Popover modal>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="">
                    <PaintBucketIcon className="size-4 mr-2" />색 테마 꾸리기
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="text-sm text-popover-foreground text-center">
                  <p>이 기능은 준비 중이에요.</p>
                  <p>열심히 만들고 있으니 곧 만나요!</p>
                </PopoverContent>
              </Popover>
            </motion.div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
