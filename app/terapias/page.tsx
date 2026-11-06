import type { Metadata } from "next";
import { DATA } from "@/lib/data";
import { terapiasLd, terapiasMeta } from "@/lib/seo";
import { A, Crumbs, CtaBanner, Eyebrow, JsonLd, iconSrc, planHref, postHref, s, SCRIPT, UI, serviceHref } from "@/components/ui";
import { postsForServices } from "@/lib/links";

export const metadata: Metadata = terapiasMeta();

const INTRO: Record<string, string> = {
  "Energéticas": "Prácticas de relajación, introspección y conexión espiritual.",
  "Corporales": "Técnicas manuales para soltar tensión y cuidar tu cuerpo.",
  "Mente y emoción": "Acompañamiento para tus emociones y tu bienestar personal.",
};

/** Primera frase de la respuesta directa, sin marcadores de borrador. */
const lead = (answer: string) => answer.replace(/^\[[^\]]*\]\s*/, "").split(". ")[0].replace(/\.$/, "") + ".";

export default function TerapiasPage() {
  return (
    <main>
      <JsonLd data={terapiasLd()} />

      <section style={s("position:relative;padding:150px 24px 70px")}>
        <div className="blob" style={s("position:absolute;top:-120px;left:-160px;width:520px;height:520px;border-radius:50%;background:#D8C7FA;opacity:0.45")} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/orchid.png" alt="" style={s("position:absolute;top:0;right:0;width:min(260px,26vw);pointer-events:none")} />
        <div style={s("position:relative;max-width:1180px;margin:0 auto")}>
          <Crumbs items={[{ name: "Inicio", href: "/" }, { name: "Terapias" }]} />
          <div style={s("text-align:center")}>
            <Eyebrow>AnamGra Holistic Therapy</Eyebrow>
            <h1 style={s("margin:0;font-weight:400;font-size:clamp(44px,7vw,88px);line-height:1.04;text-wrap:balance")}>Terapias holísticas en Orlando y online</h1>
            <p style={s(`margin:10px 0 0;font-family:${SCRIPT};font-size:clamp(30px,4vw,48px);line-height:1.2`)}>Complementarias e integrativas</p>
            <p style={s("margin:24px auto 0;max-width:680px;font-size:20px;line-height:1.55;color:#3A2E80;text-wrap:pretty")}>
              {DATA.services.length} terapias para el cuerpo, la mente, las emociones y la energía, con la Dra. Irina Pérez. Elige una por separado o combínalas en una{" "}
              <A href="/experiencias/" css="color:#110366;border-bottom:1px solid #FDBF3B">experiencia</A>. Siempre con cita previa y como acompañamiento complementario a tu cuidado médico.
            </p>
          </div>
        </div>
      </section>

      {DATA.cats.map((cat, ci) => {
        const items = DATA.services.filter((x) => x.cat === cat);
        return (
          <section key={cat} id={cat.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "-")} style={s(`padding:70px 24px;${ci % 2 === 0 ? "background:rgba(243,233,252,0.62)" : ""}`)}>
            <div style={s("max-width:1180px;margin:0 auto")}>
              <h2 style={s("margin:0;font-weight:400;font-size:clamp(34px,4.6vw,56px);line-height:1.05")}>{cat}</h2>
              <p style={s(`margin:6px 0 36px;font-family:${SCRIPT};font-size:clamp(26px,3vw,34px)`)}>{INTRO[cat]}</p>
              <ul style={s("list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:22px")}>
                {items.map((x) => {
                  const posts = postsForServices([x.slug]);
                  return (
                    <li key={x.slug} style={s("display:flex;flex-direction:column;padding:28px;border-radius:24px;background:rgba(254,250,255,0.82);box-shadow:rgba(17,3,102,0.04) 0 0 0 1px, rgba(17,3,102,0.05) 0 12px 12px -6px")}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={iconSrc(x.icon)} alt="" width={96} height={106} style={s("width:96px;height:106px;object-fit:contain;margin-bottom:16px")} />
                      <h3 style={s("margin:0 0 8px;font-weight:400;font-size:26px;letter-spacing:0.02em;text-transform:uppercase")}>
                        <A href={serviceHref(x.slug)} css="color:#110366">{x.name}</A>
                      </h3>
                      <span style={s(`font-family:${UI};font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#A56CF0;margin-bottom:12px`)}>{x.mode}</span>
                      <p style={s("margin:0 0 20px;font-size:17px;line-height:1.55;color:#3A2E80;flex:1;text-wrap:pretty")}>{lead(x.answer)}</p>
                      {x.plans.length > 0 && (
                        <p style={s(`margin:0 0 16px;font-family:${UI};font-size:13px;line-height:1.5;color:rgba(17,3,102,0.75)`)}>
                          Incluida en:{" "}
                          {x.plans.map((n, i) => {
                            const pl = DATA.plans.find((p) => p.name === n)!;
                            return (
                              <span key={n}>
                                {i > 0 && " · "}
                                <A href={planHref(pl.slug)} css="color:#110366;border-bottom:1px solid #FDBF3B">Experiencia {n}</A>
                              </span>
                            );
                          })}
                        </p>
                      )}
                      <div style={s(`display:flex;flex-wrap:wrap;gap:8px 18px;font-family:${UI};font-size:13px;letter-spacing:0.04em`)}>
                        <A href={serviceHref(x.slug)} cls="hv-purple" css="color:#110366;border-bottom:1px solid #FDBF3B;padding-bottom:3px">Conocer {x.name} →</A>
                        {posts[0] && <A href={postHref(posts[0].slug)} cls="hv-purple" css="color:rgba(17,3,102,0.7);padding-bottom:3px">Leer el artículo</A>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        );
      })}

      <section style={s("padding:90px 24px 70px")}>
        <div style={s("max-width:1180px;margin:0 auto;text-align:center")}>
          <h2 style={s("margin:0;font-weight:400;font-size:clamp(32px,4.2vw,50px);line-height:1.1")}>¿Prefieres combinar terapias?</h2>
          <p style={s("margin:14px auto 28px;max-width:600px;font-size:19px;line-height:1.55;color:#3A2E80")}>Nuestras experiencias reúnen varias terapias en una sola sesión.</p>
          <div style={s("display:flex;flex-wrap:wrap;gap:14px;justify-content:center")}>
            {DATA.plans.map((p) => (
              <A key={p.slug} href={planHref(p.slug)} pill cls="btn-ghost" css={`display:inline-flex;align-items:center;gap:10px;padding:14px 26px;border-radius:999px;border:1px solid rgba(17,3,102,0.25);color:#110366;font-family:${UI};font-size:14px`}>
                Experiencia {p.name} · ${p.price}
              </A>
            ))}
          </div>
          <p style={s(`margin:28px 0 0;font-family:${UI};font-size:14px;color:rgba(17,3,102,0.75)`)}>
            ¿Quieres saber más de la persona que te acompaña? <A href="/irina-perez/" css="color:#110366;border-bottom:1px solid #FDBF3B">Conoce a la Dra. Irina Pérez</A> o lee nuestro <A href="/blog/" css="color:#110366;border-bottom:1px solid #FDBF3B">blog de bienestar</A>.
          </p>
        </div>
      </section>

      <CtaBanner label="WhatsApp 863 651 5147" />
    </main>
  );
}
