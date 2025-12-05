export function GoldzeitTeam() {
  return (
    <section className="border-t border-white/5 bg-[--surface] py-24">
      <div className="container mx-auto max-w-3xl px-6 text-center md:px-8">
        <h2 className="mb-8 font-serif text-2xl font-light text-[--text]">
          NLV Goldzeit Living - Ihre Bruecke nach Asien
        </h2>
        <p className="mb-10 leading-relaxed text-[--muted]">
          Wir sind kein anonymes Portal. Unser Team besteht aus deutschen Ansprechpartnern
          fuer die Vorbereitung in der Heimat, deutschen Betreuern direkt vor Ort in Vietnam
          und erfahrenen vietnamesischen Partnern. Wir verbinden deutsche Zuverlaessigkeit
          mit vietnamesischer Gastfreundschaft.
        </p>
        <div className="grid grid-cols-3 gap-8 border-t border-white/5 pt-8">
          <div>
            <p className="text-lg font-bold text-[--text]">Buero DE</p>
            <p className="text-sm text-[--muted]">Vorbereitung</p>
          </div>
          <div>
            <p className="text-lg font-bold text-[--text]">Buero VN</p>
            <p className="text-sm text-[--muted]">Vor Ort Team</p>
          </div>
          <div>
            <p className="text-lg font-bold text-[--text]">Experten</p>
            <p className="text-sm text-[--muted]">Marktzugang</p>
          </div>
        </div>
      </div>
    </section>
  );
}
