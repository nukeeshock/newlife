import { GoldzeitHeader } from "@/components/goldzeit/goldzeit-header";
import { GoldzeitFooter } from "@/components/goldzeit/goldzeit-footer";

export default function GoldzeitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="goldzeit-theme relative flex min-h-screen flex-col">
      <GoldzeitHeader />
      <main className="flex-1 pt-20">{children}</main>
      <GoldzeitFooter />
    </div>
  );
}
