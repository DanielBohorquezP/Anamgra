import type { Metadata } from "next";
import { DATA } from "@/lib/data";
import { experienciasLd, experienciasMeta } from "@/lib/seo";
import { A, Crumbs, CtaBanner, Eyebrow, JsonLd, WA, iconSrc, planHref, s, SCRIPT, UI, serviceHref } from "@/components/ui";

export const metadata: Metadata = experienciasMeta();

const badge = (b: string) => iconSrc(b);

export default function ExperienciasPage() {
  return (
    <main>
      <JsonLd data={experienciasLd()} />

      <section style={s("position:relative;padding:150px 24px 70px")}>
        <div className="blob" style={s("position:absolute;top:-120px;left:-160px;width:520px;height:520px;border-radius:50%;background:#D8C7FA;opacity:0.45")} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/orchid.png" alt="" style={s("position:absolute;top:0;right:0;width:min(260px,26vw);pointer-events:none")} />
        <div style={s("position:relative;max-width:1180px;margin:0 auto")}>
          <Crumbs items={[{ name: "Inicio", href: "/" }, { name: "Experiencias" }]} />
          <div style={s("text-align:center")}>
            <Eyebrow>Planes de bienestar</Eyebrow>
            <h1 style={s("margin:0;font-weight:400;font-size:clamp(44px,7vw,88px);line-height:1.04;text-wrap:balance")}>Experiencias de bienestar en Orlando</h1>
            <p style={s("margin:24px auto 0;max-width:680px;font-size:20px;line-height:1.55;color:#3A2E80;text-wrap:pretty")}>
              Sesiones que combinan varias <A href="/terapias/" css="color:#110366;border-bottom:1px solid #FDBF3B">terapias</A> en un solo encuentro con la Dra. Irina Pérez, para equilibrar cuerpo, mente, emociones y energía. Compara y elige la que mejor se adapte a ti.
            </p>
          </div>
        </div>
      </section>

      <section style={s("padding:20px 24px 90px")}>
        <div style={s("max-width:1180px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,330px),1fr));gap:24px;align-items:stretch")}>
          {DATA.plans.map((p) => (
            <article key={p.slug} style={s("display:flex;flex-direction:column;border-radius:28px;padding:36px 32px;background:#FEFAFF;color:#110366;border:1.5px solid rgba(17,3,102,0.85);box-shadow:rgba(17,3,102,0.06) 0px 24px 48px -16px")}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={badge(p.badge)} alt="" style={s("height:56px;width:auto;object-fit:contain;align-self:flex-start;margin-bottom:20px")} />
              <span style={s(`font-family:${UI};font-size:12px;letter-spacing:0.22em;text-transform:uppercase;opacity:0.8`)}>Experiencia</span>
              <h2 style={s("margin:4px 0 6px;font-weight:400;font-size:34px;letter-spacing:0.02em;text-transform:uppercase;line-height:1.1")}>
                <A href={planHref(p.slug)} css="color:#110366">{p.name}</A>
              </h2>
              <p style={s(`margin:0 0 14px;font-family:${SCRIPT};font-size:28px;line-height:1.2;color:#A56CF0`)}>{p.tagline}</p>
              <p style={s("margin:0 0 22px;font-size:17px;line-height:1.55;text-wrap:pretty")}>{p.desc}</p>
              <ul style={s("list-style:none;margin:0 0 26px;padding:0;display:flex;flex-direction:column;gap:10px;flex:1")}>
                {p.steps.map((st) => (
                  <li key={st.name} style={s("display:grid;grid-template-columns:44px 1fr;gap:12px;align-items:center")}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={iconSrc(st.icon)} alt="" width={44} height={44} style={s("width:44px;height:44px;object-fit:contain")} />
                    <span style={s("font-size:18px;line-height:1.25")}>
                      {st.slug ? <A href={serviceHref(st.slug)} css="color:#110366;border-bottom:1px solid #FDBF3B">{st.name}</A> : st.name}
                    </span>
                  </li>
                ))}
              </ul>
              <div style={s("padding-top:20px;border-top:1px solid rgba(17,3,102,0.14)")}>
                <div style={s("font-size:46px;line-height:1")}>${p.price}</div>
                <div style={s(`font-family:${UI};font-size:13px;letter-spacing:0.06em;opacity:0.8;margin:6px 0 18px`)}>{p.duration} minutos · {p.mode}</div>
                <div style={s(`display:flex;flex-wrap:wrap;align-items:center;gap:12px 18px;font-family:${UI}`)}>
                  <A href={WA} pill cls="btn-navy" css="display:inline-flex;padding:13px 24px;border-radius:999px;background:#110366;color:#FEFAFF;font-size:13px;letter-spacing:0.04em">Reservar</A>
                  <A href={planHref(p.slug)} css="font-size:13px;letter-spacing:0.04em;border-bottom:1px solid #FDBF3B;padding-bottom:2px;color:#110366">Ver detalles de {p.name} →</A>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={s("padding:0 24px 90px")}>
        <div style={s("max-width:1180px;margin:0 auto;padding:44px;border-radius:28px;background:rgba(243,233,252,0.62);text-align:center")}>
          <h2 style={s("margin:0;font-weight:400;font-size:clamp(28px,3.6vw,42px);line-height:1.15")}>¿Prefieres una sola terapia?</h2>
          <p style={s("margin:12px auto 22px;max-width:560px;font-size:18px;line-height:1.55;color:#3A2E80")}>Cada terapia también se agenda por separado.</p>
          <div style={s(`display:flex;flex-wrap:wrap;gap:10px;justify-content:center;font-family:${UI};font-size:14px`)}>
            {DATA.services.map((x) => (
              <A key={x.slug} href={serviceHref(x.slug)} cls="hv-lav2" css="padding:9px 18px;border-radius:999px;border:1px solid rgba(17,3,102,0.2);background:#FEFAFF;color:#110366">{x.name}</A>
            ))}
          </div>
          <p style={s(`margin:24px 0 0;font-family:${UI};font-size:14px`)}>
            <A href="/terapias/" css="color:#110366;border-bottom:1px solid #FDBF3B">Ver todas las terapias →</A>
          </p>
        </div>
      </section>

      <CtaBanner label="Reservar por WhatsApp · 863 651 5147" />
    </main>
  );
}
