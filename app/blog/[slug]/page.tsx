import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DATA } from "@/lib/data";
import { postLd, postMeta } from "@/lib/seo";
import { A, Crumbs, JsonLd, WA, iconSrc, s, SCRIPT, UI, MONO, serviceHref } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => DATA.posts.map((p) => ({ slug: p.slug }));

const find = (slug: string) => DATA.posts.find((p) => p.slug === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = find((await params).slug);
  return p ? postMeta(p) : {};
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
        <div style={s("position:relative;max-width:780px;margin:0 auto")}>
          <Crumbs mb={32} items={[{ name: "Inicio", href: "/" }, { name: "Blog", href: "/blog/" }, { name: p.cat }]} />
          <header>
            <span style={s(`display:block;font-family:${UI};font-size:12px;letter-spacing:0.25em;text-transform:uppercase;color:#A56CF0;margin-bottom:14px`)}>{p.cat} · {p.mins} min de lectura</span>
            <h1 style={s("margin:0;font-weight:400;font-size:clamp(38px,5.5vw,64px);line-height:1.08;text-wrap:balance")}>{p.title}</h1>
            <p style={s("margin:18px 0 0;font-size:21px;line-height:1.55;color:#3A2E80")}>{p.excerpt}</p>
            <div style={s(`display:flex;align-items:center;gap:14px;margin-top:28px;padding:16px 0;border-top:1px solid rgba(17,3,102,0.12);border-bottom:1px solid rgba(17,3,102,0.12);font-family:${UI};font-size:13px`)}>
              <img src="/assets/irina-1.jpg" alt="Dra. Irina Pérez" width={44} height={44} style={s("width:44px;height:44px;border-radius:50%;object-fit:cover;object-position:50% 20%;flex-shrink:0")} />
              <div style={s("line-height:1.5")}>
                <div>Por <A href="#autora" css="color:#110366;border-bottom:1px solid #FDBF3B">{a.name}</A></div>
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
            {p.body.map(([h, ps]) => (
              <section key={h as string}>
                <h2 style={s("margin:0 0 12px;font-weight:400;font-size:clamp(28px,3.4vw,36px);line-height:1.15")}>{h}</h2>
                {(ps as string[]).map((t) => (
                  <p key={t} style={s("margin:0 0 14px;font-size:20px;line-height:1.7;text-wrap:pretty")}>{t}</p>
                ))}
              </section>
            ))}
          </div>

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

          <section id="autora" aria-label="Sobre la autora" style={s("margin-top:56px;display:grid;grid-template-columns:96px 1fr;gap:22px;align-items:start;padding:28px;border-radius:24px;background:rgba(243,233,252,0.62)")}>
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
      </article>
    </main>
  );
}
