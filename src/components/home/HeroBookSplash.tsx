import Image from "next/image";

const covers = [
  {
    src: "/books/girish-karnad-creative-intellectual.webp",
    className: "left-[31%] top-[12%] z-20 w-[37%] rotate-[-7deg]",
  },
  {
    src: "/books/linguistic-insight-english-hindi.webp",
    className: "left-[5%] top-[25%] z-10 w-[31%] rotate-[-17deg]",
  },
  {
    src: "/books/ai-revolutionizing-physics.webp",
    className: "right-[3%] top-[18%] z-10 w-[30%] rotate-[12deg]",
  },
  {
    src: "/books/found-in-translation.webp",
    className: "left-[15%] bottom-[10%] z-30 w-[32%] rotate-[8deg]",
  },
  {
    src: "/books/the-longing-anthology-poems.webp",
    className: "right-[11%] bottom-[8%] z-20 w-[31%] rotate-[-11deg]",
  },
];

// Firework bursts and twinkling stars in the action blue, drawn behind the covers.
const BLUE = "#004B8D";
const LIGHT_BLUE = "#3E7CC4";

const bursts = [
  { cx: 14, cy: 16, rays: 14, inner: 3, outer: 11, color: BLUE, delay: "0s" },
  { cx: 90, cy: 84, rays: 12, inner: 2.5, outer: 9, color: BLUE, delay: "1.1s" },
  { cx: 95, cy: 20, rays: 10, inner: 2, outer: 6.5, color: LIGHT_BLUE, delay: "0.6s" },
  { cx: 6, cy: 78, rays: 10, inner: 2, outer: 6, color: LIGHT_BLUE, delay: "1.7s" },
];

const stars = [
  { x: 30, y: 4, r: 4.9, color: BLUE, delay: "0.2s" },
  { x: 62, y: 2, r: 3.4, color: LIGHT_BLUE, delay: "1.4s" },
  { x: 99, y: 46, r: 4.6, color: BLUE, delay: "0.9s" },
  { x: 2, y: 46, r: 3.8, color: BLUE, delay: "2s" },
  { x: 52, y: 97, r: 5.3, color: BLUE, delay: "0.5s" },
  { x: 74, y: 94, r: 3.0, color: LIGHT_BLUE, delay: "1.8s" },
  { x: 24, y: 96, r: 3.0, color: LIGHT_BLUE, delay: "1.2s" },
  { x: 80, y: 30, r: 2.7, color: LIGHT_BLUE, delay: "2.3s" },
];

const dots = [
  [22, 10], [45, 6], [78, 6], [97, 24], [97, 66], [86, 98], [38, 99], [10, 92], [1, 30], [4, 62], [66, 99], [58, 9],
];

const STAR_PATH = "M0,-1 C0.12,-0.12 0.12,-0.12 1,0 C0.12,0.12 0.12,0.12 0,1 C-0.12,0.12 -0.12,0.12 -1,0 C-0.12,-0.12 -0.12,-0.12 0,-1Z";
const twinkle = "animate-twinkle motion-reduce:animate-none [transform-box:fill-box] [transform-origin:center]";

function Sparks() {
  return (
    <svg className="absolute -inset-[4%] h-[108%] w-[108%] overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
      {bursts.map((b) => (
        <g key={`${b.cx}-${b.cy}`} className={twinkle} style={{ animationDelay: b.delay }}>
          {Array.from({ length: b.rays }, (_, i) => {
            const angle = (i / b.rays) * Math.PI * 2;
            const len = i % 2 === 0 ? b.outer : b.outer * 0.7;
            const x1 = (b.cx + Math.cos(angle) * b.inner).toFixed(2);
            const y1 = (b.cy + Math.sin(angle) * b.inner).toFixed(2);
            const x2 = (b.cx + Math.cos(angle) * len).toFixed(2);
            const y2 = (b.cy + Math.sin(angle) * len).toFixed(2);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={b.color} strokeWidth={0.7} strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ strokeWidth: 2.5 }} />
            );
          })}
          {Array.from({ length: b.rays }, (_, i) => {
            const angle = ((i + 0.5) / b.rays) * Math.PI * 2;
            const d = b.outer * 1.15;
            return <circle key={`d${i}`} cx={(b.cx + Math.cos(angle) * d).toFixed(2)} cy={(b.cy + Math.sin(angle) * d).toFixed(2)} r={0.45} fill={b.color} />;
          })}
        </g>
      ))}
      {stars.map((st) => (
        <g key={`${st.x}-${st.y}`} transform={`translate(${st.x} ${st.y})`}>
          <path d={STAR_PATH} transform={`scale(${st.r})`} fill={st.color} className={twinkle} style={{ animationDelay: st.delay }} />
        </g>
      ))}
      {dots.map(([x, y], i) => (
        <circle key={`dot${i}`} cx={x} cy={y} r={0.55} fill={i % 3 === 0 ? LIGHT_BLUE : BLUE} opacity={0.7} />
      ))}
    </svg>
  );
}

export default function HeroBookSplash() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-16 bottom-[-1rem] top-auto h-56 w-56 translate-y-0 opacity-35 sm:right-0 sm:h-72 sm:w-72 sm:opacity-50 md:right-0 md:top-[12%] md:bottom-auto md:h-[86%] md:w-[48%] md:translate-y-0 md:opacity-100"
    >
      <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E8D8C8]/70 blur-2xl" />
      <Sparks />
      <div className="absolute inset-[7%]">
        {covers.map((cover) => (
          <div
            key={cover.src}
            className={`absolute aspect-[3/4] overflow-hidden rounded-[2px] border-[3px] border-white/90 bg-[#F7F4ED] shadow-[0_18px_38px_rgba(35,25,20,0.24)] ${cover.className}`}
          >
            <Image src={cover.src} alt="" fill sizes="(max-width: 768px) 130px, 280px" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
