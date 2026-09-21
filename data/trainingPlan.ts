import type { TrainingPlan } from "@/types/training";

export const trainingPlan: TrainingPlan = {
  id: "10k-ejercicio-intenso",
  title: "Tablas de entrenamiento 10 Km",
  description: "Programa de 10 semanas para preparar una carrera de 10 km.",
  source: {
    document: "Tablas de entrenamiento 10 Km"
  },
  weeks: [
    {
      id: "week-1",
      number: 1,
      sessions: [
        { id: "w1-s1", number: 1, activities: [{ id: "w1s1a1", type: "caminar", minutes: 45, intensity: "a tu ritmo", note: "sin parar" }] },
        { id: "w1-s2", number: 2, activities: [{ id: "w1s2a1", type: "caminar", minutes: 60, intensity: "continuado" }] },
        { id: "w1-s3", number: 3, activities: [
          { id: "w1s3a1", type: "trotar", minutes: 10, intensity: "muy lento y acompasado" },
          { id: "w1s3a2", type: "caminar", minutes: 10, intensity: "rápido" },
          { id: "w1s3a3", type: "trotar", minutes: 10, intensity: "muy lento y acompasado" },
          { id: "w1s3a4", type: "caminar", minutes: 10, intensity: "rápido" }
        ] },
        { id: "w1-s4", number: 4, activities: [
          { id: "w1s4a1", type: "trotar", minutes: 10, intensity: "muy lento y acompasado" },
          { id: "w1s4a2", type: "caminar", minutes: 10, intensity: "rápido" },
          { id: "w1s4a3", type: "trotar", minutes: 10, intensity: "muy lento y acompasado" },
          { id: "w1s4a4", type: "caminar", minutes: 10, intensity: "rápido" }
        ] }
      ]
    },
    {
      id: "week-2",
      number: 2,
      sessions: [
        { id: "w2-s1", number: 1, activities: [
          { id: "w2s1a1", type: "correr", minutes: 15, intensity: "suave" },
          { id: "w2s1a2", type: "caminar", minutes: 45 }
        ] },
        { id: "w2-s2", number: 2, activities: [
          { id: "w2s2a1", type: "correr", minutes: 15, intensity: "suave" },
          { id: "w2s2a2", type: "caminar", minutes: 30 },
          { id: "w2s2a3", type: "correr", minutes: 15, intensity: "suave" }
        ] },
        { id: "w2-s3", number: 3, activities: [
          { id: "w2s3a1", type: "correr", minutes: 20, intensity: "suave" },
          { id: "w2s3a2", type: "caminar", minutes: 40, intensity: "vivo" }
        ] },
        { id: "w2-s4", number: 4, activities: [
          { id: "w2s4a1", type: "correr", minutes: 20, intensity: "suave" },
          { id: "w2s4a2", type: "caminar", minutes: 40, intensity: "vivo" }
        ] }
      ]
    },
    {
      id: "week-3",
      number: 3,
      sessions: [
        { id: "w3-s1", number: 1, activities: [{ id: "w3s1a1", type: "correr", minutes: 25, intensity: "suave", note: "sin interrupciones" }] },
        { id: "w3-s2", number: 2, activities: [{ id: "w3s2a1", type: "correr", minutes: 25, intensity: "suave", note: "sin interrupciones" }] },
        { id: "w3-s3", number: 3, activities: [{ id: "w3s3a1", type: "correr", minutes: 30, intensity: "suave", note: "sin interrupciones" }] },
        { id: "w3-s4", number: 4, activities: [{ id: "w3s4a1", type: "correr", minutes: 30, intensity: "suave", note: "sin interrupciones" }] }
      ]
    },
    {
      id: "week-4",
      number: 4,
      sessions: [
        { id: "w4-s1", number: 1, activities: [{ id: "w4s1a1", type: "correr", minutes: 30, intensity: "más rápido que la semana pasada" }] },
        { id: "w4-s2", number: 2, activities: [{ id: "w4s2a1", type: "correr", minutes: 30, intensity: "más rápido que la semana pasada" }] },
        { id: "w4-s3", number: 3, activities: [{ id: "w4s3a1", type: "correr", minutes: 40, intensity: "lento" }] },
        { id: "w4-s4", number: 4, activities: [{ id: "w4s4a1", type: "correr", minutes: 40, intensity: "lento" }] }
      ]
    },
    {
      id: "week-5",
      number: 5,
      sessions: [
        { id: "w5-s1", number: 1, activities: [{ id: "w5s1a1", type: "correr", minutes: 30, intensity: "mismo ritmo de la semana anterior" }] },
        { id: "w5-s2", number: 2, activities: [{ id: "w5s2a1", type: "correr", minutes: 30, intensity: "mismo ritmo de la semana anterior" }] },
        { id: "w5-s3", number: 3, activities: [{ id: "w5s3a1", type: "correr", minutes: 45, intensity: "a tu ritmo", note: "intentando no parar" }] },
        { id: "w5-s4", number: 4, activities: [{ id: "w5s4a1", type: "correr", minutes: 45, intensity: "a tu ritmo", note: "intentando no parar" }] }
      ]
    },
    {
      id: "week-6",
      number: 6,
      sessions: [
        { id: "w6-s1", number: 1, activities: [{ id: "w6s1a1", type: "correr", minutes: 30, intensity: "vivo" }] },
        { id: "w6-s2", number: 2, activities: [{ id: "w6s2a1", type: "correr", minutes: 30, intensity: "vivo" }] },
        { id: "w6-s3", number: 3, activities: [{ id: "w6s3a1", type: "correr", minutes: 50, intensity: "a tu ritmo", note: "intentando no parar" }] },
        { id: "w6-s4", number: 4, activities: [{ id: "w6s4a1", type: "correr", minutes: 50, intensity: "a tu ritmo", note: "intentando no parar" }] }
      ]
    },
    {
      id: "week-7",
      number: 7,
      sessions: [
        { id: "w7-s1", number: 1, activities: [
          { id: "w7s1a1", type: "correr", minutes: 30, intensity: "más rápido que puedas sin que te obligue a parar" },
          { id: "w7s1a2", type: "trotar", minutes: 10 }
        ] },
        { id: "w7-s2", number: 2, activities: [
          { id: "w7s2a1", type: "correr", minutes: 30, intensity: "más rápido que puedas sin que te obligue a parar" },
          { id: "w7s2a2", type: "trotar", minutes: 10 }
        ] },
        { id: "w7-s3", number: 3, activities: [
          { id: "w7s3a1", type: "correr", minutes: 60, intensity: "a tu ritmo" },
          { id: "w7s3a2", type: "caminar", minutes: 10, intensity: "rápido" },
          { id: "w7s3a3", type: "correr", minutes: 10, intensity: "a tu ritmo" },
          { id: "w7s3a4", type: "caminar", minutes: 10, intensity: "rápido" }
        ] },
        { id: "w7-s4", number: 4, activities: [
          { id: "w7s4a1", type: "correr", minutes: 60, intensity: "a tu ritmo" },
          { id: "w7s4a2", type: "caminar", minutes: 10, intensity: "rápido" },
          { id: "w7s4a3", type: "correr", minutes: 10, intensity: "a tu ritmo" },
          { id: "w7s4a4", type: "caminar", minutes: 10, intensity: "rápido" }
        ] }
      ]
    },
    {
      id: "week-8",
      number: 8,
      sessions: [
        { id: "w8-s1", number: 1, activities: [{ id: "w8s1a1", type: "correr", minutes: 40 }] },
        { id: "w8-s2", number: 2, activities: [{ id: "w8s2a1", type: "correr", minutes: 40 }] },
        { id: "w8-s3", number: 3, activities: [{ id: "w8s3a1", type: "correr", minutes: 60, intensity: "a tu ritmo" }] },
        { id: "w8-s4", number: 4, activities: [{ id: "w8s4a1", type: "correr", minutes: 60, intensity: "a tu ritmo" }] }
      ]
    },
    {
      id: "week-9",
      number: 9,
      sessions: [
        { id: "w9-s1", number: 1, activities: [{ id: "w9s1a1", type: "correr", minutes: 45, intensity: "a tu ritmo" }] },
        { id: "w9-s2", number: 2, activities: [{ id: "w9s2a1", type: "correr", minutes: 45, intensity: "a tu ritmo" }] },
        { id: "w9-s3", number: 3, activities: [{ id: "w9s3a1", type: "correr", minutes: 60, intensity: "a tu ritmo" }] },
        { id: "w9-s4", number: 4, activities: [{ id: "w9s4a1", type: "correr", minutes: 60, intensity: "a tu ritmo" }] }
      ]
    },
    {
      id: "week-10",
      number: 10,
      sessions: [
        { id: "w10-s1", number: 1, activities: [{ id: "w10s1a1", type: "correr", minutes: 40, intensity: "tranquilo" }] },
        { id: "w10-s2", number: 2, activities: [{ id: "w10s2a1", type: "correr", minutes: 40, intensity: "tranquilo" }] },
        { id: "w10-s3", number: 3, title: "10 Km – Muévete por la diabetes", activities: [{ id: "w10s3a1", type: "prueba", minutes: 0, intensity: "10 Km", note: "Sesión final del programa" }] }
      ]
    }
  ]
};
