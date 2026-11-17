"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play, Quote } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { TESTIMONIALS } from "@/lib/testimonials";

const ROTATE_MS = 7000;
const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action";

function renderQuote(quote: string, italic?: string) {
  if (!italic || !quote.includes(italic)) return quote;
  const [before, ...rest] = quote.split(italic);
  return (
    <>
      {before}
      <cite className="italic">{italic}</cite>
      {rest.join(italic)}
    </>
  );
}

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const count = TESTIMONIALS.length;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const go = useCallback((next: number) => setIndex((next + count) % count), [count]);

  const rotating = !paused && !hovering && !reducedMotion;

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % count), ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [rotating, count]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Author testimonials"
      className="relative mx-auto mt-12 max-w-4xl"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHovering(false);
      }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#B9975B]/30 bg-white/70 shadow-[0_18px_50px_rgba(35,25,20,0.08)]">
        <div aria-live={rotating ? "off" : "polite"} className="grid">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
              inert={i !== index}
              className={`grid items-center gap-8 p-7 [grid-area:1/1] sm:p-10 md:grid-cols-[auto_1fr] md:gap-12 md:p-12 md:text-left ${i === index ? "" : "invisible"}`}
            >
              <div className="relative mx-auto size-32 shrink-0 sm:size-40">
                <div aria-hidden="true" className="absolute -inset-2 rounded-full border-2 border-[#B9975B]/40" />
                <div className="relative size-full overflow-hidden rounded-full bg-[#EDE8DD] shadow-[0_10px_24px_rgba(35,25,20,0.18)]">
                  <Image
                    src={t.photo}
                    alt={t.name ? `Photo of ${t.name}` : "Photo of the author"}
                    fill
                    unoptimized
                    sizes="160px"
                    className="object-cover"
                    style={{ objectPosition: t.photoPosition }}
                  />
                </div>
              </div>
              <div key={i === index ? `active-${index}` : "idle"} className="animate-[fade-in_0.5s_ease-out] motion-reduce:animate-none">
                <Quote aria-hidden="true" className="size-9 -scale-x-100 text-[#B9975B]/60" />
                <blockquote className={`mt-3 font-serif leading-relaxed text-[#111111] ${t.quote.length > 240 ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"}`}>
                  “{renderQuote(t.quote, t.italic)}”
                </blockquote>
                {(t.name || t.role) && (
                  <figcaption className="mt-6">
                    {t.name && <span className="block font-semibold text-[#681F2A]">{t.name}</span>}
                    {t.role && <span className="mt-1 block text-sm text-[#5F5A52]">{t.role}</span>}
                  </figcaption>
                )}
              </div>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous testimonial"
          className={`grid size-11 place-items-center rounded-full border border-action/50 text-action hover:bg-action hover:text-white ${focusRing}`}
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>

        <div className="flex items-center gap-2">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === index}
              className={`h-2.5 rounded-full transition-all ${i === index ? "w-8 bg-action" : "w-2.5 bg-action/30 hover:bg-action/60"} ${focusRing}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next testimonial"
          className={`grid size-11 place-items-center rounded-full border border-action/50 text-action hover:bg-action hover:text-white ${focusRing}`}
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>

        {!reducedMotion && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Start rotating testimonials" : "Pause rotating testimonials"}
            className={`ml-2 grid size-11 place-items-center rounded-full text-[#5F5A52] hover:text-action ${focusRing}`}
          >
            {paused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
          </button>
        )}
      </div>
    </div>
  );
}
