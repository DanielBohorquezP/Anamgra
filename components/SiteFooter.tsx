import Link from "next/link";
import { s, SCRIPT, UI } from "@/lib/s";
import { DATA } from "@/lib/data";
import { planHref, postHref, serviceHref } from "@/lib/links";

const col = (cat: string[]) => DATA.services.filter((x) => cat.includes(x.cat));
const lk = `color:rgba(254,250,255,0.72)`;
const navCss = `display:flex;flex-direction:column;gap:10px;font-family:${UI};font-size:14px`;
const head = "font-weight:500;margin-bottom:4px";
const GRID = "display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:36px";

export default function SiteFooter() {
  const b = DATA.biz;
  return (
    <footer style={s("position:relative;overflow:hidden;background:#110366;color:#FEFAFF;padding:80px 24px 36px")}>
      <div
        aria-hidden="true"
        style={s(`position:absolute;left:50%;bottom:-0.18em;transform:translateX(-50%);font-family:${SCRIPT};font-size:clamp(180px,28vw,400px);line-height:1;color:rgba(255,255,255,0.06);white-space:nowrap;pointer-events:none;user-select:none`)}
      >
        AnamGra
      </div>
      <div style={s("position:relative;max-width:1280px;margin:0 auto")}>
        <div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:28px;padding-bottom:56px;border-bottom:1px solid rgba(255,255,255,0.14);font-family:${SCRIPT};font-size:30px;line-height:1.15`)}>
          <div>Terapias Holísticas</div>
          <div>Sanación Energética</div>
          <div>Bienestar Integral</div>
          <div>Con Amor, para tu Alma</div>
        </div>

        <div style={s(`${GRID};padding:48px 0 36px`)}>
          <div>
            <Link href="/" aria-label="AnamGra Holistic Therapy, inicio" style={s(`display:block;font-family:${SCRIPT};font-size:44px;line-height:1`)}>AnamGra</Link>
            <div style={s("font-size:20px;margin-top:4px")}>Holistic Therapy</div>
            <address style={s(`font-style:normal;margin:14px 0 0;font-family:${UI};font-size:14px;line-height:1.7;opacity:0.78`)}>
              Orlando, Florida · Atención virtual<br />
              {b.modality}
            </address>
          </div>
          <nav aria-label="Terapias energéticas y emocionales" style={s(navCss)}>
            <Link href="/terapias/" className="hv-gold" style={s(`${head};color:#FEFAFF`)}>Energía y emoción</Link>
            {col(["Energéticas", "Mente y emoción"]).map((x) => (
              <Link key={x.slug} href={serviceHref(x.slug)} className="hv-gold" style={s(lk)}>{x.name}</Link>
            ))}
          </nav>
          <nav aria-label="Terapias corporales" style={s(navCss)}>
            <Link href="/terapias/" className="hv-gold" style={s(`${head};color:#FEFAFF`)}>Cuerpo</Link>
            {col(["Corporales"]).map((x) => (
              <Link key={x.slug} href={serviceHref(x.slug)} className="hv-gold" style={s(lk)}>{x.name}</Link>
            ))}
          </nav>
          <nav aria-label="Experiencias" style={s(navCss)}>
            <Link href="/experiencias/" className="hv-gold" style={s(`${head};color:#FEFAFF`)}>Experiencias</Link>
            {DATA.plans.map((p) => (
              <Link key={p.slug} href={planHref(p.slug)} className="hv-gold" style={s(lk)}>{p.name} · ${p.price}</Link>
            ))}
            <Link href="/experiencias/" className="hv-gold" style={s(lk)}>Comparar experiencias</Link>
          </nav>
          <nav aria-label="Explora el sitio" style={s(navCss)}>
            <span style={s(head)}>Explora</span>
            <Link href="/" className="hv-gold" style={s(lk)}>Inicio</Link>
            <Link href="/irina-perez/" className="hv-gold" style={s(lk)}>Sobre la Dra. Irina Pérez</Link>
            <Link href="/terapias/" className="hv-gold" style={s(lk)}>Todas las terapias</Link>
            <Link href="/blog/" className="hv-gold" style={s(lk)}>Blog</Link>
            <Link href="/#preguntas" className="hv-gold" style={s(lk)}>Preguntas frecuentes</Link>
            <Link href="/#contacto" className="hv-gold" style={s(lk)}>Contacto</Link>
          </nav>
          <div style={s(navCss)}>
            <span style={s(head)}>Contacto</span>
            <a href={b.wa} target="_blank" rel="noopener" className="hv-gold" style={s(lk)}>WhatsApp {b.phoneLabel}</a>
            <a href={b.ig} target="_blank" rel="noopener" className="hv-gold" style={s(lk)}>{b.igLabel}</a>
            <a href={`mailto:${b.email}`} className="hv-gold" style={s(lk)}>{b.email}</a>
          </div>
        </div>

        <nav aria-label="Artículos del blog" style={s(`padding:32px 0 40px;border-top:1px solid rgba(255,255,255,0.14);font-family:${UI}`)}>
          <Link href="/blog/" className="hv-gold" style={s("display:inline-block;font-weight:500;margin-bottom:16px;color:#FEFAFF")}>Del blog</Link>
          <ul style={s("list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px 36px;font-size:14px;line-height:1.4")}>
            {DATA.posts.map((p) => (
              <li key={p.slug}>
                <Link href={postHref(p.slug)} className="hv-gold" style={s(lk)}>{p.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <p style={s(`margin:0;font-family:${UI};font-size:13px;opacity:0.6`)}>
          © 2026 AnamGra Holistic Therapy. Estas sesiones son un acompañamiento de bienestar integral y no sustituyen la atención médica de urgencias.
        </p>
        <p style={s(`margin:10px 0 0;font-family:${UI};font-size:13px;opacity:0.6`)}>
          Desarrollo y SEO por{" "}
          <a href="https://www.oppi.digital/" target="_blank" rel="noopener" style={s("color:inherit;border-bottom:1px solid rgba(254,250,255,0.5)")}>
            Oppi
          </a>
        </p>
      </div>
    </footer>
  );
}
