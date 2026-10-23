import Link from "next/link";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { s, SCRIPT, UI } from "@/lib/s";
import { DATA } from "@/lib/data";

export { s, SCRIPT, UI };
export const WA = DATA.biz.wa;
export const MONO = "ui-monospace, monospace";

/** Enlace/botón. `pill` activa el glow/ripple de Ambient. */
export function A({
  href,
  cls = "",
  css = "",
  pill = false,
  external,
  children,
  ...rest
}: {
  href: string;
  cls?: string;
  css?: string;
  pill?: boolean;
  external?: boolean;
  children: ReactNode;
  style?: CSSProperties;
  [k: string]: unknown;
}) {
  const style = s(css);
  const className = `${pill ? "pill " : ""}${cls}`.trim() || undefined;
  const isExt = external ?? /^(https?:|mailto:|tel:)/.test(href);
  if (isExt) {
    const blank = href.startsWith("http");
    return (
      <a href={href} className={className} style={style} {...(blank ? { target: "_blank", rel: "noopener" } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} style={style} {...rest}>
      {children}
    </Link>
  );
}

export function Eyebrow({ children, color = "#A56CF0", css = "" }: { children: ReactNode; color?: string; css?: string }) {
  return (
    <span
      style={s(
        `display:block;font-family:${UI};font-size:13px;letter-spacing:0.3em;text-transform:uppercase;color:${color};margin-bottom:14px;${css}`,
      )}
    >
      {children}
    </span>
  );
}

export function Faq({ items, id = "preguntas", title = "Preguntas frecuentes", sub, bg = true, pad = "90px 24px", subSize = "36px" }: {
  items: string[][];
  id?: string;
  title?: string;
  sub: string;
  bg?: boolean;
  pad?: string;
  subSize?: string;
}) {
  return (
    <section id={id} style={s(`padding:${pad};${bg ? "background:rgba(243,233,252,0.62)" : ""}`)}>
      <div style={s("max-width:860px;margin:0 auto")}>
        <h2 style={s("margin:0;font-weight:400;font-size:clamp(36px,5vw,60px);line-height:1.05;text-align:center")}>{title}</h2>
        <p style={s(`margin:6px 0 40px;text-align:center;font-family:${SCRIPT};font-size:${subSize}`)}>{sub}</p>
        <div style={s("display:flex;flex-direction:column;gap:12px")}>
          {items.map(([q, a]) => (
            <details
              key={q}
              style={s(
                "background:rgba(254,250,255,0.82);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border-radius:18px;padding:0 26px;border:1px solid rgba(17,3,102,0.12)",
              )}
            >
              <summary style={s("list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:22px 0")}>
                <h3 style={s("margin:0;font-weight:400;font-size:20px;line-height:1.35")}>{q}</h3>
                <span
                  aria-hidden="true"
                  style={s(`flex-shrink:0;width:32px;height:32px;border-radius:50%;background:#D8C7FA;display:flex;align-items:center;justify-content:center;font-family:${UI};font-size:18px`)}
                >
                  +
                </span>
              </summary>
              <p style={s("margin:0;padding:0 0 22px;font-size:18px;line-height:1.6;color:#3A2E80")}>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Crumbs({ items, mb = 36 }: { items: Array<{ name: string; href?: string }>; mb?: number }) {
  return (
    <nav aria-label="Ruta de navegación" style={s(`font-family:${UI};font-size:13px;margin-bottom:${mb}px`)}>
      <ol style={s("list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:8px;color:rgba(17,3,102,0.6)")}>
        {items.map((it, i) => (
          <Fragment key={it.name}>
            {i > 0 && <li aria-hidden="true">/</li>}
            {it.href ? (
              <li>
                <A href={it.href} css="color:rgba(17,3,102,0.7)">{it.name}</A>
              </li>
            ) : (
              <li aria-current="page" style={s("color:#110366")}>{it.name}</li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}

/** Tarjeta "Quién te acompaña" (foto real de Irina). */
export function AuthorCard({ maxPhoto = 280, links = false }: { maxPhoto?: number; links?: boolean }) {
  const a = DATA.author;
  return (
    <section id="autora" style={s("padding:0 24px 100px")}>
      <div style={s("max-width:1180px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:40px;align-items:center;padding:44px;border-radius:28px;background:rgba(243,233,252,0.62)")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/irina-1.jpg"
          alt="Dra. Irina Pérez"
          loading="lazy"
          style={s(`aspect-ratio:1;max-width:${maxPhoto}px;width:100%;border-radius:50%;object-fit:cover;object-position:50% 20%`)}
        />
        <div>
          <span style={s(`display:block;font-family:${UI};font-size:12px;letter-spacing:0.25em;text-transform:uppercase;color:#A56CF0;margin-bottom:10px`)}>Quién te acompaña</span>
          <h2 style={s("margin:0;font-weight:400;font-size:clamp(32px,4vw,46px)")}>{a.name}</h2>
          <p style={s("margin:6px 0 16px;font-size:19px;color:#3A2E80")}>{a.role}</p>
          <p style={s("margin:0 0 14px;font-size:18px;line-height:1.6")}>{a.bio}</p>
          <p style={s(`margin:0;font-family:${MONO};font-size:13px;color:#A56CF0`)}>{a.credentials}</p>
          <div style={s(`display:flex;flex-wrap:wrap;gap:12px;margin-top:22px;font-family:${UI};font-size:13px`)}>
            <A href="/irina-perez/" css="padding:9px 16px;border-radius:999px;border:1px solid rgba(17,3,102,0.25)">Conoce a Irina</A>
            {links && (
              <>
                <A href={DATA.biz.ig} css="padding:9px 16px;border-radius:999px;border:1px solid rgba(17,3,102,0.25)">Instagram {DATA.biz.igLabel}</A>
                <A href={`mailto:${DATA.biz.email}`} css="padding:9px 16px;border-radius:999px;border:1px solid rgba(17,3,102,0.25)">{DATA.biz.email}</A>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CtaBanner({ maxW = 1180, pad = "0 24px 110px", label }: { maxW?: number; pad?: string; label: string }) {
  return (
    <section style={s(`padding:${pad}`)}>
      <div style={s(`position:relative;max-width:${maxW}px;margin:0 auto;border-radius:28px;overflow:hidden;background:#110366;color:#FEFAFF;text-align:center;padding:64px 32px`)}>
        <div style={s("position:absolute;bottom:-160px;left:-80px;right:-80px;height:260px;border-radius:50%;background:#2A1A85")} />
        <h2 style={s("position:relative;margin:0;font-weight:400;font-size:clamp(36px,5vw,60px)")}>Agenda tu cita hoy</h2>
        <p style={s(`position:relative;margin:8px 0 26px;font-family:${SCRIPT};font-size:clamp(30px,3.6vw,42px)`)}>Un espacio para volver a ti.</p>
        <A
          href={WA}
          pill
          cls="btn-gold"
          css={`position:relative;display:inline-flex;padding:16px 32px;border-radius:999px;background:#FDBF3B;color:#110366;font-family:${UI};font-size:14px;letter-spacing:0.04em`}
        >
          {label}
        </A>
      </div>
    </section>
  );
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export const iconSrc = (n: string) => `/assets/${n}.png`;
export const serviceHref = (slug: string) => `/terapias/${slug}/`;
export const planHref = (slug: string) => `/experiencias/${slug}/`;
export const postHref = (slug: string) => `/blog/${slug}/`;
