import Image from "next/image";
import type { Metadata } from "next";
import { DATA } from "@/lib/data";
import { homeLd, homeMeta } from "@/lib/seo";
import { A, Eyebrow, Faq, JsonLd, WA, iconSrc, planHref, postHref, s, SCRIPT, UI, serviceHref } from "@/components/ui";
import TherapyTabs, { type Group } from "@/components/TherapyTabs";

export const metadata: Metadata = homeMeta();

const T = (name: string, icon: string, slug: string, desc: string) => ({ name, icon: iconSrc(icon), href: serviceHref(slug), desc });
const groups: Group[] = [
  { label: "Energéticas", items: [
    T("Reiki", "i-reiki", "reiki", "Terapia energética de origen japonés que busca favorecer la relajación, el equilibrio y una sensación de bienestar integral mediante la imposición de las manos."),
    T("Terapia con Ángeles", "i-angeles", "terapia-con-angeles", "Práctica espiritual y simbólica que utiliza la conexión con los ángeles como herramienta de reflexión, orientación y acompañamiento personal."),
    T("Poliedros", "i-poliedros", "poliedros", "Práctica energética y simbólica que utiliza formas geométricas como herramientas de meditación, concentración e introspección."),
  ] },
  { label: "Corporales", items: [
    T("Reflexología", "i-reflexo", "reflexologia", "Técnica terapéutica que trabaja puntos específicos de los pies relacionados con diferentes áreas del cuerpo, promoviendo relajación, equilibrio y bienestar general."),
    T("Cupping", "i-cupping", "cupping", "Técnica corporal que utiliza ventosas sobre la piel para generar una succión controlada. Puede formar parte de un tratamiento de relajación y bienestar muscular."),
    T("Piedras calientes", "i-piedras", "piedras-calientes", "Técnica de masaje que incorpora piedras previamente calentadas para proporcionar calor, relajación y una experiencia corporal profundamente reconfortante."),
    T("Masaje terapéutico", "i-masaje", "masaje-terapeutico", "Masaje personalizado enfocado en aliviar tensión y molestias musculares, mejorar la circulación y favorecer la movilidad y la relajación."),
    T("Masaje prenatal", "i-prenatal", "masaje-prenatal", "Masaje suave y especializado para ayudar a aliviar la tensión muscular, el cansancio y las molestias comunes durante el embarazo, brindando relajación y bienestar."),
  ] },
  { label: "Mente y emoción", items: [
    T("Psicoterapia", "i-psico", "psicoterapia", "Espacio de acompañamiento terapéutico para comprender tus emociones, trabajar tus procesos personales y fortalecer tu bienestar mental."),
    T("Esencias florales", "i-esencias", "esencias-florales", "Acompañamiento basado en esencias florales utilizado dentro de un enfoque holístico para trabajar aspectos emocionales y favorecer el bienestar personal."),
    T("Homeopatía", "i-homeo", "homeopatia", "Sistema de medicina complementaria que utiliza preparados altamente diluidos, seleccionados de acuerdo con las características individuales de cada persona."),
  ] },
];

const pillars = [
  { title: "Terapias Holísticas", icon: "lotus" },
  { title: "Sanación Energética", icon: "i-reiki" },
  { title: "Bienestar Integral", icon: "i-poliedros" },
  { title: "Con Amor, para tu Alma", icon: "i-bienestar" },
];

const HIGHLIGHT = "armonia";
const planCards = DATA.plans.map((p) => {
  const f = p.slug === HIGHLIGHT;
  return {
    ...p, featured: f,
    badgeSrc: p.badge === "lotus" ? iconSrc("lotus") : iconSrc(p.badge),
    bg: f ? "#110366" : "#FEFAFF", fg: f ? "#FEFAFF" : "#110366",
    border: f ? "1.5px solid #110366" : "1.5px solid rgba(17,3,102,0.85)",
    script: f ? "#FDBF3B" : "#A56CF0", rule: f ? "rgba(255,255,255,0.18)" : "rgba(17,3,102,0.14)",
    btnBg: f ? "#FDBF3B" : "#110366", btnFg: f ? "#110366" : "#FEFAFF",
    durLabel: `${p.duration} minutos · ${p.incl.replace(/ \+ /g, " + ")}`,
  };
});

