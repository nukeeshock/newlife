import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 font-serif text-6xl font-light text-[--primary]">404</h1>
      <h2 className="mb-6 font-serif text-2xl font-light text-[--text]">
        Seite nicht gefunden
      </h2>
      <p className="mb-8 max-w-md text-[--muted]">
        Die angeforderte Seite existiert nicht oder wurde verschoben.
      </p>
      <Link
        href="/"
        className="border border-[--primary] bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-widest text-[--primary] transition-all hover:bg-[--primary] hover:text-[--bg]"
      >
        Zur Startseite
      </Link>
    </div>
  );
}
