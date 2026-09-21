# Entrenamiento 10K accesible — v2

Proyecto Next.js + TypeScript para transformar el plan de entrenamiento de 10 km en una aplicación accesible.

## Arquitectura

```text
data/       contenido del plan
types/      modelos TypeScript
lib/        persistencia y lógica independiente de UI
hooks/      lógica reutilizable
components/ interfaz
app/        entrada Next.js
```

La separación permite cambiar el contenido del plan sin rehacer el temporizador o la interfaz.

## Ejecutar

```bash
npm install
npm run dev
```

Abrir:

http://localhost:3000

## Funcionalidades

- 10 semanas estructuradas como datos.
- Sesiones e intervalos.
- Temporizador.
- Voz mediante SpeechSynthesis.
- Progreso persistente en localStorage.
- Texto 100–200 %.
- Alto contraste.
- Reducción de animaciones.
- Navegación por teclado.
- ARIA y estados accesibles.
- Preparado para evolucionar a PWA.

## Próxima arquitectura

La siguiente fase puede separar todavía más el motor de entrenamiento del componente React y añadir:
- PWA/offline.
- IndexedDB.
- vibración.
- historial detallado.
- calentamiento/estiramiento como fases configurables.
- tests automatizados de accesibilidad.
- importación de nuevos planes desde JSON.

\n## Corrección v2.1

Se ha corregido un problema por el que el temporizador se reiniciaba durante el renderizado.
Las funciones de voz ahora mantienen referencias estables y el cambio de sesión es el único
evento que reinicia el temporizador.


## Corrección de accesibilidad
El tamaño de texto se aplica directamente al contenedor de la aplicación mediante `font-size`, evitando depender de una variable CSS definida en un elemento hijo. Se muestra además el porcentaje actual.

## Historial de sesiones

Cada sesión registra:
- semana y número de sesión;
- estado: completada o abandonada;
- fecha/hora de inicio;
- fecha/hora de finalización;
- duración registrada.

El historial se guarda localmente en `localStorage`. La estructura está preparada para migrar posteriormente a IndexedDB.

## Mi progreso

Se ha añadido una vista independiente de progreso con:
- sesiones completadas y abandonadas;
- porcentaje global del programa;
- tiempo total registrado;
- progreso de cada una de las 10 semanas;
- últimas sesiones;
- acceso directo a una sesión desde el historial.

## Accesibilidad independiente

La configuración de accesibilidad se ha separado de la pantalla de entrenamiento.
La navegación principal incluye Entrenamiento, Mi progreso y Accesibilidad.

La pantalla de accesibilidad permite modificar:
- tamaño del texto entre 100 % y 300 %;
- alto contraste;
- reducción de movimiento;
- avisos por voz;
- restauración de valores.

La configuración sigue siendo global y persistente.

## Limpieza de la pantalla de entrenamiento

Se han eliminado los controles de accesibilidad que todavía aparecían dentro de la vista principal de entrenamiento.
La configuración de accesibilidad permanece disponible exclusivamente desde el apartado Accesibilidad.
