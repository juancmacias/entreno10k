import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Entrenamiento 10K accesible",
    short_name: "Entrenamiento 10K",
    description: "Plan accesible para preparar una carrera de 10 km.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#176b5b",
    lang: "es",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
        purpose: "any"
      }
    ]
  };
}
