"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { s, SCRIPT, UI } from "@/lib/s";
import { DATA } from "@/lib/data";
import { serviceHref } from "@/lib/links";

const PLANS = [
  { href: "/experiencias/integral-premium/", img: "/assets/lotus.png", w: 48, h: 34, name: "Integral Premium", sub: "Reiki + Consulta + Esencia floral", price: "$165", dur: "90 min" },
  { href: "/experiencias/armonia/", img: "/assets/i-angelmed.png", w: 48, h: 38, name: "Armonía", sub: "Reiki + Terapia con Ángeles", price: "$95", dur: "60 min" },
  { href: "/experiencias/renacer/", img: "/assets/i-fenix.png", w: 48, h: 44, name: "Renacer", sub: "Pies + Reflexología + Meditación", price: "$85", dur: "60 min" },
];

type Menu = "ter" | "exp" | null;

/* Los menús se renderizan siempre (ocultos con CSS) para que sus enlaces existan en el HTML que ve Google. */
const panel = (open: boolean, css: string) =>
  s(`position:absolute;top:60px;left:-24px;padding:10px;border-radius:18px;background:#FEFAFF;border:1px solid rgba(17,3,102,0.1);box-shadow:rgba(17,3,102,0.16) 0 24px 60px -12px;transition:opacity .2s,transform .2s;opacity:${open ? 1 : 0};transform:translateY(${open ? 0 : -4}px);visibility:${open ? "visible" : "hidden"};${css}`);

