import type { Metadata } from "next";
import { DATA } from "@/lib/data";
import { blogLd, blogMeta } from "@/lib/seo";
import { Eyebrow, JsonLd, s, SCRIPT } from "@/components/ui";
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
        </div>
      </section>
    </main>
  );
}
