import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronRight, LibraryBig, Megaphone } from "lucide-react";
import Footer from "@/components/footer/Footer";
import { CALL_FOR_CHAPTERS, CALLS_ENQUIRY_HREF } from "@/lib/calls";

export const metadata: Metadata = {
  title: "Current Calls",
  description: CALL_FOR_CHAPTERS.summary,
};

export default function CallsPage() {
  return (
    <>
      <main id="main-content" tabIndex={-1} className="bg-[#F7F4ED] px-6 pb-20 pt-36 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/#submissions"
            className="inline-flex items-center gap-2 text-sm font-semibold text-action hover:text-action-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to For authors
          </Link>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-[#681F2A]">Current calls</p>
          <div className="mt-4 flex items-start gap-4">
            <Megaphone aria-hidden="true" className="mt-2 size-10 shrink-0 text-[#681F2A] sm:size-12" strokeWidth={1.5} />
            <div>
              <h1 className="font-serif text-4xl leading-tight text-[#111111] sm:text-5xl">{CALL_FOR_CHAPTERS.title}</h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#3D3D3D] sm:text-lg">{CALL_FOR_CHAPTERS.summary}</p>
            </div>
          </div>

          <section aria-labelledby="themes-heading" className="relative mt-12 overflow-hidden rounded-2xl border border-[#6B675F]/20 bg-white/60 p-6 shadow-[0_8px_24px_rgba(35,25,20,0.06)] sm:p-10">
            <LibraryBig aria-hidden="true" className="pointer-events-none absolute -right-3 -top-3 hidden size-24 text-[#B9975B]/20 sm:block" strokeWidth={1} />
            <h2 id="themes-heading" className="inline-block border-b-2 border-[#B9975B]/50 pb-1 font-serif text-2xl text-[#681F2A]">
              Indicative Themes
            </h2>
            <ul className="relative mt-6 grid gap-3 sm:grid-cols-2 sm:gap-x-10">
              {CALL_FOR_CHAPTERS.themes.map((theme) => (
                <li key={theme} className="flex gap-3 text-base leading-7 text-[#111111]">
                  <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-[#681F2A]" />
                  {theme}
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-10 flex flex-col gap-4 rounded-2xl bg-[#EDE8DD] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="font-serif text-2xl text-[#111111]">Interested in contributing?</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#5F5A52]">
                Email us with your name, affiliation, theme of interest and a proposed chapter title. We will reply with submission guidelines and deadlines.
              </p>
            </div>
            <a
              href={CALLS_ENQUIRY_HREF}
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-action px-6 py-3 font-serif text-base text-white shadow-[0_8px_20px_rgba(0,75,141,0.25)] hover:bg-action-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action"
            >
              Express interest
              <ChevronRight aria-hidden="true" className="size-5" />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
