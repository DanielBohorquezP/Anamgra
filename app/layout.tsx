import type { Metadata, Viewport } from "next";
import { Gilda_Display, Dancing_Script, DM_Sans } from "next/font/google";
import "./globals.css";
import { DATA } from "@/lib/data";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AmbientLoader from "@/components/AmbientLoader";
import { s } from "@/lib/s";

const display = Gilda_Display({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const script = Dancing_Script({ weight: ["500", "600"], subsets: ["latin"], variable: "--font-script", display: "swap" });
const ui = DM_Sans({ weight: ["300", "400", "500", "600"], subsets: ["latin"], variable: "--font-ui", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(DATA.site),
  title: "Terapias holísticas y Reiki en Orlando, FL | AnamGra",
  description:
    "Reiki, reflexología, esencias florales, masajes y más en Orlando, FL y online. Citas virtuales y presenciales con cita previa. Agenda por WhatsApp.",
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: {
    type: "website",
    locale: "es_US",
    siteName: "AnamGra Holistic Therapy",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "AnamGra Holistic Therapy · Orlando, FL" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-default.png"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${script.variable} ${ui.variable}`}>
      <body>
        <div
          style={s(
            "position:relative;overflow:clip;isolation:isolate;background:linear-gradient(180deg,#FEFAFF 0%,#FAEFFD 100%)",
          )}
        >
          <AmbientLoader />
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
