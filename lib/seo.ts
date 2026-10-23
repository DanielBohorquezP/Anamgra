import type { Metadata } from "next";
import { DATA as D } from "./data";

type Svc = (typeof D.services)[number];
type Plan = (typeof D.plans)[number];
type Post = (typeof D.posts)[number];

const SITE = D.site;
const IG = [D.biz.ig];
export const isVirtual = (s: Svc) => s.mode.startsWith("Virtual");

const OG_DEFAULT = `${SITE}/og-default.png`;
const IRINA_PHOTO = `${SITE}/assets/irina-2.jpg`;
const ROBOTS = { index: true, follow: true, "max-image-preview": "large" as const };

function meta(opts: { title: string; description: string; path: string; ogTitle?: string; ogDescription?: string; image?: string; imageAlt?: string; type?: "website" | "profile" }): Metadata {
  const url = `${SITE}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    robots: ROBOTS,
    openGraph: {
      type: opts.type ?? "website",
      locale: "es_US",
      siteName: "AnamGra Holistic Therapy",
      title: opts.ogTitle ?? opts.title,
      description: opts.ogDescription ?? opts.description,
      url,
      images: [{ url: opts.image ?? OG_DEFAULT, width: 1200, height: 630, alt: opts.imageAlt ?? "AnamGra Holistic Therapy · Orlando, FL" }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.ogTitle ?? opts.title,
      description: opts.ogDescription ?? opts.description,
      images: [opts.image ?? OG_DEFAULT],
    },
  };
}

/* ---------- nodos JSON-LD ---------- */
const BIZ = `${SITE}/#business`;
const AUTHOR = `${SITE}/#author`;

const businessNode = (virtual = true) => ({
  "@type": "HealthAndBeautyBusiness",
  "@id": BIZ,
  name: D.biz.name,
  url: `${SITE}/`,
  telephone: D.biz.phone,
  email: D.biz.email,
  image: `${SITE}/og-default.png`,
  logo: `${SITE}/assets/logo.png`,
  priceRange: "$85–$165",
  address: { "@type": "PostalAddress", addressLocality: D.biz.city, addressRegion: D.biz.region, addressCountry: D.biz.country },
  areaServed: virtual
    ? [{ "@type": "City", name: "Orlando" }, { "@type": "Country", name: "Estados Unidos (atención virtual)" }]
    : [{ "@type": "City", name: "Orlando" }],
  sameAs: IG,
  founder: { "@id": AUTHOR },
});

const personNode = () => ({
  "@type": "Person",
  "@id": AUTHOR,
  name: D.author.name,
  image: IRINA_PHOTO,
  url: `${SITE}/irina-perez/`,
  jobTitle: "Fundadora y terapeuta holística de AnamGra",
  email: D.biz.email,
  sameAs: IG,
  worksFor: { "@id": BIZ },
});

const faqNode = (items: string[][]) => ({
  "@type": "FAQPage",
  mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
});

const crumbs = (items: Array<[string, string]>) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, item], i) => ({ "@type": "ListItem", position: i + 1, name, item })),
});

const webPage = (path: string, name: string) => ({
  "@type": "WebPage",
  url: `${SITE}${path}`,
  name,
  dateModified: D.updated,
  reviewedBy: { "@id": AUTHOR },
  inLanguage: "es",
});

/* ---------- Inicio ---------- */
export const homeMeta = (): Metadata => ({
  ...meta({
    title: "Terapias holísticas y Reiki en Orlando, FL | AnamGra",
    description:
      "Reiki, reflexología, esencias florales, homeopatía y masajes con la Dra. Irina Pérez en Orlando, FL y online. Agenda tu cita por WhatsApp.",
    path: "/",
    ogTitle: "AnamGra Holistic Therapy · Orlando, FL",
    ogDescription: "Donde el amor del alma acompaña tu camino hacia el bienestar.",
  }),
  robots: undefined,
});

export const homeLd = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HealthAndBeautyBusiness",
      "@id": BIZ,
      name: D.biz.name,
      url: `${SITE}/`,
      telephone: D.biz.phone,
      email: D.biz.email,
      image: [`${SITE}/og-default.png`, `${SITE}/assets/logo.png`],
      logo: `${SITE}/assets/logo.png`,
      priceRange: "$85–$165",
      address: { "@type": "PostalAddress", addressLocality: "Orlando", addressRegion: "FL", addressCountry: "US" },
      areaServed: [{ "@type": "City", name: "Orlando" }],
      sameAs: IG,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Experiencias",
        itemListElement: D.plans.map((p) => ({
          "@type": "Offer",
          name: `Experiencia ${p.name}`,
          price: String(p.price),
          priceCurrency: "USD",
          description: `${p.incl}, ${p.duration} minutos`,
        })),
      },
    },
    {
      "@type": "Person",
      "@id": AUTHOR,
      name: D.author.name,
      image: IRINA_PHOTO,
      url: `${SITE}/irina-perez/`,
      jobTitle: "Fundadora y terapeuta holística de AnamGra",
      worksFor: { "@id": BIZ },
      sameAs: IG,
    },
    { "@type": "WebSite", "@id": `${SITE}/#website`, url: `${SITE}/`, name: D.biz.name, inLanguage: "es" },
    faqNode(D.homeFaqs),
  ],
});

