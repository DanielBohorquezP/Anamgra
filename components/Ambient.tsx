"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import * as THREE from "three";

/** Fondo 3D fijo (geometría sagrada + polvo dorado), scroll reveal y animaciones de botones. */
export default function Ambient() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];
    const el = host.current;
    if (!el) return;

    /* ---------- Botones: glow, shine y ripple ---------- */
    (() => {
      const find = (t: EventTarget | null): any => {
        const e = (t as Element | null)?.closest?.("a,button") as HTMLElement | null;
        return e && e.classList.contains("pill") ? e : null;
      };
      const layer = document.createElement("div");
      layer.setAttribute("aria-hidden", "true");
      layer.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:60";
      document.body.appendChild(layer);
      const overlayFor = (b: HTMLElement) => {
        const r = b.getBoundingClientRect();
        const o = document.createElement("div");
        o.style.cssText = `position:absolute;left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;border-radius:999px;overflow:hidden`;
        layer.appendChild(o);
        return { o, r };
      };
      const dark = (b: HTMLElement) => {
        const m = getComputedStyle(b).backgroundColor.match(/[\d.]+/g);
        if (!m || (m[3] !== undefined && +m[3] === 0)) return false;
        return (+m[0] + +m[1] + +m[2]) / 3 < 120;
      };
      let cur: any = null;
      const leave = (b: any) => {
        b._pulse && b._pulse.cancel();
        if (b._glow) {
          const g = b._glow;
          g.reverse();
          g.onfinish = () => g.cancel();
        }
      };
      const over = (e: PointerEvent) => {
        const b = find(e.target);
        if (b === cur) return;
        if (cur) leave(cur);
        cur = b;
        if (!b || RM) return;
        const d = dark(b);
        b._glow && b._glow.cancel();
        b._glow = b.animate(
          [
            { translate: "0 0", boxShadow: "0 0 0 0 rgba(253,191,59,0), 0 0 0 0 rgba(253,191,59,0)" },
            {
              translate: "0 -2px",
              boxShadow: d
                ? "0 0 0 3px rgba(253,191,59,0.35), 0 12px 32px -6px rgba(253,191,59,0.75)"
                : "0 0 0 3px rgba(165,108,240,0.25), 0 12px 30px -8px rgba(253,191,59,0.6)",
            },
          ],
          { duration: 320, easing: "cubic-bezier(.2,.7,.2,1)", fill: "forwards" },
        );
        const { o, r } = overlayFor(b);
        const sh = document.createElement("div");
        sh.style.cssText = `position:absolute;top:-20%;left:0;width:${Math.max(40, r.height * 1.2)}px;height:140%;background:linear-gradient(100deg, rgba(255,255,255,0) 0%, ${d ? "rgba(255,236,180,0.55)" : "rgba(253,191,59,0.35)"} 50%, rgba(255,255,255,0) 100%);transform:skewX(-20deg)`;
        o.appendChild(sh);
        sh.animate(
          [
            { transform: `translateX(${-r.height * 1.4}px) skewX(-20deg)` },
            { transform: `translateX(${r.width + r.height}px) skewX(-20deg)` },
          ],
          { duration: 750, easing: "cubic-bezier(.4,0,.2,1)" },
        ).onfinish = () => o.remove();
        b._pulse && b._pulse.cancel();
        b._pulse = b.animate(
          [{ filter: "brightness(1)" }, { filter: d ? "brightness(1.18)" : "brightness(1.04)" }, { filter: "brightness(1)" }],
          { duration: 1600, delay: 320, iterations: Infinity, easing: "ease-in-out" },
        );
      };
      const out = () => {
        if (cur) {
          leave(cur);
          cur = null;
        }
      };
      const down = (e: PointerEvent) => {
        const b = find(e.target);
        if (!b || RM) return;
        const d = dark(b);
        b.animate([{ scale: "1" }, { scale: "0.94", offset: 0.3 }, { scale: "1.03", offset: 0.7 }, { scale: "1" }], {
          duration: 420,
          easing: "cubic-bezier(.2,.7,.2,1)",
          composite: "add",
        });
        const { o, r } = overlayFor(b);
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const R = Math.hypot(Math.max(x, r.width - x), Math.max(y, r.height - y));
        const rp = document.createElement("div");
        rp.style.cssText = `position:absolute;left:${x - R}px;top:${y - R}px;width:${R * 2}px;height:${R * 2}px;border-radius:50%;background:radial-gradient(circle, ${d ? "rgba(253,191,59,0.55)" : "rgba(253,191,59,0.4)"} 0%, rgba(253,191,59,0.15) 55%, rgba(253,191,59,0) 70%)`;
        o.appendChild(rp);
        rp.animate([{ transform: "scale(0)", opacity: 1 }, { transform: "scale(1)", opacity: 0 }], {
          duration: 650,
          easing: "cubic-bezier(.2,.7,.2,1)",
        }).onfinish = () => o.remove();
        const ring = document.createElement("div");
        ring.style.cssText = `position:absolute;left:${r.left - 2}px;top:${r.top - 2}px;width:${r.width + 4}px;height:${r.height + 4}px;border-radius:999px;border:2px solid rgba(253,191,59,0.85);box-shadow:0 0 16px rgba(253,191,59,0.55)`;
        layer.appendChild(ring);
        ring.animate([{ transform: "scale(1)", opacity: 0.9 }, { transform: "scale(1.18,1.5)", opacity: 0 }], {
          duration: 600,
          easing: "cubic-bezier(.2,.7,.2,1)",
        }).onfinish = () => ring.remove();
      };
      document.addEventListener("pointerover", over, { passive: true });
      document.addEventListener("pointerleave", out);
      document.addEventListener("pointerdown", down, { passive: true });
      cleanups.push(() => {
        document.removeEventListener("pointerover", over);
        document.removeEventListener("pointerleave", out);
        document.removeEventListener("pointerdown", down);
        layer.remove();
      });
    })();

    /* ---------- Scroll reveal, decoraciones flotantes, blobs ---------- */
    if (!RM) {
      const SEL =
        "main h1, main h2, main article, main details, main aside, main li, main [data-reveal], section h1, section h2, section article, section details, section > div > p, section li, section aside";
      const NEST = "main article, main details, main aside, section article, section details, section aside, main li, section li";
      const seen = new WeakSet<Element>();
      const floated = new WeakSet<Element>();
      const drifted = new WeakSet<Element>();
      let count = 0;
      const hide = [{ opacity: 0, transform: "translateY(28px)", filter: "blur(8px)" }];
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const t = e.target as any;
            io.unobserve(t);
            const sibs = t.parentElement ? Array.from(t.parentElement.children) : [];
            const delay = Math.min(sibs.indexOf(t), 6) * 90;
            t._hold && t._hold.cancel();
            t.animate(
              [
                { opacity: 0, transform: "translateY(28px)", filter: "blur(8px)" },
                { opacity: 1, transform: "none", filter: "blur(0)" },
              ],
              { duration: 900, delay, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" },
            );
          });
        },
        { threshold: 0.01, rootMargin: "0px 0px -40px 0px" },
      );
      const scan = () => {
        document.querySelectorAll<any>(SEL).forEach((n) => {
          if (seen.has(n) || n.closest("header") || n.closest("footer") || n.closest('[aria-hidden="true"]')) return;
          const anc = n.parentElement && n.parentElement.closest(NEST);
          if (anc) return;
          seen.add(n);
          const r = n.getBoundingClientRect();
          if (r.top < window.innerHeight * 0.9 && r.bottom > 0) {
            n.animate(
              [
                { opacity: 0, transform: "translateY(18px)", filter: "blur(10px)" },
                { opacity: 1, transform: "none", filter: "blur(0)" },
              ],
              { duration: 1000, delay: 120 + Math.min(++count, 10) * 70, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" },
            );
            return;
          }
          n._hold = n.animate(hide, { duration: 1, fill: "forwards" });
          io.observe(n);
        });
        document
          .querySelectorAll<HTMLImageElement>('img[src*="orchid"], img[src*="leaves"], img[src*="flowers-l"], img[src*="logo.png"], img[src*="lotus"]')
          .forEach((img, i) => {
            if (floated.has(img) || img.closest("header") || img.closest("nav")) return;
            floated.add(img);
            const isFlower = /orchid|leaves|flowers/.test(img.src);
            const amp = isFlower ? 10 : 6;
            const rot = isFlower ? 2.2 : 0;
            img.animate(
              [
                { translate: "0 0", rotate: "0deg" },
                { translate: `0 ${-amp}px`, rotate: `${rot}deg` },
                { translate: "0 0", rotate: "0deg" },
                { translate: `0 ${amp * 0.6}px`, rotate: `${-rot}deg` },
                { translate: "0 0", rotate: "0deg" },
              ] as any,
              { duration: (isFlower ? 9000 : 6000) + i * 700, iterations: Infinity, easing: "ease-in-out", composite: "add" },
            );
          });
        document.querySelectorAll<HTMLElement>("section > div.blob").forEach((b, i) => {
          if (drifted.has(b)) return;
          drifted.add(b);
          b.animate(
            [
              { translate: "0 0", scale: "1" },
              { translate: "40px 30px", scale: "1.08" },
              { translate: "-20px 50px", scale: "0.96" },
              { translate: "0 0", scale: "1" },
            ] as any,
            { duration: 18000 + i * 2000, iterations: Infinity, easing: "ease-in-out" },
          );
        });
      };
      let timer: any;
      const mo = new MutationObserver(() => {
        clearTimeout(timer);
        timer = setTimeout(scan, 60);
      });
      mo.observe(document.body, { childList: true, subtree: true });
      const first = setTimeout(scan, 50);
      cleanups.push(() => {
        mo.disconnect();
        io.disconnect();
        clearTimeout(timer);
        clearTimeout(first);
      });
    }

    /* ---------- Fondo 3D ---------- */
    if (!RM) {
      const W = () => window.innerWidth;
      const H = () => window.innerHeight;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W(), H());
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, W() / H(), 0.1, 200);
      camera.position.set(0, 0, 34);
      scene.add(new THREE.AmbientLight(0xffffff, 1.4));
      const key = new THREE.DirectionalLight(0xffffff, 1.4);
      key.position.set(6, 10, 12);
      scene.add(key);
      const gold = new THREE.PointLight(0xfdbf3b, 40, 60);
      gold.position.set(-10, -6, 10);
      scene.add(gold);
      const violet = new THREE.PointLight(0xa56cf0, 30, 60);
      violet.position.set(12, 8, 6);
      scene.add(violet);

      const crystal = (hex: number, op: number) =>
        new THREE.MeshStandardMaterial({ color: hex, roughness: 0.12, metalness: 0, flatShading: true, transparent: true, opacity: op, emissive: 0xb79cf5, emissiveIntensity: 0.35 });
      const edgeMat = (hex: number, op: number) => new THREE.LineBasicMaterial({ color: hex, transparent: true, opacity: op });

      const defs: any[] = [
        { g: new THREE.DodecahedronGeometry(2.6), x: -13, y: 6, z: -2, c: 0xd8c7fa, edge: 0xfdbf3b },
        { g: new THREE.IcosahedronGeometry(1.8), x: 12.5, y: -4, z: 0, c: 0xe9defc, edge: 0xfdbf3b },
        { g: new THREE.OctahedronGeometry(1.5), x: 10, y: 9, z: -6, c: 0xc9b2f7, edge: 0x110366 },
        { g: new THREE.DodecahedronGeometry(1.4), x: -9, y: -10, z: -4, c: 0xe9defc, edge: 0xa56cf0 },
        { g: new THREE.TetrahedronGeometry(1.3), x: 3, y: -13, z: -8, c: 0xd8c7fa, edge: 0xfdbf3b },
        { g: new THREE.IcosahedronGeometry(1.0), x: -4, y: 13, z: -10, c: 0xc9b2f7, edge: 0xfdbf3b },
        { g: new THREE.DodecahedronGeometry(3.4), x: 15, y: -16, z: -14, c: 0xd8c7fa, edge: 0xa56cf0, wire: true },
        { g: new THREE.IcosahedronGeometry(3.0), x: -17, y: -2, z: -16, c: 0xd8c7fa, edge: 0x110366, wire: true },
      ];
      const items = defs.map((d, i) => {
        const grp = new THREE.Group();
        if (!d.wire) grp.add(new THREE.Mesh(d.g, crystal(d.c, 0.5)));
        grp.add(new THREE.LineSegments(new THREE.EdgesGeometry(d.g), edgeMat(d.edge, d.wire ? 0.35 : 0.85)));
        grp.position.set(d.x, d.y, d.z);
        grp.rotation.set(Math.random() * 3, Math.random() * 3, 0);
        scene.add(grp);
        return { grp, base: grp.position.clone(), sp: 0.12 + (i % 4) * 0.05, ph: i * 1.7, depth: 1 - d.z / 20 };
      });

      const ring = new THREE.Mesh(new THREE.TorusGeometry(5.5, 0.025, 8, 160), new THREE.MeshBasicMaterial({ color: 0xfdbf3b, transparent: true, opacity: 0.35 }));
      ring.position.set(11, 2, -12);
      ring.rotation.set(1.1, 0.3, 0);
      scene.add(ring);
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.8, 0.02, 8, 140), new THREE.MeshBasicMaterial({ color: 0x110366, transparent: true, opacity: 0.18 }));
      ring2.position.set(-12, -8, -10);
      ring2.rotation.set(0.6, -0.4, 0);
      scene.add(ring2);

      const dot = document.createElement("canvas");
      dot.width = dot.height = 64;
      const cx = dot.getContext("2d")!;
      const gr = cx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gr.addColorStop(0, "rgba(253,191,59,1)");
      gr.addColorStop(0.45, "rgba(253,191,59,0.55)");
      gr.addColorStop(1, "rgba(253,191,59,0)");
      cx.fillStyle = gr;
      cx.fillRect(0, 0, 64, 64);
      const tex = new THREE.CanvasTexture(dot);

      const N = 420;
      const pos = new Float32Array(N * 3);
      const seeds = new Float32Array(N);
      for (let i = 0; i < N; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 60;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 4;
        seeds[i] = Math.random() * 10;
      }
      const pg = new THREE.BufferGeometry();
      pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const pts = new THREE.Points(pg, new THREE.PointsMaterial({ size: 0.36, map: tex, transparent: true, depthWrite: false, opacity: 0.9 }));
      scene.add(pts);
      const N2 = 160;
      const pos2 = new Float32Array(N2 * 3);
      for (let i = 0; i < N2; i++) {
        pos2[i * 3] = (Math.random() - 0.5) * 60;
        pos2[i * 3 + 1] = (Math.random() - 0.5) * 50;
        pos2[i * 3 + 2] = (Math.random() - 0.5) * 20 - 6;
      }
      const pg2 = new THREE.BufferGeometry();
      pg2.setAttribute("position", new THREE.BufferAttribute(pos2, 3));
      const pts2 = new THREE.Points(pg2, new THREE.PointsMaterial({ size: 0.22, color: 0xa56cf0, map: tex, transparent: true, depthWrite: false, opacity: 0.55 }));
      scene.add(pts2);

      let mx = 0, my = 0, tmx = 0, tmy = 0;
      const onMove = (e: PointerEvent) => {
        tmx = e.clientX / W() - 0.5;
        tmy = e.clientY / H() - 0.5;
      };
      const onResize = () => {
        camera.aspect = W() / H();
        camera.updateProjectionMatrix();
        renderer.setSize(W(), H());
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("resize", onResize);

      const clock = new THREE.Clock();
      let raf = 0;
      const tick = () => {
        const t = clock.getElapsedTime();
        const sy = window.scrollY || 0;
        mx += (tmx - mx) * 0.04;
        my += (tmy - my) * 0.04;
        items.forEach((it) => {
          it.grp.rotation.x += 0.0016 + it.sp * 0.004;
          it.grp.rotation.y += 0.002 + it.sp * 0.005;
          it.grp.position.x = it.base.x + Math.sin(t * it.sp + it.ph) * 0.8 + mx * 2.2 * it.depth;
          const yy = ((((it.base.y + 23 + sy * 0.01 * it.depth) % 46) + 46) % 46) - 23;
          it.grp.position.y = yy + Math.cos(t * it.sp * 1.3 + it.ph) * 1.1 - my * 1.6 * it.depth;
        });
        ring.rotation.z = t * 0.08;
        ring2.rotation.z = -t * 0.06;
        ring.position.y = 2 + ((sy * 0.006) % 30);
        const p = pg.attributes.position.array as Float32Array;
        for (let i = 0; i < N; i++) {
          p[i * 3 + 1] += 0.006 + (seeds[i] % 1) * 0.01;
          p[i * 3] += Math.sin(t * 0.4 + seeds[i]) * 0.004;
          if (p[i * 3 + 1] > 25) p[i * 3 + 1] = -25;
        }
        pg.attributes.position.needsUpdate = true;
        pts.position.y = -(sy * 0.004) % 50;
        pts2.rotation.z = t * 0.01;
        pts2.position.y = -(sy * 0.002);
        camera.position.x = mx * 1.5;
        camera.position.y = -my * 1.2;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      tick();
      cleanups.push(() => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        renderer.domElement.remove();
      });
    }

    return () => cleanups.forEach((c) => c());
  }, []);

  return <div ref={host} aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none", display: "block" }} />;
}
