import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Entrenamiento 10K accesible",
  description: "Aplicación web accesible basada en el plan de entrenamiento de 10 km."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