/* ---------- Sobre Irina ---------- */
export const irinaMeta = (): Metadata =>
  meta({
    title: "Dra. Irina Pérez: médica y terapeuta holística en Orlando",
    description:
      "Conoce a la Dra. Irina Pérez: médica con más de 20 años integrando medicina y terapias holísticas (Reiki, homeopatía, esencias florales, masaje terapéutico) en Orlando, Florida.",
    path: "/irina-perez/",
    ogTitle: "Dra. Irina Pérez · AnamGra Holistic Therapies",
    image: `${SITE}/og-irina.jpg`,
    imageAlt: "Dra. Irina Pérez, médica y terapeuta holística en Orlando, FL",
    type: "profile",
  });

export const irinaLd = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": AUTHOR,
  name: "Irina Pérez",
  url: `${SITE}/irina-perez/`,
  image: { "@type": "ImageObject", url: IRINA_PHOTO, width: 1086, height: 1448, caption: "Dra. Irina Pérez, médica y terapeuta holística" },
  honorificPrefix: "Dra.",
  jobTitle: "Médica y terapeuta holística",
  worksFor: { "@type": "Organization", name: "AnamGra Holistic Therapies" },
  address: { "@type": "PostalAddress", addressLocality: "Orlando", addressRegion: "FL", addressCountry: "US" },
  email: D.biz.email,
  telephone: D.biz.phone,
  sameAs: IG,
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Fundación Universitaria Juan N. Corpas" },
    { "@type": "CollegeOrUniversity", name: "Universidad del Rosario" },
    { "@type": "CollegeOrUniversity", name: "Corporación Universitaria UNITEC" },
    { "@type": "CollegeOrUniversity", name: "TECH Universidad Tecnológica" },
    { "@type": "EducationalOrganization", name: "Hyphen Beauty and Massage School" },
  ],
  knowsAbout: ["Reiki", "Terapia con poliedros", "Homeopatía", "Esencias florales", "Terapia con Ángeles", "Reflexología podal", "Masaje terapéutico", "Masaje prenatal", "Medicina estética"],
});

/* ---------- Terapias ---------- */
function snippet(answer: string) {
  const first = answer.split(". ")[0].replace(/\.$/, "");
  if (first.length <= 125) return `${first}. Agenda por WhatsApp.`;
  const cut = first.slice(0, 120);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/* Títulos y descriptions afinados por volumen de búsqueda (Ubersuggest); el resto usa la plantilla. */
const SERVICE_SEO: Record<string, { title: string; description: string }> = {
  reiki: {
    title: "Reiki en Orlando y online: sesión con la Dra. Irina Pérez",
    description: "Sesión de Reiki en Orlando, FL o por videollamada: relajación y equilibrio con la Dra. Irina Pérez. 60 minutos, con cita previa. Reserva por WhatsApp.",
  },
  cupping: {
    title: "Cupping (ventosas) presencial en Orlando, FL | AnamGra",
    description: "Cupping con ventosas presencial en Orlando, FL: alivia la tensión muscular con una técnica corporal personalizada. Sesión de 60 min con cita previa.",
  },
  homeopatia: {
    title: "Homeopatía en Orlando y online: consulta médica | AnamGra",
    description: "Consulta de homeopatía en Orlando y online con una médica: tratamiento individualizado según tus características. Agenda por WhatsApp.",
  },
  reflexologia: {
    title: "Reflexología podal presencial en Orlando, FL | AnamGra",
    description: "Reflexología podal presencial en Orlando, FL: masaje de puntos del pie para relajación y bienestar general. 60 minutos con cita previa.",
  },
  "masaje-terapeutico": {
    title: "Masaje terapéutico en Orlando, FL: alivia tensión | AnamGra",
    description: "Masaje terapéutico en Orlando, FL para aliviar tensión muscular y mejorar la movilidad. Sesiones personalizadas con cita previa.",
  },
  "masaje-prenatal": {
    title: "Masaje prenatal en Orlando, FL | AnamGra",
    description: "Masaje prenatal en Orlando, FL: suave y especializado para aliviar el cansancio y las molestias del embarazo. Consulta con tu médico y agenda.",
  },
  "piedras-calientes": {
    title: "Masaje con piedras calientes en Orlando, FL | AnamGra",
    description: "Masaje con piedras calientes en Orlando, FL: calor, relajación y una experiencia corporal profundamente reconfortante. Con cita previa.",
  },
};

const serviceSeo = (sv: Svc) => {
  const where = isVirtual(sv) ? "en Orlando, FL y online" : "en Orlando, FL";
  return (
    SERVICE_SEO[sv.slug] ?? {
      title: `${sv.name} ${where} | AnamGra Holistic Therapy`,
      description: `${sv.name} ${where}. ${snippet(sv.answer)}`,
    }
  );
};

export const serviceMeta = (sv: Svc): Metadata => {
  const { title, description } = serviceSeo(sv);
  return meta({ title, description, path: `/terapias/${sv.slug}/` });
};

export const serviceLd = (sv: Svc) => {
  const virtual = isVirtual(sv);
  const where = virtual ? "en Orlando, FL y online" : "en Orlando, FL";
  const path = `/terapias/${sv.slug}/`;
  const title = serviceSeo(sv).title;
  return {
    "@context": "https://schema.org",
    "@graph": [
      businessNode(virtual),
      personNode(),
      {
        "@type": "Service",
        "@id": `${SITE}${path}#service`,
        name: sv.name,
        serviceType: sv.name,
        description: sv.answer,
        provider: { "@id": BIZ },
        areaServed: businessNode(virtual).areaServed,
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: D.biz.wa,
          servicePhone: D.biz.phone,
          ...(virtual ? {} : { serviceLocation: { "@type": "Place", name: "AnamGra Holistic Therapy", address: { "@type": "PostalAddress", addressLocality: D.biz.city, addressRegion: D.biz.region, addressCountry: D.biz.country } } }),
        },
      },
      faqNode([...sv.faqs, ...D.commonFaqs]),
      crumbs([["Inicio", `${SITE}/`], ["Terapias", `${SITE}/#terapias`], [sv.name, `${SITE}${path}`]]),
      webPage(path, title),
    ],
  };
};

