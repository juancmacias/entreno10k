'use client';

import { useEffect, useMemo, useState } from "react";
import type { TrainingPlan, Session, Activity } from "@/types/training";

type Props = { plan: TrainingPlan };

function speak(text: string) {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }
}

export default function TrainingDashboard({ plan }: Props) {
  const [week, setWeek] = useState(1);
  const [sessionNumber, setSessionNumber] = useState(1);
  const [fontScale, setFontScale] = useState("100");
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [running, setRunning] = useState(false);
  const [activityIndex, setActivityIndex] = useState(0);
  const [remaining, setRemaining] = useState(0);

  const selectedWeek = plan.weeks[week - 1];
  const session: Session = selectedWeek.sessions.find(s => s.number === sessionNumber) ?? selectedWeek.sessions[0];
  const activity: Activity | undefined = session.activities[activityIndex];

  const totalSeconds = useMemo(
    () => session.activities.reduce((sum, item) => sum + item.minutes * 60, 0),
    [session]
  );

  useEffect(() => {
    if (!running || !activity || activity.minutes <= 0) return;
    const timer = window.setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          const next = activityIndex + 1;
          if (next < session.activities.length) {
            setActivityIndex(next);
            speak(`Comienza ${session.activities[next].type} durante ${session.activities[next].minutes} minutos.`);
            return session.activities[next].minutes * 60;
          }
          setRunning(false);
          speak("Sesión completada.");
          return 0;
        }
        if (prev === 300 || prev === 120 || prev === 60 || prev === 30 || prev === 10) {
          speak(`Quedan ${prev >= 60 ? `${Math.floor(prev / 60)} minutos` : `${prev} segundos`}.`);
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running, activity, activityIndex, session.activities]);

  useEffect(() => {
    if (activity && remaining === 0 && !running && activity.minutes > 0) {
      setRemaining(activity.minutes * 60);
    }
  }, [activityIndex, activity, remaining, running]);

  const start = () => {
    if (!activity) return;
    const initial = activity.minutes > 0 ? activity.minutes * 60 : 0;
    if (remaining === 0 && initial > 0) setRemaining(initial);
    setRunning(true);
    speak(`Comienza ${activity.type}${activity.intensity ? `, ${activity.intensity}` : ""}.`);
  };

  const stop = () => {
    setRunning(false);
    window.speechSynthesis?.cancel();
  };

  const resetSession = () => {
    stop();
    setActivityIndex(0);
    const first = session.activities[0];
    setRemaining(first?.minutes ? first.minutes * 60 : 0);
  };

  const changeWeek = (value: number) => {
    setWeek(value);
    setSessionNumber(1);
    setActivityIndex(0);
    setRunning(false);
    setRemaining(0);
  };

  const scale = Number(fontScale) / 100;
  const style = {
    ["--base-size" as string]: `${20 * scale}px`
  } as React.CSSProperties;

  const elapsed = Math.max(totalSeconds - remaining, 0);
  const progress = totalSeconds > 0 ? Math.min(100, ((elapsed) / totalSeconds) * 100) : 0;

  return (
    <div className={`${highContrast ? "high-contrast " : ""}${reduceMotion ? "reduce-motion" : ""}`} style={style}>
      <main>
        <header className="card">
          <p><strong>Aplicación accesible de entrenamiento 10K</strong></p>
          <h1>{plan.title}</h1>
          <p>Plan estructurado a partir del documento de entrenamiento proporcionado.</p>
        </header>

        <section className="card" aria-labelledby="access-title">
          <h2 id="access-title">Accesibilidad</h2>
          <div className="grid">
            <div>
              <label htmlFor="font">Tamaño de texto</label>
              <select id="font" value={fontScale} onChange={e => setFontScale(e.target.value)}>
                <option value="100">100 %</option>
                <option value="125">125 %</option>
                <option value="150">150 %</option>
                <option value="175">175 %</option>
                <option value="200">200 %</option>
              </select>
            </div>
            <button onClick={() => setHighContrast(v => !v)} aria-pressed={highContrast}>
              {highContrast ? "Desactivar alto contraste" : "Activar alto contraste"}
            </button>
            <button onClick={() => setReduceMotion(v => !v)} aria-pressed={reduceMotion}>
              {reduceMotion ? "Activar animaciones" : "Reducir animaciones"}
            </button>
            <button onClick={() => speak("La aplicación está lista. Selecciona una semana y una sesión.")}>
              🔊 Probar voz
            </button>
          </div>
        </section>

        <section className="card" aria-labelledby="plan-title">
          <h2 id="plan-title">Seleccionar entrenamiento</h2>
          <div className="grid">
            <div>
              <label htmlFor="week">Semana</label>
              <select id="week" value={week} onChange={e => changeWeek(Number(e.target.value))}>
                {plan.weeks.map(w => <option key={w.number} value={w.number}>Semana {w.number}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="session">Sesión</label>
              <select id="session" value={sessionNumber} onChange={e => {
                setSessionNumber(Number(e.target.value));
                setActivityIndex(0);
                setRunning(false);
                setRemaining(0);
              }}>
                {selectedWeek.sessions.map(s => <option key={s.number} value={s.number}>Sesión {s.number}</option>)}
              </select>
            </div>
          </div>
        </section>

        <section className="card" aria-labelledby="session-title">
          <h2 id="session-title">Semana {week} · Sesión {session.number}</h2>
          <div className="grid">
            {session.activities.map((item, index) => (
              <article className="activity" key={`${item.type}-${index}`}>
                <div>
                  <strong>{index + 1}. {item.type.toUpperCase()}</strong>
                  {item.intensity && <div>{item.intensity}</div>}
                  {item.note && <div>{item.note}</div>}
                </div>
                <strong>{item.minutes > 0 ? `${item.minutes} min` : "10 Km"}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="card timer" aria-labelledby="timer-title">
          <h2 id="timer-title">Entrenamiento en curso</h2>
          <div className="status" aria-live="polite">
            {activity ? activity.type.toUpperCase() : "FINALIZADO"}
          </div>
          <div className="timer-value" aria-label={`${remaining} segundos restantes`}>
            {activity?.minutes === 0 ? "10 Km" : `${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(remaining % 60).padStart(2, "0")}`}
          </div>
          {activity?.intensity && <p><strong>{activity.intensity}</strong></p>}
          <div className="progress" aria-label={`Progreso ${Math.round(progress)} por ciento`} role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
            <div style={{ width: `${progress}%` }} />
          </div>
          <div className="controls" style={{ marginTop: "1rem", justifyContent: "center" }}>
            <button className="primary" onClick={start} disabled={running || activity?.minutes === 0}>▶ Iniciar</button>
            <button onClick={() => setRunning(false)} disabled={!running}>⏸ Pausar</button>
            <button onClick={resetSession}>↻ Reiniciar sesión</button>
            <button className="danger" onClick={stop}>■ Detener</button>
          </div>
        </section>

        <footer className="card">
          <h2>Notas del documento</h2>
          <p>El documento recomienda introducir calentamiento al inicio y estiramientos al finalizar, adaptar los días de entrenamiento a la disponibilidad y utilizar material deportivo adecuado.</p>
          <p><strong>Importante:</strong> el documento aconseja consultar con un especialista ante contraindicaciones de salud y considera aconsejable un chequeo médico.</p>
        </footer>
      </main>
    </div>
  );
}
