import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Entrenamiento 10K accesible",
  description: "Aplicación web accesible basada en el plan de entrenamiento de 10 km.",
  applicationName: "Entrenamiento 10K",
  appleWebApp: {
    capable: true,
    title: "Entrenamiento 10K",
    statusBarStyle: "default"
  }
};

export const viewport: Viewport = {
  themeColor: "#176b5b"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
