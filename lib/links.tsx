import Link from "next/link";
import type { ReactNode } from "react";
import { DATA } from "./data";

type Service = (typeof DATA.services)[number];
type Plan = (typeof DATA.plans)[number];
type Post = (typeof DATA.posts)[number];

export const serviceHref = (slug: string) => `/terapias/${slug}/`;
export const planHref = (slug: string) => `/experiencias/${slug}/`;
export const postHref = (slug: string) => `/blog/${slug}/`;

/* ---------- relaciones entre contenidos ---------- */

/** Nombre de plan (como aparece en service.plans) -> plan completo. */
const planByName = (name: string) => DATA.plans.find((p) => p.name === name);

/** Planes que incluyen alguno de los servicios dados (sin duplicados). */
export function plansForServices(slugs: string[]): Plan[] {
  const out: Plan[] = [];
  for (const sl of slugs) {
    const sv = DATA.services.find((x) => x.slug === sl);
    for (const n of sv?.plans ?? []) {
      const pl = planByName(n);
      if (pl && !out.includes(pl)) out.push(pl);
    }
  }
  return out;
}

/** Servicios que forman parte de un plan (solo los que tienen página propia). */
export function servicesForPlan(plan: Plan): Service[] {
  return plan.steps
    .map((st) => (st.slug ? DATA.services.find((x) => x.slug === st.slug) : undefined))
    .filter((x): x is Service => !!x);
}

/** Artículos que tratan alguno de los servicios dados. */
export function postsForServices(slugs: string[], exclude?: string): Post[] {
  return DATA.posts.filter((p) => p.slug !== exclude && p.related.some((r) => slugs.includes(r)));
}

/** Artículos relacionados con uno dado: comparten servicio; se completa con los más recientes. */
export function relatedPosts(post: Post, max = 3): Post[] {
  const shared = postsForServices(post.related, post.slug);
  const rest = DATA.posts.filter((p) => p.slug !== post.slug && !shared.includes(p));
  return [...shared, ...rest].slice(0, max);
}

/* ---------- enlaces contextuales dentro del texto ---------- */

type Term = { re: string; href: string };

const esc = (t: string) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Términos enlazables, de más largo a más corto para que "Experiencia Armonía" gane a "Armonía". */
const TERMS: Term[] = [
  ...DATA.plans.flatMap((p) => [
    { re: `Experiencia ${p.name}`, href: planHref(p.slug) },
    ...(p.slug === "integral-premium" ? [{ re: p.name, href: planHref(p.slug) }] : []),
  ]),
  ...DATA.services.flatMap((sv): Term[] => {
    const h = serviceHref(sv.slug);
    const alt: Record<string, string[]> = {
      reflexologia: ["reflexología podal", "reflexología"],
      poliedros: ["poliedros"],
      "terapia-con-angeles": ["Terapia con Ángeles"],
      "piedras-calientes": ["piedras calientes"],
      cupping: ["cupping"],
    };
    return (alt[sv.slug] ?? [sv.name]).map((re) => ({ re, href: h }));
  }),
].sort((a, b) => b.re.length - a.re.length);

const RX = new RegExp(`(?<![\\p{L}\\p{N}])(${TERMS.map((t) => esc(t.re)).join("|")})(?![\\p{L}\\p{N}])`, "giu");
const hrefOf = (m: string) => TERMS.find((t) => t.re.toLowerCase() === m.toLowerCase())?.href;

const LINK_CSS = { color: "inherit", borderBottom: "1px solid #FDBF3B" } as const;

/**
 * Convierte menciones de terapias y experiencias en enlaces internos.
 * Cada destino se enlaza una sola vez por página (`used` se comparte entre llamadas)
 * y nunca se enlaza la propia página (`self`).
 */
export function linkify(text: string, used: Set<string>, self?: string, css: Record<string, string> = {}): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  let n = 0;
  for (const m of text.matchAll(RX)) {
    const href = hrefOf(m[0]);
    if (!href || href === self || used.has(href)) continue;
    used.add(href);
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <Link key={n++} href={href} style={{ ...LINK_CSS, ...css }}>
        {m[0]}
      </Link>,
    );
    last = m.index + m[0].length;
  }
  if (!out.length) return text;
  if (last < text.length) out.push(text.slice(last));
  return out;
}
