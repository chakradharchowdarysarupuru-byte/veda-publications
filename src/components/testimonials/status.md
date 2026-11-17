# src/components/testimonials status

Snapshot: 2026-11-17. Update after meaningful changes; this note is not a live runtime health check.

`TestimonialsCarousel.tsx` is the client-side rotating carousel used by the homepage `#testimonials` section ("What Our Authors Say"). It advances every 7 seconds and pauses on hover or focus or with the pause button. Autoplay is off under reduced motion. It has previous/next buttons and dots. Data lives in `src/lib/testimonials.ts`; photos are in `public/testimonials/`.

Five testimonials with names and roles from the owner's note. Quote-to-person pairing follows the note's order.

Direct files: `TestimonialsCarousel.tsx`. No child folders.
