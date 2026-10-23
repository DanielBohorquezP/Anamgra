import Image from "next/image";
import type { Metadata } from "next";
import { irinaLd, irinaMeta } from "@/lib/seo";
import { A, Eyebrow, JsonLd, WA, s, SCRIPT, UI } from "@/components/ui";

export const metadata: Metadata = irinaMeta();

const degrees = [
  ["2002", "Médica cirujana y general", "Fundación Universitaria Juan N. Corpas · Bogotá, Colombia"],
  ["2012", "Terapéuticas alternativas y farmacología vegetal (medicina alternativa)", "Fundación Universitaria Juan N. Corpas · Bogotá, Colombia"],
  ["2019", "Especialista en seguridad y salud en el trabajo", "Corporación Universitaria UNITEC"],
  ["2021", "Máster en medicina estética", "TECH Universidad Tecnológica"],
];
const diplomas = [
  ["2007", "Diplomado en terapias alternativas: Reiki, poliedros, armonización energética y auriculoterapia", "Universidad del Rosario · Bogotá, Colombia"],
  ["2008", "Diplomado en terapias alternativas: magnetoterapia, homeopatía y esencias florales", "Universidad del Rosario · Bogotá, Colombia"],
  ["2026", "Massage therapist", "Hyphen Beauty and Massage School · Orlando, Estados Unidos"],
];

const P = "margin:0";
const colStyle = "display:flex;flex-direction:column;gap:20px;font-size:20px;line-height:1.7;color:#3A2E80;text-wrap:pretty";
const h2Css = "margin:0;font-weight:400;font-size:clamp(40px,5.5vw,68px);line-height:1.05";

