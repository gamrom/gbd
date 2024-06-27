import { MainLayout } from "../_components/MainLayout";

export default function ContentSizeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
