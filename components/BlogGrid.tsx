"use client";

import { useState } from "react";
import { A, iconSrc, postHref, s, UI } from "./ui";

type P = { slug: string; cat: string; icon: string; mins: number; title: string; excerpt: string; date: string; dateLabel: string };

export default function BlogGrid({ posts }: { posts: P[] }) {
  const [cat, setCat] = useState("Todos");
  const labels = ["Todos", ...Array.from(new Set(posts.map((p) => p.cat)))];
  return (
    <>
      <div style={s("display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-bottom:44px")}>
        {labels.map((l) => (
          <button
            key={l}
            type="button"
            aria-pressed={l === cat}
            onClick={() => setCat(l)}
            style={s(`border:1px solid rgba(17,3,102,0.2);cursor:pointer;padding:10px 20px;border-radius:999px;font-family:${UI};font-size:13px;background:${l === cat ? "#110366" : "#FEFAFF"};color:${l === cat ? "#FEFAFF" : "#110366"}`)}
          >
            {l}
          </button>
        ))}
      </div>
      <div style={s("display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr));gap:24px")}>
        {posts.filter((p) => cat === "Todos" || p.cat === cat).map((p) => (
          <A key={p.slug} href={postHref(p.slug)} cls="card-hover" css="display:flex;flex-direction:column;border-radius:26px;overflow:hidden;background:#FEFAFF;color:#110366;box-shadow:rgba(17,3,102,0.04) 0 0 0 1px, rgba(17,3,102,0.06) 0 24px 40px -20px">
            <div style={s("aspect-ratio:16/10;background:rgba(243,233,252,0.62);display:flex;align-items:center;justify-content:center")}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={iconSrc(p.icon)} alt="" style={s("width:42%;max-width:170px;object-fit:contain")} />
            </div>
            <div style={s("padding:26px 26px 28px;display:flex;flex-direction:column;gap:10px;flex:1")}>
              <span style={s(`font-family:${UI};font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#A56CF0`)}>{p.cat} · {p.mins} min</span>
              <h2 style={s("margin:0;font-weight:400;font-size:25px;line-height:1.25")}>{p.title}</h2>
              <p style={s("margin:0;font-size:17px;line-height:1.5;color:#3A2E80;flex:1")}>{p.excerpt}</p>
              <span style={s(`font-family:${UI};font-size:12px;color:rgba(17,3,102,0.7);margin-top:6px`)}>Dra. Irina Pérez · <time dateTime={p.date}>{p.dateLabel}</time></span>
            </div>
          </A>
        ))}
      </div>
    </>
  );
}
