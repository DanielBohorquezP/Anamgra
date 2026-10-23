"use client";

import dynamic from "next/dynamic";

const Ambient = dynamic(() => import("./Ambient"), { ssr: false });

export default function AmbientLoader() {
  return <Ambient />;
}
