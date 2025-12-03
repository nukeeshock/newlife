export function SeniorLivingSection() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[--primary]">
            Exklusives Angebot
          </p>
          <h2 className="font-serif text-3xl font-light text-[--text] md:text-4xl lg:text-5xl">
            Gemeinsam wohnen, gemeinsam{" "}
            <span className="italic text-[--primary]">aufleben</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[--muted]">
            Ein neues Lebensmodell für Senioren in Vietnam – selbstbestimmt
            leben, aber nie allein sein
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Description */}
          <div>
            <p className="mb-6 text-lg leading-relaxed text-[--text]">
              Statt alleine in einer Wohnung zu sitzen, eröffnet dieses Konzept
              ein völlig neues Lebensgefühl: Wunderschöne Pool-Villen – einige
              ruhig im Grünen, andere mitten in Da Nang, manche direkt am
              Strand.
            </p>
            <p className="mb-6 leading-relaxed text-[--muted]">
              Das Herz des Modells ist die Gemeinschaft: Gemeinsam essen,
              zusammen am Pool sitzen, miteinander lachen, Ausflüge planen –
              oder einfach die Gewissheit haben, dass jemand da ist.
            </p>

            {/* Features */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              {[
                "Eigenes Zimmer mit Bad",
                "Halbpension inklusive",
                "Haushälterin vor Ort",
                "Pool & Garten",
                "Gemeinschaftsbereiche",
                "Warmes Klima ganzjährig",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-[--primary]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-[--text]">{feature}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right: Pricing Card */}
          <div className="border border-[--glass-border] bg-[--card] p-8 lg:p-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center border border-[--primary]/30 text-[--primary]">
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-[--text]">
                  Pool-Villa Wohngemeinschaft
                </h3>
                <p className="text-sm text-[--muted]">Da Nang & Umgebung</p>
              </div>
            </div>

            <div className="mb-6 border-t border-b border-[--glass-border] py-6">
              <div className="mb-4 flex items-baseline justify-between">
                <div>
                  <p className="text-sm text-[--muted]">Eigenes Zimmer</p>
                  <p className="text-xs text-[--muted]">mit privatem Bad</p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-3xl text-[--primary]">
                    999 €
                  </span>
                  <span className="text-sm text-[--muted]">/Monat</span>
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-sm text-[--muted]">Paare</p>
                  <p className="text-xs text-[--muted]">pro Person</p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-3xl text-[--primary]">
                    849 €
                  </span>
                  <span className="text-sm text-[--muted]">/Monat</span>
                </div>
              </div>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-[--muted]">
              Ideal für Senioren, die nicht allein wohnen möchten, sondern aktiv
              und genussvoll leben wollen – mit Sicherheit, Komfort und echter
              Gemeinschaft.
            </p>

            <a
              href="https://wa.me/4915112345678?text=Hallo,%20ich%20interessiere%20mich%20für%20das%20Senioren-Wohnmodell%20in%20Vietnam."
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 border border-[--primary] bg-[--primary] py-4 text-sm font-medium tracking-wide text-[--bg] transition-all hover:bg-transparent hover:text-[--primary]"
            >
              <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Jetzt unverbindlich anfragen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
