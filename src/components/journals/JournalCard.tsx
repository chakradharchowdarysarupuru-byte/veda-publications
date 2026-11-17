import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Journal } from "@/lib/journals";

export default function JournalCard({ journal }: { journal: Journal }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-[#6B675F]/20 bg-white/60 p-5 shadow-[0_8px_24px_rgba(35,25,20,0.06)] sm:p-6">
      <div className="flex items-start gap-5">
        <div className="relative aspect-[3/4] w-[38%] max-w-40 shrink-0 overflow-hidden rounded-md bg-[#EDE8DD] shadow-[0_10px_24px_rgba(35,25,20,0.22)]">
          <Image
            src={journal.cover}
            alt={`Cover of ${journal.fullName}`}
            fill
            unoptimized
            sizes="160px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 pt-1">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#681F2A]">{journal.shortName}</p>
          <h3 className="mt-2 font-serif text-xl leading-snug text-[#111111] sm:text-2xl">{journal.fullName}</h3>
        </div>
      </div>

      <p className="mt-5 flex-1 text-sm leading-6 text-[#5F5A52]">{journal.description}</p>

      <dl className="mt-5 flex items-end justify-between gap-4 border-t border-[#6B675F]/20 pt-4">
        <div>
          <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#6B675F]">ISSN</dt>
          <dd className="mt-1 whitespace-nowrap font-serif text-lg text-[#111111]">{journal.issn}</dd>
        </div>
        <div className="text-right">
          <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#6B675F]">Frequency</dt>
          <dd className="mt-1 whitespace-nowrap font-serif text-lg text-[#111111]">{journal.frequency}</dd>
        </div>
      </dl>

      <a
        href={journal.website}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex min-h-11 items-center gap-2 self-end whitespace-nowrap rounded-full bg-action px-5 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-white hover:bg-action-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action"
      >
        Visit Journal
        <span className="sr-only"> (opens in a new tab)</span>
        <ArrowUpRight aria-hidden="true" className="size-4" />
      </a>
    </article>
  );
}
