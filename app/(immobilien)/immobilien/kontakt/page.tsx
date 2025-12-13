import { KontaktForm } from "./kontakt-form";
import Image from "next/image";

export default function KontaktPage() {
  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <Image
          src="/bg-kontakt.png"
          alt="Contact Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-zinc-950/85" />
      </div>
      <KontaktForm />
    </main>
  );
}
