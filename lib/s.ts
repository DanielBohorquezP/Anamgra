import type { CSSProperties } from "react";

const cache = new Map<string, CSSProperties>();

/** Convierte una cadena CSS inline (como en los prototipos) en un objeto style de React. */
export function s(css: string): CSSProperties {
  const hit = cache.get(css);
  if (hit) return hit;
  const out: Record<string, string> = {};
  for (const decl of css.split(";")) {
    const i = decl.indexOf(":");
    if (i < 0) continue;
    const k = decl.slice(0, i).trim();
    const v = decl.slice(i + 1).trim();
    if (!k) continue;
    const key = k.startsWith("--")
      ? k
      : k.replace(/^-(\w)/, (_, c: string) => c.toUpperCase()).replace(/-(\w)/g, (_, c: string) => c.toUpperCase());
    out[key] = v;
  }
  cache.set(css, out as CSSProperties);
  return out as CSSProperties;
}

export const SCRIPT = "var(--font-script), 'Dancing Script', cursive";
export const UI = "var(--font-ui), 'DM Sans', sans-serif";
