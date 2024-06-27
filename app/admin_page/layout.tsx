import { MainLayout } from "../_components/MainLayout";

export default function ContentSizeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout style="mx-auto mt-[30px] px-4">{children}</MainLayout>;
}
