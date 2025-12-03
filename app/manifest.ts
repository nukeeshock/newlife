import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NEW LIFE VIETNAM",
    short_name: "NLV",
    description: "Premium Real Estate in Vietnam - Villas, Apartments & Residenzen",
    start_url: "/",
    display: "standalone",
    background_color: "#08090d",
    theme_color: "#c9a962",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