/* ---------- Experiencias ---------- */
const PLAN_TITLES: Record<string, string> = {
  "integral-premium": "Experiencia Integral Premium: Reiki, consulta y esencias florales | AnamGra",
  armonia: "Experiencia Armonía: Reiki + Terapia con Ángeles | AnamGra, Orlando, FL y online",
  renacer: "Experiencia Renacer: terapia de pies y meditación | AnamGra, Orlando, FL",
};
const planVirtual = (p: Plan) => p.mode.startsWith("Virtual");

export const planMeta = (p: Plan): Metadata =>
  meta({
    title: PLAN_TITLES[p.slug],
    description: `Experiencia ${p.name} en Orlando, FL${planVirtual(p) ? " y online" : ""}: ${p.incl}. ${p.duration} minutos por $${p.price}. ${p.tagline}. Reserva por WhatsApp.`,
    path: `/experiencias/${p.slug}/`,
    ogTitle: `Experiencia ${p.name} · $${p.price} · ${p.duration} min`,
    ogDescription: p.desc,
  });

export const planLd = (p: Plan) => {
  const path = `/experiencias/${p.slug}/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      { ...businessNode(false), image: undefined, priceRange: undefined, founder: undefined },
      { ...personNode(), email: undefined },
      {
        "@type": "Service",
        "@id": `${SITE}${path}#service`,
        name: `Experiencia ${p.name}`,
        description: p.answer,
        provider: { "@id": BIZ },
        areaServed: { "@type": "City", name: "Orlando" },
        offers: { "@type": "Offer", price: String(p.price), priceCurrency: "USD", url: `${SITE}${path}`, availability: "https://schema.org/InStock" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Incluye",
          itemListElement: p.steps.map((st) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: st.name } })),
        },
      },
      faqNode([...p.faqs, ...D.commonFaqs]),
      crumbs([["Inicio", `${SITE}/`], ["Experiencias", `${SITE}/#experiencias`], [`Experiencia ${p.name}`, `${SITE}${path}`]]),
      webPage(path, PLAN_TITLES[p.slug]),
    ],
  };
};

/* ---------- Blog ---------- */
export const blogMeta = (): Metadata =>
  meta({
    title: "Blog de terapias holísticas y bienestar | AnamGra",
    description: "Artículos sobre Reiki, reflexología, esencias florales, masaje prenatal y terapias complementarias, escritos por la Dra. Irina Pérez.",
    path: "/blog/",
  });

export const blogLd = () => ({
  "@context": "https://schema.org",
  "@graph": [
    businessNode(),
    personNode(),
    {
      "@type": "Blog",
      "@id": `${SITE}/blog/#blog`,
      url: `${SITE}/blog/`,
      name: "Blog AnamGra",
      inLanguage: "es",
      publisher: { "@id": BIZ },
      blogPost: D.posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE}/blog/${p.slug}/`, datePublished: p.date })),
    },
    crumbs([["Inicio", `${SITE}/`], ["Blog", `${SITE}/blog/`]]),
  ],
});

export const postMeta = (p: Post): Metadata =>
  meta({ title: p.seoTitle, description: p.excerpt, path: `/blog/${p.slug}/` });

export const postLd = (p: Post) => {
  const path = `/blog/${p.slug}/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      businessNode(),
      personNode(),
      {
        "@type": "BlogPosting",
        headline: p.title,
        description: p.excerpt,
        datePublished: p.date,
        dateModified: D.updated,
        author: { "@id": AUTHOR },
        publisher: { "@id": BIZ },
        mainEntityOfPage: `${SITE}${path}`,
        inLanguage: "es",
        articleSection: p.cat,
        citation: p.sources.map(([name, url]) => ({ "@type": "CreativeWork", name, url })),
      },
      crumbs([["Inicio", `${SITE}/`], ["Blog", `${SITE}/blog/`], [p.title, `${SITE}${path}`]]),
    ],
  };
};
