import { MainLayout } from "@/app/_components/MainLayout";

export default function ContentSizeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout style="max-w-[1024px] mx-auto mt-[30px] px-4">
      {children}
    </MainLayout>
  );
}