const info = [
  { icon: "i-cal", title: "Atención con cita previa", text: "Las sesiones se realizan únicamente con cita previamente agendada." },
  { icon: "i-pay", title: "Pago anticipado", text: "La reserva de tu cita queda confirmada una vez recibido el pago correspondiente." },
  { icon: "i-virtual", title: "Sesiones virtuales", text: "La atención se realiza de manera virtual, desde la comodidad y privacidad de tu hogar." },
  { icon: "i-conf", title: "Espacio confidencial", text: "Tu información y lo conversado durante la sesión son tratados con respeto y confidencialidad." },
  { icon: "i-reloj", title: "Duración aproximada", text: "Cada sesión tiene una duración aproximada de 60 minutos." },
  { icon: "i-alerta", title: "No reemplaza la atención médica de urgencias", text: "Estas sesiones son un acompañamiento de bienestar integral y no sustituyen la atención de urgencias." },
];

const ic = {
  wa: "M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1",
  ig: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zM16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6",
  pin: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  video: "M23 7l-7 5 7 5V7zM3 5h11a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z",
};
const contacts = [
  { label: "WhatsApp", value: "863 651 5147", href: WA, path: ic.wa },
  { label: "Instagram", value: "@drairinaperez", href: DATA.biz.ig, path: ic.ig },
  { label: "Correo", value: DATA.biz.email, href: `mailto:${DATA.biz.email}`, path: ic.mail },
  { label: "Modalidad", value: "Citas virtuales y presenciales con cita previa", href: WA, path: ic.video },
  { label: "Ubicación", value: "Orlando, Florida · Atención virtual", href: "https://maps.google.com/?q=Orlando,Florida", path: ic.pin },
];

const formacion = [
  ["2002", "Médica cirujana y general", "Fundación Universitaria Juan N. Corpas · Bogotá"],
  ["2012", "Terapéuticas alternativas y farmacología vegetal", "Fundación Universitaria Juan N. Corpas · Bogotá"],
  ["2019", "Especialista en seguridad y salud en el trabajo", "Corporación Universitaria UNITEC"],
  ["2021", "Máster en medicina estética", "TECH Universidad Tecnológica"],
  ["2026", "Massage therapist", "Hyphen Beauty and Massage School · Orlando"],
];