export default function SiteHeader() {
  const [menu, setMenu] = useState<Menu>(null);
  const [mob, setMob] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const path = usePathname();

  useEffect(() => {
    setMenu(null);
    setMob(false);
  }, [path]);
  useEffect(() => () => clearTimeout(t.current), []);

  const enter = (m: Menu) => { clearTimeout(t.current); setMenu(m); };
  const leave = () => { t.current = setTimeout(() => setMenu(null), 150); };

  const link = "nav-link hv-navy";
  const linkCss = `color:rgba(17,3,102,0.72)`;
  const dropWrap = "position:relative;height:68px;display:flex;align-items:center;gap:4px";
  const chevron = (m: Exclude<Menu, null>, label: string) => (
    <button
      type="button"
      onClick={() => setMenu((cur) => (cur === m ? null : m))}
      aria-expanded={menu === m}
      aria-label={label}
      style={s(`border:none;background:transparent;cursor:pointer;padding:6px;color:${menu === m ? "#110366" : "rgba(17,3,102,0.72)"}`)}
    >
      <span aria-hidden="true" style={s(`display:inline-block;font-size:10px;transition:transform .3s;transform:${menu === m ? "rotate(180deg)" : "rotate(0deg)"}`)}>▼</span>
    </button>
  );

  const groups = DATA.cats.map((cat) => ({ cat, items: DATA.services.filter((x) => x.cat === cat) }));
  const mobLink = "padding:8px 0 8px 14px";

  return (
    <header style={s("position:fixed;top:0;left:0;right:0;z-index:50;padding:16px 16px 0")}>
      <nav
        aria-label="Principal"
        className="nav-shell"
        style={s(
          "position:relative;max-width:1280px;margin:0 auto;padding:0 28px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);background:rgba(255,255,255,0.7);border:1px solid rgba(255,255,255,0.5);border-radius:8px;box-shadow:rgba(17,3,102,0.08) 0px 10px 50px",
        )}
      >
        <div className="nav-row" style={s("height:68px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:32px")}>
          <div style={s(`display:flex;align-items:center;gap:26px;font-family:${UI};font-size:14px;letter-spacing:0.02em`)}>
            <div className="nav-wide" style={s("align-items:center;gap:30px")}>
              <Link href="/irina-perez/" className={link} style={s(linkCss)}>Sobre Irina</Link>

              {/* Terapias */}
              <div onMouseEnter={() => enter("ter")} onMouseLeave={leave} style={s(dropWrap)}>
                <Link href="/terapias/" className={link} style={s(linkCss)}>Terapias</Link>
                {chevron("ter", "Mostrar todas las terapias")}
                <div style={panel(menu === "ter", "width:640px;display:grid;grid-template-columns:repeat(3,1fr);gap:4px 8px")}>
                  {groups.map((g) => (
                    <div key={g.cat} style={s("padding:6px 4px")}>
                      <div style={s(`padding:6px 10px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#A56CF0`)}>{g.cat}</div>
                      {g.items.map((x) => (
                        <Link key={x.slug} href={serviceHref(x.slug)} className="hv-lav" style={s("display:block;padding:8px 10px;border-radius:10px;font-size:15px;color:#110366")}>
                          {x.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                  <Link href="/terapias/" className="hv-purple" style={s("grid-column:1 / -1;display:block;margin-top:2px;padding:12px 14px;border-top:1px solid rgba(17,3,102,0.08);font-size:13px;color:#110366")}>
                    Ver todas las terapias →
                  </Link>
                </div>
              </div>

              {/* Experiencias */}
              <div onMouseEnter={() => enter("exp")} onMouseLeave={leave} style={s(dropWrap)}>
                <Link href="/experiencias/" className={link} style={s(linkCss)}>Experiencias</Link>
                {chevron("exp", "Mostrar las experiencias")}
                <div style={panel(menu === "exp", "width:380px")}>
                  {PLANS.map((p) => (
                    <Link key={p.href} href={p.href} className="hv-lav" style={s("display:grid;grid-template-columns:52px 1fr auto;gap:14px;align-items:center;padding:12px 14px;border-radius:12px;color:#110366")}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.img} alt="" width={p.w} height={p.h} style={s(`width:${p.w}px;height:${p.h}px;object-fit:contain`)} />
                      <span>
                        <span style={s("display:block;font-size:18px;line-height:1.2")}>{p.name}</span>
                        <span style={s("display:block;font-size:12px;color:rgba(17,3,102,0.65);margin-top:2px")}>{p.sub}</span>
                      </span>
                      <span style={s("text-align:right;font-size:12px;line-height:1.35;color:rgba(17,3,102,0.75)")}>
                        <span style={s("display:block;font-size:18px;color:#110366")}>{p.price}</span>
                        {p.dur}
                      </span>
                    </Link>
                  ))}
                  <Link href="/experiencias/" className="hv-purple" style={s("display:block;margin-top:6px;padding:12px 14px;border-top:1px solid rgba(17,3,102,0.08);font-size:13px;color:#110366")}>
                    Comparar experiencias →
                  </Link>
                </div>
              </div>

              <Link href="/blog/" className={link} style={s(linkCss)}>Blog</Link>
              <Link href="/#preguntas" className={link} style={s(linkCss)}>Preguntas</Link>
            </div>
            <button
              type="button"
              className="nav-narrow"
              onClick={() => setMob((m) => !m)}
              aria-label="Abrir menú"
              aria-expanded={mob}
              style={s("width:44px;height:44px;border:none;background:transparent;cursor:pointer;flex-direction:column;justify-content:center;gap:5px;padding:10px")}
            >
              <span style={s("display:block;height:1.5px;background:#110366")} />
              <span style={s("display:block;height:1.5px;background:#110366")} />
              <span style={s("display:block;height:1.5px;background:#110366")} />
            </button>
          </div>
          <Link href="/" aria-label="AnamGra Holistic Therapy, inicio" style={s("color:#110366")}>
            <span className="logo-header" style={s(`font-family:${SCRIPT};font-size:34px;line-height:1`)}>AnamGra</span>
          </Link>
          <div style={s("display:flex;justify-content:flex-end")}>
            <a
              href="https://wa.me/18636515147"
              target="_blank"
              rel="noopener"
              className="pill btn-navy cta-header"
              style={s(`display:inline-flex;align-items:center;gap:10px;background:#110366;color:#FEFAFF;padding:11px 22px;border-radius:999px;font-family:${UI};font-size:13px;letter-spacing:0.04em;white-space:nowrap`)}
            >
              <span className="cta-long">Agenda tu cita</span>
              <span className="cta-short">Agendar</span>
            </a>
          </div>
        </div>
        {/* Menú móvil: siempre en el HTML, oculto hasta abrirlo */}
        <div
          className="nav-narrow"
          style={s(`${mob ? "" : "display:none;"}flex-direction:column;gap:2px;padding:12px 0 22px;border-top:1px solid rgba(17,3,102,0.1);font-family:${UI};font-size:15px;max-height:75vh;overflow-y:auto`)}
        >
          <Link href="/irina-perez/" style={s("padding:10px 0")}>Sobre Irina</Link>
          <Link href="/terapias/" style={s("padding:10px 0 4px")}>Terapias</Link>
          {groups.map((g) => (
            <div key={g.cat} style={s("display:flex;flex-direction:column")}>
              <span style={s("padding:8px 0 2px 14px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#A56CF0")}>{g.cat}</span>
              {g.items.map((x) => (
                <Link key={x.slug} href={serviceHref(x.slug)} style={s("padding:7px 0 7px 28px")}>{x.name}</Link>
              ))}
            </div>
          ))}
          <Link href="/experiencias/" style={s("padding:14px 0 4px")}>Experiencias</Link>
          <Link href="/experiencias/integral-premium/" style={s(mobLink)}>Integral Premium · $165</Link>
          <Link href="/experiencias/armonia/" style={s(mobLink)}>Armonía · $95</Link>
          <Link href="/experiencias/renacer/" style={s(mobLink)}>Renacer · $85</Link>
          <Link href="/blog/" style={s("padding:14px 0 10px")}>Blog</Link>
          <Link href="/#preguntas" style={s("padding:10px 0")}>Preguntas</Link>
          <Link href="/#contacto" style={s("padding:10px 0")}>Contacto</Link>
        </div>
      </nav>
    </header>
  );
}
