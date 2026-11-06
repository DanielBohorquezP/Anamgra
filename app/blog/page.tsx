import type { Metadata } from "next";
import { DATA } from "@/lib/data";
import { blogLd, blogMeta } from "@/lib/seo";
import { A, Eyebrow, JsonLd, s, SCRIPT, UI, serviceHref } from "@/components/ui";
import BlogGrid from "@/components/BlogGrid";

export const metadata: Metadata = blogMeta();

export default function BlogPage() {
  return (
    <main>
      <JsonLd data={blogLd()} />
      <section style={s("position:relative;padding:150px 24px 110px")}>
        <div className="blob" style={s("position:absolute;top:-120px;left:-160px;width:520px;height:520px;border-radius:50%;background:#D8C7FA;opacity:0.45")} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/orchid.png" alt="" style={s("position:absolute;top:0;right:0;width:min(260px,26vw);pointer-events:none")} />
        <div style={s("position:relative;max-width:1180px;margin:0 auto")}>
          <header style={s("text-align:center;margin-bottom:44px")}>
            <Eyebrow>Blog AnamGra</Eyebrow>
            <h1 style={s("margin:0;font-weight:400;font-size:clamp(48px,8vw,96px);line-height:1")}>Bienestar</h1>
            <p style={s(`margin:4px 0 0;font-family:${SCRIPT};font-size:clamp(34px,4.5vw,52px)`)}>para cuerpo, mente y alma</p>
            <p style={s("margin:18px auto 0;max-width:600px;font-size:20px;line-height:1.5;color:#3A2E80")}>Guías claras sobre nuestras terapias complementarias, cómo prepararte para tu sesión y cómo integrarlas con tu cuidado médico.</p>
          </header>
          <BlogGrid posts={DATA.posts.map(({ slug, cat, icon, mins, title, excerpt, date, dateLabel }) => ({ slug, cat, icon, mins, title, excerpt, date, dateLabel }))} />

          <div style={s("margin-top:80px;padding:44px;border-radius:28px;background:rgba(243,233,252,0.62);text-align:center")}>
            <h2 style={s("margin:0;font-weight:400;font-size:clamp(28px,3.6vw,42px);line-height:1.15")}>Conoce las terapias de las que escribimos</h2>
            <div style={s(`display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:24px;font-family:${UI};font-size:14px`)}>
              {DATA.services.map((x) => (
                <A key={x.slug} href={serviceHref(x.slug)} cls="hv-lav2" css="padding:9px 18px;border-radius:999px;border:1px solid rgba(17,3,102,0.2);background:#FEFAFF;color:#110366">{x.name}</A>
              ))}
            </div>
            <p style={s(`margin:24px 0 0;font-family:${UI};font-size:14px`)}>
              <A href="/terapias/" css="color:#110366;border-bottom:1px solid #FDBF3B;padding-bottom:2px">Ver todas las terapias →</A>
              {" · "}
              <A href="/experiencias/" css="color:#110366;border-bottom:1px solid #FDBF3B;padding-bottom:2px">Ver experiencias →</A>
              {" · "}
              <A href="/irina-perez/" css="color:#110366;border-bottom:1px solid #FDBF3B;padding-bottom:2px">Conoce a la autora →</A>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
