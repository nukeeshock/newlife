import { BestAgerHeader } from "@/components/best-ager/best-ager-header";
import { BestAgerFooter } from "@/components/best-ager/best-ager-footer";

export default function BestAgerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="best-ager-theme relative flex min-h-screen flex-col">
      <BestAgerHeader />
      <main className="flex-1 pt-20">{children}</main>
      <BestAgerFooter />
    </div>
  );
}