export default function Home() {
  return (
    <main>
      <JsonLd data={homeLd()} />

      {/* HERO */}
      <section id="inicio" style={s("position:relative;min-height:100svh;display:flex;align-items:center;justify-content:center;padding:130px 24px 80px")}>
        <div className="blob" style={s("position:absolute;top:-120px;left:-160px;width:520px;height:520px;border-radius:50%;background:#D8C7FA;opacity:0.45;filter:blur(2px)")} />
        {/* eslint-disable @next/next/no-img-element */}
        <img src="/assets/orchid.png" alt="" style={s("position:absolute;top:0;right:0;width:min(280px,30vw);pointer-events:none")} />
        <img src="/assets/leaves.png" alt="" style={s("position:absolute;bottom:0;right:0;width:min(170px,18vw);pointer-events:none")} />
        <img src="/assets/flowers-l.png" alt="" style={s("position:absolute;bottom:20px;left:0;width:min(130px,14vw);pointer-events:none")} />
        <div style={s("position:relative;z-index:2;width:100%;max-width:760px;display:flex;flex-direction:column;align-items:center;text-align:center")}>
          <div style={s("position:relative;width:100%;max-width:640px;padding:56px 48px 0;border:3px solid #110366;border-bottom:none;border-radius:999px 999px 0 0;display:flex;justify-content:center")}>
            <Image src="/assets/logo.png" alt="AnamGra" width={440} height={440} priority className="blur-in" style={s("width:100%;max-width:440px;height:auto")} />
          </div>
          <div style={s("display:flex;align-items:center;gap:20px;margin-top:10px;width:100%;max-width:640px")}>
            <span style={s("flex:1 1 40px;min-width:0;height:1px;background:#FDBF3B")} />
            <h1 style={s("margin:0;font-weight:400;font-size:clamp(28px,4.8vw,52px);line-height:1.12;letter-spacing:0.01em;text-align:center;text-wrap:balance")}>Terapias holísticas en Orlando</h1>
            <span style={s("flex:1 1 40px;min-width:0;height:1px;background:#FDBF3B")} />
          </div>
          <img src="/assets/lotus.png" alt="" style={s("width:64px;margin-top:10px")} />
          <p style={s("margin:36px 0 0;background:#110366;color:#FEFAFF;border-radius:999px;padding:20px 48px;font-size:clamp(20px,2.6vw,30px);line-height:1.3;text-wrap:balance;max-width:720px")}>
            Donde el amor del alma acompaña tu camino hacia el bienestar
          </p>
          <div style={s(`display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-top:36px;font-family:${UI}`)}>
            <A href={WA} pill cls="btn-navy" css="display:inline-flex;align-items:center;gap:10px;background:#110366;color:#FEFAFF;padding:16px 32px;border-radius:999px;font-size:14px;letter-spacing:0.04em;white-space:nowrap">Agenda por WhatsApp <span>→</span></A>
            <A href="#terapias" pill cls="btn-ghost" css="display:inline-flex;align-items:center;padding:16px 32px;border-radius:999px;border:1px solid rgba(17,3,102,0.25);color:#110366;font-size:14px;letter-spacing:0.04em;white-space:nowrap">Ver terapias</A>
          </div>
        </div>
      </section>

      {/* PILARES */}
      <section style={s("position:relative;padding:40px 24px 80px")}>
        <div style={s("max-width:1280px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:24px")}>
          {pillars.map((p) => (
            <div key={p.title} style={s("display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px;padding:24px")}>
              <img src={iconSrc(p.icon)} alt="" width={76} height={76} style={s("width:76px;height:76px;object-fit:contain")} />
              <h3 style={s(`margin:0;font-family:${SCRIPT};font-weight:400;font-size:32px;line-height:1.1`)}>{p.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* SOBRE IRINA */}
      <section id="irina" style={s("position:relative;padding:100px 24px 110px")}>
        <div style={s("max-width:1180px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:64px;align-items:center")}>
          <div style={s("position:relative;max-width:440px;width:100%;justify-self:center;padding:16px")}>
            <div style={s("position:absolute;inset:0;border:2px solid #FDBF3B;border-radius:999px 999px 34px 34px")} />
            <div style={s("position:relative;width:100%;aspect-ratio:4/5;border-radius:999px 999px 24px 24px;overflow:hidden;background:#D8C7FA")}>
              <Image src="/assets/irina-1.jpg" alt="Dra. Irina Pérez, médica y terapeuta holística en Orlando" fill sizes="(max-width: 480px) 90vw, 440px" style={s("object-fit:cover;object-position:50% 20%")} />
            </div>
            <img src="/assets/lotus.png" alt="" style={s("position:absolute;bottom:-28px;left:50%;transform:translateX(-50%);width:64px;background:#FEFAFF;border-radius:50%;padding:8px")} />
          </div>
          <div>
            <Eyebrow>Conoce a Irina</Eyebrow>
            <h2 style={s("margin:0;font-weight:400;font-size:clamp(44px,6.5vw,80px);line-height:1.02")}>Dra. Irina Pérez</h2>
            <p style={s(`margin:6px 0 0;font-family:${SCRIPT};font-size:clamp(30px,3.8vw,44px);line-height:1.2`)}>Médica y terapeuta holística</p>
            <p style={s("margin:28px 0 0;font-size:19px;line-height:1.6;color:#3A2E80;text-wrap:pretty")}>Médica con formación y especialización en terapias alternativas, apasionada por la conexión entre el cuerpo, la mente, las emociones y la energía.</p>
            <p style={s("margin:16px 0 0;font-size:19px;line-height:1.6;color:#3A2E80;text-wrap:pretty")}>Con más de 20 años acompañando procesos de bienestar, integra conocimientos médicos y terapias holísticas para ofrecer una mirada individual, cercana y respetuosa de cada persona.</p>
            <div style={s("margin-top:36px;padding-top:28px;border-top:1px solid rgba(17,3,102,0.12)")}>
              <h3 style={s(`margin:0 0 18px;font-family:${UI};font-weight:500;font-size:13px;letter-spacing:0.22em;text-transform:uppercase;color:#110366`)}>Formación</h3>
              <ul style={s("list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:16px")}>
                {formacion.map(([y, t, i]) => (
                  <li key={y} style={s("display:grid;grid-template-columns:56px 1fr;gap:14px;align-items:baseline;line-height:1.4")}>
                    <span style={s(`font-family:${UI};font-size:14px;color:#A56CF0;letter-spacing:0.04em`)}>{y}</span>
                    <span style={s("font-size:18px")}>{t}<span style={s(`display:block;font-family:${UI};font-size:13px;color:#3A2E80;margin-top:2px`)}>{i}</span></span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={s("display:flex;flex-wrap:wrap;gap:36px;margin-top:32px")}>
              <div><div style={s("font-size:44px;line-height:1")}>20+</div><div style={s(`font-family:${UI};font-size:13px;letter-spacing:0.06em;color:#3A2E80;margin-top:6px`)}>años de experiencia</div></div>
              <div><div style={s("font-size:44px;line-height:1")}>11</div><div style={s(`font-family:${UI};font-size:13px;letter-spacing:0.06em;color:#3A2E80;margin-top:6px`)}>terapias integradas</div></div>
            </div>
            <div style={s(`display:flex;flex-wrap:wrap;gap:14px;margin-top:36px;font-family:${UI}`)}>
              <A href="/irina-perez/" pill cls="btn-navy" css="display:inline-flex;align-items:center;gap:10px;background:#110366;color:#FEFAFF;padding:15px 30px;border-radius:999px;font-size:14px;letter-spacing:0.04em">Conoce su historia <span>→</span></A>
              <A href={WA} pill cls="btn-ghost" css="display:inline-flex;align-items:center;padding:15px 30px;border-radius:999px;border:1px solid rgba(17,3,102,0.25);color:#110366;font-size:14px;letter-spacing:0.04em">Agenda con Irina</A>
            </div>
          </div>
        </div>
      </section>

      {/* TERAPIAS */}
      <section id="terapias" style={s("position:relative;padding:96px 24px;background:rgba(243,233,252,0.62)")}>
        <div style={s("max-width:1280px;margin:0 auto")}>
          <div style={s("text-align:center;margin-bottom:48px")}>
            <Eyebrow>AnamGra Holistic Therapy</Eyebrow>
            <h2 style={s("margin:0;font-weight:400;font-size:clamp(48px,8vw,96px);line-height:1")}>Terapias</h2>
            <p style={s(`margin:4px 0 0;font-family:${SCRIPT};font-size:clamp(34px,4.5vw,52px);line-height:1.15`)}>Complementarias e integrativas</p>
          </div>
          <TherapyTabs groups={groups} />
        </div>
      </section>

      {/* EXPERIENCIAS */}
      <section id="experiencias" style={s("position:relative;padding:110px 24px")}>
        <div style={s("max-width:1280px;margin:0 auto")}>
          <div style={s("text-align:center;margin-bottom:56px")}>
            <Eyebrow>Planes de bienestar</Eyebrow>
            <h2 style={s("margin:0;font-weight:400;font-size:clamp(44px,7vw,84px);line-height:1.05")}>Experiencias</h2>
            <p style={s("margin:14px auto 0;max-width:620px;font-size:20px;line-height:1.5;color:#3A2E80")}>Sesiones que combinan varias terapias en un solo encuentro, pensadas para equilibrar cuerpo, mente, emociones y energía.</p>
          </div>
          <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,310px),1fr));gap:24px;align-items:stretch")}>
            {planCards.map((pl) => (
              <article key={pl.slug} style={s(`display:flex;flex-direction:column;border-radius:28px;padding:36px 32px;background:${pl.bg};color:${pl.fg};border:${pl.border};box-shadow:rgba(17,3,102,0.06) 0px 24px 48px -16px`)}>
                <div style={s("display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:22px")}>
                  <img src={pl.badgeSrc} alt="" style={s("height:56px;width:auto;object-fit:contain")} />
                  {pl.featured && <span style={s(`font-family:${UI};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;background:#FDBF3B;color:#110366;padding:6px 12px;border-radius:999px`)}>Recomendado</span>}
                </div>
                <span style={s(`font-family:${UI};font-size:12px;letter-spacing:0.22em;text-transform:uppercase;opacity:0.8`)}>Experiencia</span>
                <h3 style={s("margin:4px 0 6px;font-weight:400;font-size:34px;letter-spacing:0.02em;text-transform:uppercase;line-height:1.1")}>
                  <A href={planHref(pl.slug)} css={`color:${pl.fg}`}>{pl.name}</A>
                </h3>
                <p style={s(`margin:0 0 16px;font-family:${SCRIPT};font-size:30px;line-height:1.2;color:${pl.script}`)}>{pl.tagline}</p>
                <p style={s("margin:0 0 24px;font-size:17px;line-height:1.55;text-wrap:pretty")}>{pl.desc}</p>
                <div style={s("display:flex;flex-direction:column;gap:14px;margin-bottom:28px;flex:1")}>
                  {pl.steps.map((st) => (
                    <div key={st.name} style={s("display:grid;grid-template-columns:52px 1fr;gap:14px;align-items:center")}>
                      <div style={s("width:52px;height:52px;border-radius:50%;background:#FEFAFF;display:flex;align-items:center;justify-content:center;overflow:hidden")}>
                        <img src={iconSrc(st.icon)} alt="" width={52} height={52} style={s("width:52px;height:52px;object-fit:contain")} />
                      </div>
                      <div>
                        <div style={s("font-size:18px;line-height:1.2")}>{st.name}</div>
                        <div style={s(`font-family:${UI};font-size:13px;line-height:1.4;opacity:0.78;margin-top:2px`)}>{st.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={s(`display:flex;align-items:flex-end;justify-content:space-between;gap:16px;padding-top:22px;border-top:1px solid ${pl.rule}`)}>
                  <div>
                    <div style={s("font-size:48px;line-height:1")}>${pl.price}</div>
                    <div style={s(`font-family:${UI};font-size:13px;letter-spacing:0.06em;opacity:0.8;margin-top:6px`)}>{pl.durLabel}</div>
                  </div>
                  <div style={s("display:flex;flex-direction:column;align-items:flex-end;gap:10px")}>
                    <A href={WA} pill css={`display:inline-flex;align-items:center;padding:13px 22px;border-radius:999px;font-family:${UI};font-size:13px;letter-spacing:0.04em;background:${pl.btnBg};color:${pl.btnFg}`}>Reservar</A>
                    <A href={planHref(pl.slug)} css={`font-family:${UI};font-size:12px;letter-spacing:0.04em;color:${pl.fg};border-bottom:1px solid #FDBF3B;padding-bottom:2px`}>Ver detalles →</A>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={s("padding:0 24px 110px")}>
        <div style={s("position:relative;max-width:1280px;margin:0 auto;min-height:360px;border-radius:28px;overflow:hidden;background:#110366;color:#FEFAFF;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:64px 32px")}>
          <div style={s("position:absolute;bottom:-160px;left:-80px;right:-80px;height:260px;border-radius:50%;background:#2A1A85")} />
          <img src="/assets/lotus.png" alt="" style={s("position:relative;width:72px;margin-bottom:18px")} />
          <p style={s(`position:relative;margin:0;font-family:${SCRIPT};font-size:clamp(40px,6vw,76px);line-height:1.15;text-wrap:balance`)}>Armonía para tu cuerpo, mente y alma.</p>
          <p style={s("position:relative;margin:22px 0 0;font-size:20px;opacity:0.85")}>Sana, conecta y transforma desde el amor.</p>
        </div>
      </section>

      {/* INFORMACIÓN */}
      <section id="informacion" style={s("position:relative;padding:96px 24px;background:rgba(243,233,252,0.62)")}>
        <div style={s("max-width:1100px;margin:0 auto")}>
          <div style={s("text-align:center;margin-bottom:24px")}>
            <h2 style={s("margin:0;font-weight:400;font-size:clamp(48px,7.5vw,90px);line-height:1")}>Información</h2>
            <div style={s("display:flex;align-items:center;justify-content:center;gap:20px")}>
              <span style={s("width:110px;height:1px;background:#FDBF3B")} />
              <p style={s(`margin:0;font-family:${SCRIPT};font-size:clamp(40px,5vw,60px);line-height:1.3`)}>Importante</p>
              <span style={s("width:110px;height:1px;background:#FDBF3B")} />
            </div>
          </div>
          <p style={s("margin:0 auto 56px;max-width:760px;text-align:center;background:#110366;color:#FEFAFF;border-radius:999px;padding:16px 36px;font-size:clamp(18px,2.2vw,24px)")}>Para tener en cuenta antes de agendar tu sesión</p>
          <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:20px 40px")}>
            {info.map((i) => (
              <div key={i.title} style={s("display:grid;grid-template-columns:84px 1fr;gap:22px;align-items:start;padding:22px 0;border-bottom:1px solid rgba(17,3,102,0.1)")}>
                <img src={iconSrc(i.icon)} alt="" width={84} height={92} style={s("width:84px;height:92px;object-fit:contain")} />
                <div>
                  <h3 style={s("margin:6px 0 8px;font-weight:400;font-size:21px;letter-spacing:0.02em;text-transform:uppercase;line-height:1.2")}>{i.title}</h3>
                  <p style={s("margin:0;font-size:17px;line-height:1.55;color:#3A2E80;text-wrap:pretty")}>{i.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" style={s("position:relative;padding:110px 24px 40px")}>
        <div style={s("max-width:1280px;margin:0 auto")}>
          <div style={s("display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:20px;margin-bottom:40px")}>
            <div>
              <Eyebrow>Blog</Eyebrow>
              <h2 style={s("margin:0;font-weight:400;font-size:clamp(44px,6.5vw,80px);line-height:1.05")}>Lecturas para tu bienestar</h2>
            </div>
            <A href="/blog/" pill cls="btn-ghost" css={`display:inline-flex;padding:14px 26px;border-radius:999px;border:1px solid rgba(17,3,102,0.25);font-family:${UI};font-size:14px;white-space:nowrap`}>Ver todos los artículos</A>
          </div>
          <div style={s("display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,270px),1fr));gap:22px")}>
            {DATA.posts.map((p) => (
              <A key={p.slug} href={postHref(p.slug)} cls="card-hover" css="display:flex;flex-direction:column;border-radius:24px;overflow:hidden;background:#FEFAFF;color:#110366;box-shadow:rgba(17,3,102,0.04) 0 0 0 1px, rgba(17,3,102,0.06) 0 24px 40px -20px">
                <div style={s("aspect-ratio:16/10;background:rgba(243,233,252,0.62);display:flex;align-items:center;justify-content:center")}>
                  <img src={iconSrc(p.icon)} alt="" style={s("width:40%;max-width:140px;object-fit:contain")} />
                </div>
                <div style={s("padding:22px 22px 26px;display:flex;flex-direction:column;gap:8px")}>
                  <span style={s(`font-family:${UI};font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#A56CF0`)}>{p.cat} · {p.mins} min</span>
                  <h3 style={s("margin:0;font-weight:400;font-size:22px;line-height:1.28")}>{p.title}</h3>
                </div>
              </A>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <Faq items={DATA.homeFaqs} bg={false} pad="100px 24px 0" title="Preguntas frecuentes" sub="Todo lo que necesitas saber" subSize="clamp(30px,3.6vw,42px)" />

      {/* CONTACTO */}
      <section id="contacto" style={s("position:relative;padding:110px 24px")}>
        <img src="/assets/leaves.png" alt="" style={s("position:absolute;top:40px;left:0;width:min(150px,14vw);transform:scaleX(-1);pointer-events:none")} />
        <div style={s("position:relative;max-width:1000px;margin:0 auto;text-align:center")}>
          <h2 style={s("margin:0 0 12px;font-weight:400;font-size:clamp(44px,6.5vw,80px);line-height:1.05")}>Agenda tu cita hoy</h2>
          <p style={s(`margin:0 auto 48px;font-family:${SCRIPT};font-size:clamp(30px,3.6vw,42px)`)}>Un espacio para volver a ti.</p>
          <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;text-align:left")}>
            {contacts.map((ct) => (
              <A key={ct.label} href={ct.href} cls="hv-lav3 contact-card" css="display:grid;grid-template-columns:56px 1fr;gap:16px;align-items:center;padding:22px 24px;border-radius:20px;background:#FEFAFF;border:1.5px solid #110366;color:#110366;transition:all .4s cubic-bezier(.4,0,.2,1)">
                <div className="contact-ico" style={s("width:56px;height:56px;border-radius:50%;background:#D8C7FA;display:flex;align-items:center;justify-content:center")}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#110366" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={ct.path} /></svg>
                </div>
                <div>
                  <div style={s(`font-family:${UI};font-size:12px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.7`)}>{ct.label}</div>
                  <div className="contact-val" style={s("font-size:21px;line-height:1.25;margin-top:3px;overflow-wrap:anywhere")}>{ct.value}</div>
                </div>
              </A>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
