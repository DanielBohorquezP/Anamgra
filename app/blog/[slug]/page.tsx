import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DATA } from "@/lib/data";
import { postLd, postMeta } from "@/lib/seo";
import { A, Crumbs, JsonLd, WA, iconSrc, s, SCRIPT, UI, MONO, serviceHref } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };
type Cta = { title: string; text: string; bullets: string[]; button: string };

export const dynamicParams = false;
export const generateStaticParams = () => DATA.posts.map((p) => ({ slug: p.slug }));

const find = (slug: string) => DATA.posts.find((p) => p.slug === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = find((await params).slug);
  return p ? postMeta(p) : {};
}

/* Banner de agenda dentro del artículo (tarjeta navy con foto) */
function InlineCta({ cta }: { cta: Cta }) {
  return (
    <aside
      aria-label="Agenda tu cita"
      className="post-cta"
      style={s("border-radius:24px;overflow:hidden;background:#110366;color:#FEFAFF;border-left:6px solid #A56CF0;box-shadow:rgba(17,3,102,0.18) 0 30px 60px -28px")}
    >
      <div style={s("padding:36px 34px")}>
        <p style={s("margin:0;font-size:clamp(26px,3vw,34px);line-height:1.15;text-wrap:balance")}>{cta.title}</p>
        <p style={s("margin:16px 0 0;font-size:17px;line-height:1.6;opacity:0.9")}>{cta.text}</p>
        <ul style={s("margin:20px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:12px")}>
          {cta.bullets.map((b) => (
            <li key={b} style={s("display:grid;grid-template-columns:26px 1fr;gap:12px;font-size:17px;line-height:1.4")}>
              <span aria-hidden style={s("width:22px;height:22px;border-radius:50%;border:1.5px solid #D8C7FA;display:flex;align-items:center;justify-content:center;font-size:12px;color:#D8C7FA;margin-top:1px")}>✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <A href={WA} pill cls="btn-ghost-light" css={`display:inline-flex;align-items:center;gap:12px;margin-top:26px;padding:15px 28px;border-radius:999px;border:1.5px solid #FEFAFF;color:#FEFAFF;font-family:${UI};font-size:15px`}>
          {cta.button}
          <span aria-hidden style={s("width:10px;height:10px;border-radius:50%;background:#FDBF3B")} />
        </A>
      </div>
      <div className="post-cta-img" style={s("position:relative;min-height:340px")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/irina-2.jpg" alt="Dra. Irina Pérez, médica y terapeuta holística en Orlando, FL" loading="lazy" style={s("position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:50% 25%")} />
      </div>
    </aside>
  );
}

/* Tarjeta lateral de autora (escritorio) */
function AuthorSide({ date, dateLabel, related }: { date: string; dateLabel: string; related: Array<{ slug: string; name: string }> }) {
  const a = DATA.author;
  return (
    <aside aria-label="Sobre la autora" className="post-side" style={s("padding:28px;border-radius:24px;background:#FEFAFF;border:1px solid rgba(17,3,102,0.12);box-shadow:rgba(17,3,102,0.06) 0 24px 40px -24px")}>
      <div style={s("display:grid;grid-template-columns:64px 1fr;gap:14px;align-items:center")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/irina-1.jpg" alt="Dra. Irina Pérez" width={64} height={64} style={s("width:64px;height:64px;border-radius:50%;object-fit:cover;object-position:50% 20%")} />
        <div>
          <div style={s("font-size:20px;line-height:1.2")}>{a.name}</div>
          <div style={s(`font-family:${UI};font-size:13px;line-height:1.45;color:rgba(17,3,102,0.72);margin-top:4px`)}>{a.role}</div>
        </div>
      </div>
      <p style={s("margin:20px 0 0;font-size:16px;line-height:1.65")}>{a.bio}</p>
      <A href="/irina-perez/" css={`display:inline-block;margin-top:16px;font-family:${UI};font-size:14px;font-weight:500;color:#110366;border-bottom:1px solid #FDBF3B;padding-bottom:2px`}>Sobre la autora →</A>
      <div style={s(`margin-top:22px;padding-top:18px;border-top:1px solid rgba(17,3,102,0.12);font-family:${UI};font-size:15px`)}>
        Publicado · <time dateTime={date}>{dateLabel}</time>
      </div>
      <div style={s("margin-top:18px;padding-top:18px;border-top:1px solid rgba(17,3,102,0.12)")}>
        <div style={s(`font-family:${UI};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(17,3,102,0.7)`)}>Terapia relacionada</div>
        <div style={s("display:flex;flex-direction:column;gap:8px;margin-top:10px")}>
          {related.map((r) => (
            <A key={r.slug} href={serviceHref(r.slug)} css={`font-family:${UI};font-size:15px;font-weight:500;color:#110366;border-bottom:1px solid #FDBF3B;align-self:flex-start`}>
              {r.name} →
            </A>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default async function ArticuloPage({ params }: Props) {
  const p = find((await params).slug);
  if (!p) notFound();
  const a = DATA.author;
  const related = p.related.map((sl) => DATA.services.find((x) => x.slug === sl)).filter((x) => !!x);

  return (
    <main>
      <JsonLd data={postLd(p)} />
      <article style={s("position:relative;padding:140px 24px 90px")}>
        {/* eslint-disable @next/next/no-img-element */}
        <img src="/assets/orchid.png" alt="" style={s("position:absolute;top:0;right:0;width:min(220px,22vw);pointer-events:none")} />
        <div className="post-grid" style={s("position:relative;max-width:1180px;margin:0 auto")}>
          <div style={s("min-width:0;max-width:780px")}>
            <Crumbs mb={32} items={[{ name: "Inicio", href: "/" }, { name: "Blog", href: "/blog/" }, { name: p.cat }]} />
            <header>
              <span style={s(`display:block;font-family:${UI};font-size:12px;letter-spacing:0.25em;text-transform:uppercase;color:#A56CF0;margin-bottom:14px`)}>{p.cat} · {p.mins} min de lectura</span>
              <h1 style={s("margin:0;font-weight:400;font-size:clamp(34px,4.6vw,56px);line-height:1.1;text-wrap:balance")}>{p.title}</h1>
              <p style={s("margin:18px 0 0;font-size:21px;line-height:1.55;color:#3A2E80")}>{p.excerpt}</p>
              <div style={s(`display:flex;align-items:center;gap:14px;margin-top:28px;padding:16px 0;border-top:1px solid rgba(17,3,102,0.12);border-bottom:1px solid rgba(17,3,102,0.12);font-family:${UI};font-size:13px`)}>
                <img src="/assets/irina-1.jpg" alt="Dra. Irina Pérez" width={44} height={44} style={s("width:44px;height:44px;border-radius:50%;object-fit:cover;object-position:50% 20%;flex-shrink:0")} />
                <div style={s("line-height:1.5")}>
                  <div>Por <A href="/irina-perez/" css="color:#110366;border-bottom:1px solid #FDBF3B">{a.name}</A></div>
                  <div style={s("color:rgba(17,3,102,0.7)")}>Publicado el <time dateTime={p.date}>{p.dateLabel}</time> · Actualizado el <time dateTime={DATA.updated}>{DATA.updatedLabel}</time></div>
                </div>
              </div>
            </header>

            <aside aria-label="Puntos clave" style={s("margin:36px 0;padding:26px 28px;border-radius:22px;background:#110366;color:#FEFAFF")}>
              <h2 style={s(`margin:0 0 14px;font-family:${UI};font-weight:500;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#FDBF3B`)}>Puntos clave</h2>
              <ul style={s("margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:10px")}>
                {p.keys.map((k) => (
                  <li key={k} style={s("display:grid;grid-template-columns:20px 1fr;gap:10px;font-size:18px;line-height:1.45")}>
                    <span style={s("width:8px;height:8px;border-radius:50%;background:#FDBF3B;margin-top:9px")} />
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </aside>

            <div style={s("display:flex;flex-direction:column;gap:34px")}>
              {p.body.map(([h, ps], i) => (
                <div key={h as string} style={s("display:flex;flex-direction:column;gap:34px")}>
                  <section>
                    <h2 style={s("margin:0 0 12px;font-weight:400;font-size:clamp(26px,3vw,34px);line-height:1.15;text-wrap:balance")}>{h}</h2>
                    {(ps as string[]).map((t) => (
                      <p key={t} style={s("margin:0 0 14px;font-size:20px;line-height:1.7;text-wrap:pretty")}>{t}</p>
                    ))}
                  </section>
                  {i === 1 && <InlineCta cta={p.cta} />}
                </div>
              ))}
            </div>

            <section aria-label="Fuentes" style={s("margin-top:44px;padding-top:26px;border-top:1px solid rgba(17,3,102,0.12)")}>
              <h2 style={s(`margin:0 0 14px;font-family:${UI};font-weight:500;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#A56CF0`)}>Fuentes</h2>
              <ol style={s(`margin:0;padding-left:22px;display:flex;flex-direction:column;gap:10px;font-family:${UI};font-size:15px;line-height:1.55`)}>
                {p.sources.map(([label, url]) => (
                  <li key={url}>
                    <a href={url} target="_blank" rel="noopener noreferrer" style={s("color:#110366;border-bottom:1px solid #FDBF3B;overflow-wrap:anywhere")}>{label}</a>
                  </li>
                ))}
              </ol>
            </section>

            <div style={s("margin-top:40px;display:grid;grid-template-columns:56px 1fr;gap:16px;align-items:start;padding:22px 24px;border-radius:18px;border:1.5px solid #110366;background:#FEFAFF")}>
              <img src="/assets/i-alerta.png" alt="" style={s("width:56px;height:62px;object-fit:contain")} />
              <p style={s("margin:0;font-size:16px;line-height:1.55")}>Este contenido es informativo y no sustituye la consulta, el diagnóstico ni el tratamiento médico. Ante una urgencia, llama al 911.</p>
            </div>

            <section aria-label="Terapias relacionadas" style={s("margin-top:56px")}>
              <h2 style={s("margin:0 0 20px;font-weight:400;font-size:30px")}>Terapias relacionadas</h2>
              <div style={s("display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px")}>
                {related.map((r) => (
                  <A key={r!.slug} href={serviceHref(r!.slug)} cls="hv-lav2" css="display:flex;align-items:center;gap:14px;padding:16px 18px;border-radius:18px;background:rgba(243,233,252,0.62);color:#110366">
                    <img src={iconSrc(r!.icon)} alt="" width={52} height={58} style={s("width:52px;height:58px;object-fit:contain")} />
                    <span style={s("font-size:19px")}>{r!.name}</span>
                  </A>
                ))}
              </div>
            </section>

            <section id="autora" aria-label="Sobre la autora" className="post-author-bottom" style={s("margin-top:56px;grid-template-columns:96px 1fr;gap:22px;align-items:start;padding:28px;border-radius:24px;background:rgba(243,233,252,0.62)")}>
              <img src="/assets/irina-1.jpg" alt="Dra. Irina Pérez" width={96} height={96} loading="lazy" style={s("width:96px;height:96px;border-radius:50%;object-fit:cover;object-position:50% 20%")} />
              <div>
                <div style={s(`font-family:${UI};font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#A56CF0`)}>Sobre la autora</div>
                <div style={s("font-size:26px;margin-top:4px")}>{a.name}</div>
                <div style={s("font-size:17px;color:#3A2E80;margin-top:2px")}>{a.role}</div>
                <p style={s("margin:10px 0 8px;font-size:17px;line-height:1.55")}>{a.bio}</p>
                <p style={s(`margin:0;font-family:${MONO};font-size:12px;color:#A56CF0`)}>{a.credentials}</p>
                <A href="/irina-perez/" css={`display:inline-block;margin-top:12px;font-family:${UI};font-size:13px;border-bottom:1px solid #FDBF3B;padding-bottom:2px`}>Conoce a Irina →</A>
              </div>
            </section>

            <div style={s("margin-top:48px;text-align:center;padding:48px 28px;border-radius:28px;background:#110366;color:#FEFAFF")}>
              <p style={s("margin:0 0 6px;font-size:clamp(28px,4vw,40px)")}>Agenda tu cita hoy</p>
              <p style={s(`margin:0 0 22px;font-family:${SCRIPT};font-size:32px`)}>Un espacio para volver a ti.</p>
              <A href={WA} pill cls="btn-gold" css={`display:inline-flex;padding:15px 30px;border-radius:999px;background:#FDBF3B;color:#110366;font-family:${UI};font-size:14px`}>WhatsApp 863 651 5147</A>
            </div>
          </div>

          <AuthorSide date={p.date} dateLabel={p.dateLabel} related={related.map((r) => ({ slug: r!.slug, name: r!.name }))} />
        </div>
      </article>
    </main>
  );
}
