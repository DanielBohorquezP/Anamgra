import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DATA } from "@/lib/data";
import { planLd, planMeta } from "@/lib/seo";
import { A, AuthorCard, Crumbs, CtaBanner, Faq, JsonLd, WA, iconSrc, planHref, s, SCRIPT, UI, serviceHref } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => DATA.plans.map((p) => ({ slug: p.slug }));

const find = (slug: string) => DATA.plans.find((p) => p.slug === slug);
const badge = (b: string) => iconSrc(b);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = find((await params).slug);
  return p ? planMeta(p) : {};
}

export default async function ExperienciaPage({ params }: Props) {
  const p = find((await params).slug);
  if (!p) notFound();

  const facts = [
    ["Precio", `$${p.price} USD`],
    ["Duración", `${p.duration} minutos`],
    ["Incluye", p.incl],
    ["Modalidad", p.mode],
    ["Ubicación", "Orlando, Florida · Atención virtual"],
    ["Reserva", "Con cita previa y pago anticipado"],
  ];
  const others = DATA.plans.filter((x) => x.slug !== p.slug);

  return (
    <main>
      <JsonLd data={planLd(p)} />

      <section style={s("position:relative;padding:140px 24px 90px")}>
        <div className="blob" style={s("position:absolute;top:-120px;left:-160px;width:520px;height:520px;border-radius:50%;background:#D8C7FA;opacity:0.45")} />
        {/* eslint-disable @next/next/no-img-element */}
        <img src="/assets/orchid.png" alt="" style={s("position:absolute;top:0;right:0;width:min(260px,26vw);pointer-events:none")} />
        <img src="/assets/leaves.png" alt="" style={s("position:absolute;bottom:0;right:0;width:min(150px,15vw);pointer-events:none")} />
        <img src="/assets/flowers-l.png" alt="" style={s("position:absolute;bottom:20px;left:0;width:min(120px,13vw);pointer-events:none")} />
        <div style={s("position:relative;max-width:1000px;margin:0 auto")}>
          <Crumbs mb={40} items={[{ name: "Inicio", href: "/" }, { name: "Experiencias", href: "/#experiencias" }, { name: p.name }]} />
          <div style={s("display:flex;flex-direction:column;align-items:center;text-align:center")}>
            <img src={badge(p.badge)} alt="" style={s("height:72px;width:auto;object-fit:contain;margin-bottom:18px")} />
            <span style={s(`font-family:${UI};font-size:13px;letter-spacing:0.3em;text-transform:uppercase;color:#A56CF0`)}>Experiencia · AnamGra Holistic Therapy</span>
            <h1 style={s("margin:14px 0 0;font-weight:400;font-size:clamp(44px,7vw,84px);line-height:1.02;text-transform:uppercase;letter-spacing:0.01em;text-wrap:balance")}>Experiencia {p.name}</h1>
            <p style={s("margin:24px 0 0;background:#110366;color:#FEFAFF;border-radius:999px;padding:16px 40px;font-size:clamp(20px,2.6vw,28px);line-height:1.3")}>{p.tagline}</p>
            <p style={s("margin:24px auto 0;max-width:640px;font-size:clamp(19px,2vw,23px);line-height:1.5")}>{p.desc}</p>
          </div>

          <div style={s("margin:44px auto 0;max-width:880px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));align-items:center;gap:0;border:2px solid #110366;border-radius:24px;background:#FEFAFF;overflow:hidden")}>
            <div style={s("padding:26px 30px")}>
              <div style={s("font-size:clamp(22px,2.6vw,28px);text-transform:uppercase;line-height:1.15")}>Experiencia {p.name}</div>
              <div style={s("font-size:19px;margin-top:6px;color:#3A2E80")}>{p.incl}</div>
            </div>
            <div style={s("display:flex;align-items:center;justify-content:space-between;gap:20px;padding:26px 30px;border-left:1px solid rgba(253,191,59,0.7)")}>
              <div>
                <div style={s("font-size:46px;line-height:1")}>${p.price}</div>
                <div style={s("font-size:20px;margin-top:4px")}>{p.duration} minutos</div>
              </div>
              <A href={WA} pill cls="btn-navy" css={`display:inline-flex;padding:15px 26px;border-radius:999px;background:#110366;color:#FEFAFF;font-family:${UI};font-size:14px;letter-spacing:0.04em;white-space:nowrap`}>Reservar →</A>
            </div>
          </div>

          <div style={s("margin:28px auto 0;max-width:880px;padding:24px 28px;background:rgba(254,250,255,0.82);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border-radius:20px;border:1px solid rgba(17,3,102,0.12)")}>
            <h2 style={s(`margin:0 0 10px;font-family:${UI};font-weight:500;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#A56CF0`)}>En resumen</h2>
            <p style={s("margin:0;font-size:19px;line-height:1.6;text-wrap:pretty")}>{p.answer}</p>
            <p style={s(`margin:14px 0 0;font-family:${UI};font-size:13px;color:rgba(17,3,102,0.7)`)}>
              Diseñada por <A href="#autora" css="color:#110366;border-bottom:1px solid #FDBF3B">Dra. Irina Pérez</A> · Actualizado el <time dateTime={DATA.updated}>{DATA.updatedLabel}</time>
            </p>
          </div>
        </div>
      </section>

      <section style={s("padding:96px 24px;background:rgba(243,233,252,0.62)")}>
        <div style={s("max-width:1180px;margin:0 auto")}>
          <h2 style={s("margin:0;font-weight:400;font-size:clamp(38px,5.5vw,64px);line-height:1.05;text-align:center")}>Qué incluye</h2>
          <p style={s(`margin:6px 0 48px;text-align:center;font-family:${SCRIPT};font-size:clamp(30px,3.6vw,42px)`)}>paso a paso</p>
          <ol style={s("list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-start;gap:12px")}>
            {p.steps.map((st, i) => (
              <li key={st.name} style={s("display:flex;align-items:flex-start;gap:12px")}>
                {i > 0 && <span aria-hidden="true" style={s(`font-family:${UI};font-weight:300;font-size:56px;line-height:1;color:#FDBF3B;margin-top:34px`)}>+</span>}
                <div style={s("width:220px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px;padding:10px")}>
                  <img src={iconSrc(st.icon)} alt="" width={120} height={130} style={s("width:120px;height:130px;object-fit:contain")} />
                  <h3 style={s("margin:0;font-weight:400;font-size:22px;line-height:1.2")}>{st.name}</h3>
                  <p style={s("margin:0;font-size:16px;line-height:1.5;color:#3A2E80")}>{st.desc}</p>
                  {st.slug && <A href={serviceHref(st.slug)} css={`font-family:${UI};font-size:12px;letter-spacing:0.04em;border-bottom:1px solid #FDBF3B;padding-bottom:2px`}>Sobre esta terapia →</A>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section style={s("padding:100px 24px")}>
        <div style={s("max-width:1180px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:56px;align-items:start")}>
          <div>
            <h2 style={s("margin:0 0 24px;font-weight:400;font-size:clamp(32px,4vw,48px);line-height:1.1")}>¿Para quién es?</h2>
            <ul style={s("list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:14px")}>
              {p.forWho.map((w) => (
                <li key={w} style={s("display:grid;grid-template-columns:28px 1fr;gap:12px;align-items:start;font-size:19px;line-height:1.45")}>
                  <span style={s("width:10px;height:10px;border-radius:50%;background:#FDBF3B;margin-top:9px")} />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
            <div style={s("margin-top:34px;display:grid;grid-template-columns:64px 1fr;gap:18px;align-items:start;padding:24px;border-radius:20px;background:#FEFAFF;border:1.5px solid #110366")}>
              <img src="/assets/i-alerta.png" alt="" style={s("width:64px;height:70px;object-fit:contain")} />
              <div>
                <h3 style={s("margin:0 0 6px;font-weight:400;font-size:19px;text-transform:uppercase;letter-spacing:0.02em")}>Ten en cuenta</h3>
                <p style={s("margin:0;font-size:17px;line-height:1.55")}>Es un acompañamiento de bienestar integral y no sustituye la atención médica ni de urgencias. Si tienes una condición de salud, estás embarazada o tomas medicación, coméntalo antes de tu sesión.</p>
              </div>
            </div>
          </div>
          <aside aria-label="Datos clave" style={s("background:#110366;color:#FEFAFF;border-radius:28px;padding:34px 32px")}>
            <div style={s(`font-family:${UI};font-size:12px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.75;margin-bottom:10px`)}>Datos clave</div>
            <dl style={s("margin:0")}>
              {facts.map(([k, v]) => (
                <div key={k} style={s("display:grid;grid-template-columns:120px 1fr;gap:16px;padding:14px 0;border-top:1px solid rgba(255,255,255,0.14)")}>
                  <dt style={s(`font-family:${UI};font-size:12px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.7;padding-top:3px`)}>{k}</dt>
                  <dd style={s("margin:0;font-size:18px;line-height:1.35")}>{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section style={s("padding:0 24px 100px")}>
        <div style={s("max-width:1180px;margin:0 auto")}>
          <h2 style={s("margin:0 0 28px;font-weight:400;font-size:clamp(30px,4vw,44px)")}>Otras experiencias</h2>
          <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:20px")}>
            {others.map((o) => (
              <A key={o.slug} href={planHref(o.slug)} cls="card-hover" css="display:grid;grid-template-columns:64px 1fr auto;gap:18px;align-items:center;padding:24px;border-radius:22px;background:#FEFAFF;border:1.5px solid #110366;color:#110366">
                <img src={badge(o.badge)} alt="" style={s("width:64px;height:56px;object-fit:contain")} />
                <div>
                  <div style={s("font-size:24px;text-transform:uppercase;line-height:1.1")}>{o.name}</div>
                  <div style={s(`font-family:${UI};font-size:13px;color:rgba(17,3,102,0.7);margin-top:4px`)}>{o.incl}</div>
                </div>
                <div style={s("text-align:right")}>
                  <div style={s("font-size:32px;line-height:1")}>${o.price}</div>
                  <div style={s(`font-family:${UI};font-size:12px;margin-top:4px`)}>{o.duration} min</div>
                </div>
              </A>
            ))}
          </div>
        </div>
      </section>

      <AuthorCard maxPhoto={260} />

      <Faq items={[...p.faqs, ...DATA.commonFaqs]} sub={`sobre la Experiencia ${p.name}`} />

      <CtaBanner pad="100px 24px 110px" label="Reservar por WhatsApp · 863 651 5147" />
    </main>
  );
}
