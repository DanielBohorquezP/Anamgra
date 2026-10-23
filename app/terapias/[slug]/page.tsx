import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DATA } from "@/lib/data";
import { isVirtual, serviceLd, serviceMeta } from "@/lib/seo";
import { A, AuthorCard, Crumbs, CtaBanner, Eyebrow, Faq, JsonLd, WA, iconSrc, planHref, postHref, s, SCRIPT, UI, serviceHref } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => DATA.services.map((x) => ({ slug: x.slug }));

const find = (slug: string) => DATA.services.find((x) => x.slug === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sv = find((await params).slug);
  return sv ? serviceMeta(sv) : {};
}

const PLAN_INFO: Record<string, { slug: string; price: string; dur: string; incl: string }> = {
  "Integral Premium": { slug: "integral-premium", price: "$165", dur: "90 minutos", incl: "Reiki + Consulta + Esencia floral" },
  "Armonía": { slug: "armonia", price: "$95", dur: "60 minutos", incl: "Reiki + Terapia con Ángeles" },
  "Renacer": { slug: "renacer", price: "$85", dur: "60 minutos", incl: "Baño de pies + Reflexología + Exfoliación + Meditación" },
};

const GLASS = "background:rgba(254,250,255,0.82);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)";

export default async function ServicioPage({ params }: Props) {
  const sv = find((await params).slug);
  if (!sv) notFound();

  const virtual = isVirtual(sv);
  const where = virtual ? "en Orlando, FL y online" : "en Orlando, FL";
  const plans = sv.plans.map((n) => ({ name: n, ...PLAN_INFO[n] }));
  const facts = [
    ["Modalidad", sv.mode],
    ["Duración", "Aprox. 60 minutos"],
    ["Ubicación", "Orlando, Florida · Atención virtual"],
    ["Reserva", "Con cita previa y pago anticipado"],
    ["Incluido en", plans.length ? plans.map((p) => `Experiencia ${p.name}`).join(" · ") : "Sesión individual"],
  ];
  const steps = [
    ["1", "Agenda tu cita", "Escríbenos por WhatsApp o Instagram. Las sesiones se realizan únicamente con cita previa."],
    ["2", "Confirma tu reserva", "Tu cita queda confirmada una vez recibido el pago correspondiente."],
    ["3", virtual ? "Vive tu sesión, en línea o presencial" : "Vive tu sesión presencial", virtual ? "Desde la comodidad y privacidad de tu hogar, o en persona. Duración aproximada de 60 minutos." : "En Orlando, Florida. Duración aproximada de 60 minutos."],
    ["4", "Integra la experiencia", "Recibe recomendaciones para continuar tu proceso de bienestar en el día a día."],
  ];
  const related = DATA.services.filter((x) => x.cat === sv.cat && x.slug !== sv.slug);
  const posts = DATA.posts.filter((p) => p.related.includes(sv.slug));

  return (
    <main>
      <JsonLd data={serviceLd(sv)} />

      <section style={s("position:relative;padding:140px 24px 80px")}>
        <div className="blob" style={s("position:absolute;top:-140px;right:-160px;width:520px;height:520px;border-radius:50%;background:#D8C7FA;opacity:0.4")} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/orchid.png" alt="" style={s("position:absolute;top:0;right:0;width:min(240px,24vw);pointer-events:none;opacity:0.9")} />
        <div style={s("position:relative;max-width:1180px;margin:0 auto")}>
          <Crumbs items={[{ name: "Inicio", href: "/" }, { name: "Terapias", href: "/#terapias" }, { name: sv.name }]} />
          <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:56px;align-items:start")}>
            <div>
              <Eyebrow css="margin-bottom:16px">Terapias {sv.cat}</Eyebrow>
              <h1 style={s("margin:0;font-weight:400;font-size:clamp(44px,6.5vw,80px);line-height:1.02;text-wrap:balance")}>{sv.name} {where}</h1>
              <p style={s(`margin:10px 0 0;font-family:${SCRIPT};font-size:clamp(28px,3.4vw,40px);line-height:1.2`)}>Complementarias e integrativas</p>
              <div style={s(`margin-top:30px;padding:24px 26px;${GLASS};border-radius:20px;border:1px solid rgba(17,3,102,0.12)`)}>
                <h2 style={s(`margin:0 0 10px;font-family:${UI};font-weight:500;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#A56CF0`)}>¿Qué es {sv.name}?</h2>
                <p style={s("margin:0;font-size:20px;line-height:1.55;text-wrap:pretty")}>{sv.answer}</p>
              </div>
              <div style={s(`display:flex;flex-wrap:wrap;gap:14px;margin-top:30px;font-family:${UI}`)}>
                <A href={WA} pill cls="btn-navy" css="display:inline-flex;align-items:center;gap:10px;background:#110366;color:#FEFAFF;padding:16px 30px;border-radius:999px;font-size:14px;letter-spacing:0.04em;white-space:nowrap">Agenda {sv.name} por WhatsApp →</A>
                <A href="#preguntas" pill cls="btn-ghost" css="display:inline-flex;align-items:center;padding:16px 30px;border-radius:999px;border:1px solid rgba(17,3,102,0.25);color:#110366;font-size:14px;letter-spacing:0.04em;white-space:nowrap">Preguntas frecuentes</A>
              </div>
              <p style={s(`margin:26px 0 0;font-family:${UI};font-size:13px;color:rgba(17,3,102,0.7)`)}>
                Revisado por <A href="#autora" css="color:#110366;border-bottom:1px solid #FDBF3B">Dra. Irina Pérez</A> · Actualizado el <time dateTime={DATA.updated}>{DATA.updatedLabel}</time>
              </p>
            </div>
            <aside aria-label="Datos clave" style={s("background:#110366;color:#FEFAFF;border-radius:28px;padding:34px 32px;box-shadow:rgba(17,3,102,0.18) 0 30px 60px -20px")}>
              <div style={s("display:flex;align-items:center;gap:18px;margin-bottom:24px")}>
                <div style={s("width:96px;height:96px;border-radius:50%;background:#FEFAFF;display:flex;align-items:center;justify-content:center;flex-shrink:0")}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={iconSrc(sv.icon)} alt={`Ícono de ${sv.name}`} width={90} height={90} style={s("width:90px;height:90px;object-fit:contain")} />
                </div>
                <div>
                  <div style={s(`font-family:${UI};font-size:12px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.75`)}>Datos clave</div>
                  <div style={s("font-size:28px;line-height:1.1;margin-top:4px")}>{sv.name}</div>
                </div>
              </div>
              <dl style={s("margin:0;display:grid;gap:0")}>
                {facts.map(([k, v]) => (
                  <div key={k} style={s("display:grid;grid-template-columns:120px 1fr;gap:16px;padding:14px 0;border-top:1px solid rgba(255,255,255,0.14)")}>
                    <dt style={s(`font-family:${UI};font-size:12px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.7;padding-top:3px`)}>{k}</dt>
                    <dd style={s("margin:0;font-size:18px;line-height:1.35")}>{v}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section style={s("padding:90px 24px;background:rgba(243,233,252,0.62)")}>
        <div style={s("max-width:1180px;margin:0 auto")}>
          <h2 style={s("margin:0 0 40px;font-weight:400;font-size:clamp(36px,5vw,60px);line-height:1.05;text-align:center")}>Beneficios de {sv.name}</h2>
          <ul style={s("list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:20px")}>
            {sv.benefits.map((b) => (
              <li key={b} style={s(`${GLASS};border-radius:22px;padding:28px 26px;display:flex;flex-direction:column;gap:14px;box-shadow:rgba(17,3,102,0.04) 0 0 0 1px, rgba(17,3,102,0.05) 0 12px 24px -12px`)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/lotus.png" alt="" style={s("width:40px")} />
                <span style={s("font-size:20px;line-height:1.35")}>{b}</span>
              </li>
            ))}
          </ul>
          <p style={s(`margin:28px auto 0;max-width:720px;text-align:center;font-family:${UI};font-size:14px;line-height:1.6;color:rgba(17,3,102,0.72)`)}>Los beneficios descritos se refieren a la experiencia de bienestar y pueden variar en cada persona.</p>
        </div>
      </section>

      <section style={s("padding:100px 24px")}>
        <div style={s("max-width:1180px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:56px")}>
          <div>
            <h2 style={s("margin:0 0 24px;font-weight:400;font-size:clamp(32px,4vw,48px);line-height:1.1")}>¿Para quién es {sv.name}?</h2>
            <ul style={s("list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:14px")}>
              {sv.forWho.map((w) => (
                <li key={w} style={s("display:grid;grid-template-columns:28px 1fr;gap:12px;align-items:start;font-size:19px;line-height:1.45")}>
                  <span style={s("width:10px;height:10px;border-radius:50%;background:#FDBF3B;margin-top:9px")} />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
            <div style={s("margin-top:34px;display:grid;grid-template-columns:64px 1fr;gap:18px;align-items:start;padding:24px;border-radius:20px;background:#FEFAFF;border:1.5px solid #110366")}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/i-alerta.png" alt="" style={s("width:64px;height:70px;object-fit:contain")} />
              <div>
                <h3 style={s("margin:0 0 6px;font-weight:400;font-size:19px;text-transform:uppercase;letter-spacing:0.02em")}>Ten en cuenta</h3>
                <p style={s("margin:0;font-size:17px;line-height:1.55")}>Es un acompañamiento de bienestar integral y no sustituye la atención médica ni de urgencias. Si tienes una condición de salud, estás embarazada o tomas medicación, coméntalo antes de tu sesión.</p>
              </div>
            </div>
          </div>
          <div>
            <h2 style={s("margin:0 0 24px;font-weight:400;font-size:clamp(32px,4vw,48px);line-height:1.1")}>Cómo es tu sesión</h2>
            <ol style={s("list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:0")}>
              {steps.map(([n, t, d]) => (
                <li key={n} style={s("display:grid;grid-template-columns:56px 1fr;gap:18px;padding:20px 0;border-bottom:1px solid rgba(17,3,102,0.1)")}>
                  <span style={s("width:56px;height:56px;border-radius:50%;background:#D8C7FA;display:flex;align-items:center;justify-content:center;font-size:24px")}>{n}</span>
                  <div>
                    <h3 style={s("margin:4px 0 4px;font-weight:400;font-size:21px")}>{t}</h3>
                    <p style={s("margin:0;font-size:17px;line-height:1.5;color:#3A2E80")}>{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {plans.length > 0 && (
        <section style={s("padding:0 24px 100px")}>
          <div style={s("max-width:1180px;margin:0 auto;border-radius:28px;background:#110366;color:#FEFAFF;padding:48px 40px")}>
            <h2 style={s("margin:0 0 6px;font-weight:400;font-size:clamp(30px,4vw,44px)")}>Inclúyelo en una experiencia</h2>
            <p style={s(`margin:0 0 28px;font-family:${SCRIPT};font-size:32px;color:#FDBF3B`)}>Tu bienestar integral, en un solo plan</p>
            <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px")}>
              {plans.map((pl) => (
                <A key={pl.name} href={planHref(pl.slug)} cls="hv-glass" css="display:flex;justify-content:space-between;align-items:flex-end;gap:16px;padding:24px;border-radius:20px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.18);color:#FEFAFF">
                  <div>
                    <div style={s(`font-family:${UI};font-size:11px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.75`)}>Experiencia</div>
                    <div style={s("font-size:26px;text-transform:uppercase;margin-top:4px")}>{pl.name}</div>
                    <div style={s(`font-family:${UI};font-size:13px;opacity:0.8;margin-top:6px`)}>{pl.incl}</div>
                  </div>
                  <div style={s("text-align:right;flex-shrink:0")}>
                    <div style={s("font-size:36px;line-height:1")}>{pl.price}</div>
                    <div style={s(`font-family:${UI};font-size:12px;opacity:0.8;margin-top:4px`)}>{pl.dur}</div>
                  </div>
                </A>
              ))}
            </div>
          </div>
        </section>
      )}

      <AuthorCard links />

      <Faq items={[...sv.faqs, ...DATA.commonFaqs]} sub={`sobre ${sv.name}`} />

      <section style={s("padding:100px 24px")}>
        <div style={s("max-width:1180px;margin:0 auto")}>
          <h2 style={s("margin:0 0 30px;font-weight:400;font-size:clamp(30px,4vw,44px)")}>Otras terapias {sv.cat}</h2>
          <div style={s("display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:18px;margin-bottom:70px")}>
            {related.map((r) => (
              <A key={r.slug} href={serviceHref(r.slug)} cls="card-hover" css="display:flex;align-items:center;gap:16px;padding:18px 20px;border-radius:20px;background:#FEFAFF;border:1px solid rgba(17,3,102,0.12);color:#110366">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={iconSrc(r.icon)} alt="" width={60} height={66} style={s("width:60px;height:66px;object-fit:contain")} />
                <span style={s("font-size:20px")}>{r.name}</span>
              </A>
            ))}
          </div>
          {posts.length > 0 && (
            <>
              <h2 style={s("margin:0 0 30px;font-weight:400;font-size:clamp(30px,4vw,44px)")}>Lecturas recomendadas</h2>
              <div style={s("display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:20px")}>
                {posts.map((p) => (
                  <A key={p.slug} href={postHref(p.slug)} cls="hv-lav2" css="display:flex;flex-direction:column;gap:10px;padding:26px;border-radius:22px;background:rgba(243,233,252,0.62);color:#110366">
                    <span style={s(`font-family:${UI};font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#A56CF0`)}>{p.cat} · {p.mins} min</span>
                    <span style={s("font-size:22px;line-height:1.3")}>{p.title}</span>
                    <span style={s(`font-family:${UI};font-size:13px;border-bottom:1px solid #FDBF3B;align-self:flex-start;padding-bottom:2px`)}>Leer artículo →</span>
                  </A>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <CtaBanner label="WhatsApp 863 651 5147" />
    </main>
  );
}