function Timeline({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div>
      <h3 style={s(`margin:0 0 8px;font-family:${SCRIPT};font-weight:500;font-size:38px`)}>{title}</h3>
      <ol style={s("list-style:none;margin:0;padding:0;display:flex;flex-direction:column")}>
        {rows.map(([y, t, i]) => (
          <li key={y + t} style={s("display:grid;grid-template-columns:64px 1fr;gap:16px;padding:20px 0;border-bottom:1px solid rgba(17,3,102,0.12)")}>
            <span style={s(`font-family:${UI};font-size:15px;font-weight:500;color:#A56CF0;padding-top:4px`)}>{y}</span>
            <span>
              <span style={s("display:block;font-size:21px;line-height:1.3")}>{t}</span>
              <span style={s(`display:block;font-family:${UI};font-size:14px;color:#3A2E80;margin-top:6px`)}>{i}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function IrinaPage() {
  return (
    <main>
      <JsonLd data={irinaLd()} />

      <section style={s("position:relative;padding:150px 24px 90px")}>
        <div className="blob" style={s("position:absolute;top:-120px;left:-160px;width:520px;height:520px;border-radius:50%;background:#D8C7FA;opacity:0.45")} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/orchid.png" alt="" style={s("position:absolute;top:0;right:0;width:min(240px,24vw);pointer-events:none")} />
        <div style={s("position:relative;max-width:1180px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr));gap:64px;align-items:center")}>
          <div>
            <nav style={s(`font-family:${UI};font-size:13px;color:#3A2E80;margin-bottom:28px;display:flex;gap:8px`)}>
              <A href="/" css="color:#3A2E80">Inicio</A><span>/</span><span>Sobre Irina</span>
            </nav>
            <Eyebrow>¿Quién es Irina?</Eyebrow>
            <h1 style={s("margin:0;font-weight:400;font-size:clamp(48px,7.5vw,92px);line-height:1")}>Conoce a Irina Pérez</h1>
            <p style={s(`margin:8px 0 0;font-family:${SCRIPT};font-size:clamp(32px,4vw,48px);line-height:1.2`)}>médica y terapeuta holística</p>
            <p style={s("margin:28px 0 0;font-size:20px;line-height:1.6;color:#3A2E80;text-wrap:pretty;max-width:560px")}>Soy Irina Pérez, médica con formación y especialización en terapias alternativas, apasionada por el bienestar integral y por la conexión que existe entre el cuerpo, la mente, las emociones y la energía.</p>
            <div style={s("display:flex;flex-wrap:wrap;gap:40px;margin-top:36px")}>
              {[["20+", "años de experiencia"], ["7", "títulos y diplomados"], ["2", "países: Colombia y EE. UU."]].map(([n, l]) => (
                <div key={n}><div style={s("font-size:48px;line-height:1")}>{n}</div><div style={s(`font-family:${UI};font-size:13px;color:#3A2E80;margin-top:6px`)}>{l}</div></div>
              ))}
            </div>
          </div>
          <div style={s("position:relative;max-width:440px;width:100%;justify-self:center;padding:16px")}>
            <div style={s("position:absolute;inset:0;border:2px solid #FDBF3B;border-radius:999px 999px 34px 34px")} />
            <div style={s("position:relative;width:100%;aspect-ratio:4/5;border-radius:999px 999px 24px 24px;overflow:hidden;background:#D8C7FA")}>
              <Image src="/assets/irina-2.jpg" alt="Retrato de la Dra. Irina Pérez en su consultorio" fill priority sizes="(max-width: 480px) 90vw, 440px" style={s("object-fit:cover;object-position:40% 35%")} />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/lotus.png" alt="" style={s("position:absolute;bottom:-28px;left:50%;transform:translateX(-50%);width:64px;background:#FEFAFF;border-radius:50%;padding:8px")} />
          </div>
        </div>
      </section>

      <section style={s("position:relative;padding:40px 24px 90px")}>
        <div style={{ ...s("max-width:760px;margin:0 auto"), ...s(colStyle) }}>
          <p style={s(P)}>A lo largo de más de 20 años de experiencia acompañando a personas en sus procesos de bienestar, he integrado conocimientos médicos y terapias holísticas que me permiten ofrecer una mirada individual, cercana y respetuosa de cada ser humano.</p>
          <p style={s(P)}>Mi formación y experiencia abarcan diferentes herramientas terapéuticas, entre ellas Reiki, terapia con poliedros, homeopatía, esencias florales, terapia con Ángeles, reflexología podal, masaje terapéutico y masaje prenatal.</p>
          <p style={s(P)}>Creo que cada persona tiene una historia única y que el camino hacia el bienestar comienza cuando aprendemos a escucharnos, reconocemos nuestras necesidades y abrimos espacio para cuidarnos de una manera más consciente.</p>
          <p style={s(P)}>Hoy, a través de AnamGra Holistic Therapies, pongo mi experiencia, sensibilidad y vocación de servicio al encuentro de quienes desean regalarse un espacio de armonía, conexión y bienestar integral.</p>
        </div>
      </section>

      <section style={s("position:relative;padding:100px 24px;background:#110366;color:#FEFAFF")}>
        <div style={s("max-width:1180px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:56px;align-items:start")}>
          <div className="sticky-col">
            <Eyebrow color="#FDBF3B">¿Cómo llegué a las terapias holísticas?</Eyebrow>
            <h2 style={s(h2Css)}>Una historia que transformó mi camino</h2>
            <div style={s("position:relative;margin-top:40px;max-width:360px;aspect-ratio:3/4;border-radius:999px 999px 24px 24px;overflow:hidden;border:2px solid #FDBF3B")}>
              <Image src="/assets/irina-3.jpg" alt="Dra. Irina Pérez en su espacio de terapias" fill sizes="(max-width: 480px) 90vw, 360px" style={s("object-fit:cover;object-position:50% 25%")} />
            </div>
          </div>
          <div style={s("display:flex;flex-direction:column;gap:20px;font-size:19px;line-height:1.7;color:#D8C7FA;text-wrap:pretty")}>
            <p style={s("margin:0;font-size:24px;line-height:1.5;color:#FEFAFF")}>Mi camino hacia las terapias holísticas nació de una de las experiencias más profundas y transformadoras de mi vida: la hospitalización de mi hijo mayor por un problema respiratorio.</p>
            <p style={s(P)}>Aquel momento despertó en mí una búsqueda personal y profesional. Como madre y médica, sentí la necesidad de explorar herramientas complementarias que pudieran acompañar su recuperación, fortalecer su bienestar y ayudarme a comprender la salud desde una perspectiva más integral.</p>
            <p style={s(P)}>Esa experiencia abrió ante mí un mundo de posibilidades y profundizó mi conexión con las terapias alternativas. Lo que comenzó como una búsqueda motivada por el amor de una madre se convirtió en una vocación que ha acompañado mi vida y mi práctica profesional durante más de dos décadas.</p>
            <p style={s(P)}>Con el tiempo, estas herramientas también formaron parte de mi manera de acompañar a mis pacientes, siempre desde el respeto por cada persona y entendiendo que cada proceso es diferente. Mi experiencia familiar me permitió valorar aún más la importancia del cuidado, la prevención y la atención integral, sin sustituir los tratamientos médicos que cada situación pueda requerir.</p>
            <p style={s(P)}>Hoy miro hacia atrás con gratitud, porque aquella experiencia no solo transformó mi manera de comprender el bienestar, sino que también me ayudó a descubrir una parte esencial de mi propósito: compartir lo aprendido y acompañar a otros con conocimiento, sensibilidad y amor.</p>
          </div>
        </div>
      </section>

      <section style={s("position:relative;padding:110px 24px")}>
        <div style={s("max-width:820px;margin:0 auto")}>
          <header style={s("text-align:center;margin-bottom:44px")}>
            <Eyebrow>¿Qué me motiva?</Eyebrow>
            <h2 style={s(h2Css)}>Acompañarte a reconectar contigo</h2>
          </header>
          <div style={s(colStyle)}>
            <p style={s(P)}>Me motiva profundamente acompañar a cada persona en el descubrimiento de su propio camino hacia el bienestar.</p>
            <p style={s(P)}>Creo que nuestro cuerpo se comunica constantemente con nosotros a través de sus sensaciones, sus cambios, sus necesidades y sus señales. Aprender a escucharlo con atención y respeto puede ayudarnos a reconocer aquello que necesitamos cuidar y a desarrollar una relación más consciente con nosotros mismos.</p>
            <p style={s(P)}>En cada experiencia, deseo ofrecerte un espacio en el que puedas hacer una pausa, respirar, reconectar con tus emociones y permitirte recibir cuidado sin juicios ni exigencias.</p>
            <p style={s(P)}>Me inspira la sabiduría de la naturaleza, los recursos que nos ofrece la Madre Tierra y la sensación de conexión con el universo que muchas personas encuentran en su camino espiritual. Desde esta visión, utilizo las terapias holísticas como herramientas complementarias para favorecer la relajación, el autoconocimiento y el equilibrio personal.</p>
            <p style={s(P)}>Mi intención no es decirte cómo debes sentirte ni recorrer tu camino por ti, sino acompañarte a descubrir tus propias necesidades, reconocer tus recursos y cultivar una relación más amorosa y consciente contigo mismo.</p>
          </div>
          <p style={s(`margin:48px 0 0;text-align:center;font-family:${SCRIPT};font-size:clamp(32px,4.2vw,48px);line-height:1.25;text-wrap:balance`)}>Porque el bienestar también comienza cuando aprendemos a escucharnos con amor.</p>
        </div>
      </section>

      <section style={s("position:relative;padding:100px 24px;background:rgba(216,199,250,0.35)")}>
        <div style={s("max-width:1180px;margin:0 auto")}>
          <header style={s("max-width:760px;margin:0 auto 52px;text-align:center")}>
            <Eyebrow>Mi enfoque</Eyebrow>
            <h2 style={s(h2Css)}>Una mirada integral de tu bienestar</h2>
            <p style={s("margin:22px 0 0;font-size:20px;line-height:1.6;color:#3A2E80;text-wrap:pretty")}>Cada persona es mucho más que una sensación física o una emoción pasajera. Por eso ofrezco experiencias personalizadas que respetan tu historia, tus necesidades y el momento de vida en el que te encuentras.</p>
          </header>
          <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:24px")}>
            {[
              ["Cuerpo", "A través del masaje terapéutico, el masaje prenatal y la reflexología podal, creo espacios dedicados al descanso, la relajación y el cuidado corporal, adaptados a cada persona."],
              ["Mente y emociones", "Mediante la escucha consciente, la relajación, las esencias florales y otras herramientas holísticas, te acompaño a crear calma, reconocer tus emociones y conectar contigo."],
              ["Energía y espiritualidad", "A través del Reiki, la terapia con poliedros y la terapia con Ángeles, ofrezco experiencias de relajación, introspección y conexión espiritual, respetando tus creencias."],
            ].map(([t, d]) => (
              <article key={t} style={s("background:#FEFAFF;border-radius:28px;padding:36px 32px;display:flex;flex-direction:column;gap:14px")}>
                <span style={s(`font-family:${SCRIPT};font-size:40px;line-height:1;color:#A56CF0`)}>{t}</span>
                <p style={s("margin:0;font-size:18px;line-height:1.6;color:#3A2E80")}>{d}</p>
              </article>
            ))}
          </div>
          <div style={s("max-width:760px;margin:52px auto 0;display:flex;flex-direction:column;gap:18px;font-size:19px;line-height:1.7;color:#3A2E80;text-align:center;text-wrap:pretty")}>
            <p style={s(P)}>Cada sesión es una invitación a detenerte, escucharte y dedicarte tiempo. No existe una fórmula única para todos: mi propósito es seleccionar las herramientas adecuadas para construir contigo una experiencia consciente, respetuosa y acorde con tus objetivos de bienestar.</p>
            <p style={s(`margin:0;font-family:${UI};font-size:14px;line-height:1.6`)}>Entiendo las terapias holísticas como un acompañamiento complementario al cuidado de la salud, no como un sustituto de la evaluación o el tratamiento médico cuando estos son necesarios.</p>
          </div>
        </div>
      </section>

      <section id="formacion" style={s("position:relative;padding:110px 24px")}>
        <div style={s("max-width:1180px;margin:0 auto")}>
          <header style={s("text-align:center;margin-bottom:52px")}>
            <Eyebrow>Formación académica</Eyebrow>
            <h2 style={s(h2Css)}>Estudios y certificaciones</h2>
          </header>
          <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));gap:56px")}>
            <Timeline title="Pregrado y posgrados" rows={degrees} />
            <Timeline title="Diplomados y certificaciones" rows={diplomas} />
          </div>
        </div>
      </section>

      <section style={s("position:relative;padding:20px 24px 120px")}>
        <div style={s("max-width:980px;margin:0 auto;background:#110366;color:#FEFAFF;border-radius:40px;padding:64px 40px;text-align:center")}>
          <p style={s(`margin:0;font-family:${SCRIPT};font-size:clamp(30px,3.8vw,44px);color:#FDBF3B`)}>Mi filosofía es sencilla</p>
          <h2 style={s("margin:10px auto 0;max-width:720px;font-weight:400;font-size:clamp(28px,3.6vw,42px);line-height:1.25;text-wrap:balance")}>Cuidar de ti de manera integral, honrando tu historia, respetando tu individualidad y acompañándote con amor.</h2>
          <div style={s(`display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-top:36px;font-family:${UI}`)}>
            <A href={WA} pill cls="btn-gold" css="display:inline-flex;align-items:center;gap:10px;background:#FDBF3B;color:#110366;padding:16px 32px;border-radius:999px;font-size:14px;letter-spacing:0.04em">Agenda tu sesión <span>→</span></A>
            <A href="/#terapias" pill cls="btn-ghost-light" css="display:inline-flex;align-items:center;padding:16px 32px;border-radius:999px;border:1px solid rgba(254,250,255,0.35);color:#FEFAFF;font-size:14px;letter-spacing:0.04em">Ver terapias</A>
          </div>
        </div>
      </section>
    </main>
  );
}
