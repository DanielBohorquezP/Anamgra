"use client";

import { useState } from "react";
import { A, WA, s, UI } from "./ui";

export type Therapy = { name: string; icon: string; desc: string; href: string };
export type Group = { label: string; items: Therapy[] };

export default function TherapyTabs({ groups }: { groups: Group[] }) {
  const [cat, setCat] = useState(0);
  const [fading, setFading] = useState(false);

  const pick = (i: number) => {
    if (i === cat) return;
    setFading(true);
    setTimeout(() => {
      setCat(i);
      setFading(false);
    }, 250);
  };

  return (
    <>
      <div style={s("display:flex;justify-content:center;margin-bottom:48px")}>
        <div
          role="tablist"
          style={s(
            "position:relative;display:inline-grid;grid-template-columns:repeat(3,minmax(0,1fr));background:rgba(254,250,255,0.82);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border-radius:999px;padding:4px;box-shadow:rgba(17,3,102,0.06) 0 0 0 1px",
          )}
        >
          <div
            style={s(
              `position:absolute;top:4px;bottom:4px;left:calc(4px + ${cat} * (100% - 8px) / 3);width:calc((100% - 8px) / 3);background:#110366;border-radius:999px;transition:left .3s ease-out`,
            )}
          />
          {groups.map((g, i) => (
            <button
              key={g.label}
              type="button"
              role="tab"
              aria-selected={i === cat}
              onClick={() => pick(i)}
              style={s(
                `position:relative;z-index:1;border:none;background:transparent;cursor:pointer;padding:11px 26px;border-radius:999px;font-family:${UI};font-size:14px;font-weight:500;white-space:nowrap;color:${i === cat ? "#FEFAFF" : "rgba(17,3,102,0.6)"};transition:color .3s`,
              )}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>
      <div style={s(`display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:24px;opacity:${fading ? 0 : 1};transition:opacity .3s`)}>
        {groups[cat].items.map((t) => (
          <article
            key={t.name}
            className="card-hover"
            style={s(
              "display:flex;flex-direction:column;background:rgba(254,250,255,0.82);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border-radius:24px;padding:28px;box-shadow:rgba(17,3,102,0.04) 0px 0px 0px 1px, rgba(17,3,102,0.04) 0px 3px 3px -1.5px, rgba(17,3,102,0.05) 0px 12px 12px -6px, rgba(17,3,102,0.05) 0px 24px 24px -12px",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.icon} alt="" width={104} height={116} style={s("width:104px;height:116px;object-fit:contain;margin-bottom:18px")} />
            <h3 style={s("margin:0 0 10px;font-weight:400;font-size:24px;letter-spacing:0.02em;text-transform:uppercase")}>
              <A href={t.href} css="color:#110366">{t.name}</A>
            </h3>
            <p style={s("margin:0 0 22px;font-size:17px;line-height:1.55;color:#3A2E80;text-wrap:pretty;flex:1")}>{t.desc}</p>
            <div style={s(`display:flex;flex-wrap:wrap;gap:18px;font-family:${UI};font-size:13px;letter-spacing:0.04em`)}>
              <A href={t.href} cls="hv-purple" css="color:#110366;border-bottom:1px solid #FDBF3B;padding-bottom:3px">Conocer más →</A>
              <A href={WA} cls="hv-purple" css="color:rgba(17,3,102,0.7);padding-bottom:3px">Agendar</A>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
