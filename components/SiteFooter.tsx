import Link from "next/link";
import { s, SCRIPT, UI } from "@/lib/s";
import { DATA } from "@/lib/data";

const col = (cat: string[]) => DATA.services.filter((x) => cat.includes(x.cat));
const lk = `color:rgba(254,250,255,0.72)`;
const navCss = `display:flex;flex-direction:column;gap:10px;font-family:${UI};font-size:14px`;

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
        <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:36px;padding:48px 0")}>
          <div>
            <div style={s(`font-family:${SCRIPT};font-size:44px;line-height:1`)}>AnamGra</div>
            <div style={s("font-size:20px;margin-top:4px")}>Holistic Therapy</div>
            <address style={s(`font-style:normal;margin:14px 0 0;font-family:${UI};font-size:14px;line-height:1.7;opacity:0.78`)}>
              Orlando, Florida · Atención virtual<br />
              {b.modality}
            </address>
          </div>
          <nav aria-label="Terapias energéticas y emocionales" style={s(navCss)}>
            <span style={s("font-weight:500;margin-bottom:4px")}>Energía y emoción</span>
            {col(["Energéticas", "Mente y emoción"]).map((x) => (
              <Link key={x.slug} href={`/terapias/${x.slug}/`} className="hv-gold" style={s(lk)}>{x.name}</Link>
            ))}
          </nav>
          <nav aria-label="Terapias corporales" style={s(navCss)}>
            <span style={s("font-weight:500;margin-bottom:4px")}>Cuerpo</span>
            {col(["Corporales"]).map((x) => (
              <Link key={x.slug} href={`/terapias/${x.slug}/`} className="hv-gold" style={s(lk)}>{x.name}</Link>
            ))}
          </nav>
          <div style={s(navCss)}>
            <span style={s("font-weight:500;margin-bottom:4px")}>Contacto</span>
            <a href={b.wa} target="_blank" rel="noopener" className="hv-gold" style={s(lk)}>WhatsApp {b.phoneLabel}</a>
            <a href={b.ig} target="_blank" rel="noopener" className="hv-gold" style={s(lk)}>{b.igLabel}</a>
            <a href={`mailto:${b.email}`} className="hv-gold" style={s(lk)}>{b.email}</a>
            <Link href="/blog/" className="hv-gold" style={s(lk)}>Blog</Link>
          </div>
        </div>
        <p style={s(`margin:0;font-family:${UI};font-size:13px;opacity:0.6`)}>
          © 2026 AnamGra Holistic Therapy. Estas sesiones son un acompañamiento de bienestar integral y no sustituyen la atención médica de urgencias.
        </p>
      </div>
    </footer>
  );
}
