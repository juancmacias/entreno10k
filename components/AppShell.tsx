'use client';

import { useEffect, useMemo, useState, useCallback } from "react";
import { trainingPlan } from "@/data/trainingPlan";
import { markSessionAbandoned, markSessionCompleted, loadProgress, type ProgressState } from "@/lib/progress";
import { useAccessibility } from "@/hooks/useAccessibility";
import { useSpeech } from "@/hooks/useSpeech";
import type { Session } from "@/types/training";

function formatTime(seconds: number) {
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}



function AccessibilityView({
  accessibility
}: {
  accessibility: ReturnType<typeof useAccessibility>;
}) {
  return (
    <section aria-labelledby="accessibility-page-title">
      <header className="card">
        <p><strong>CONFIGURACIÓN</strong></p>
        <h1 id="accessibility-page-title">Accesibilidad</h1>
        <p>
          Personaliza la aplicación para que resulte más cómoda y legible.
          Los cambios se aplican a toda la aplicación y se guardan automáticamente.
        </p>
      </header>

      <section className="card accessibility-panel" aria-labelledby="text-title">
        <h2 id="text-title">Tamaño del texto</h2>
        <p>Tamaño actual: <strong>{accessibility.fontScale} %</strong></p>
        <div className="accessibility-controls">
          <button
            aria-label="Reducir tamaño del texto"
            onClick={() => accessibility.setFontScale(Math.max(100, accessibility.fontScale - 25))}
          >
            A−
          </button>
          <span className="font-scale-value" aria-live="polite">
            {accessibility.fontScale} %
          </span>
          <button
            aria-label="Aumentar tamaño del texto"
            onClick={() => accessibility.setFontScale(Math.min(300, accessibility.fontScale + 25))}
          >
            A+
          </button>
        </div>
        <label>
          Tamaño mediante selector
          <select
            value={accessibility.fontScale}
            onChange={event => accessibility.setFontScale(Number(event.target.value))}
          >
            {[100, 125, 150, 175, 200, 225, 250, 275, 300].map(value => (
              <option key={value} value={value}>{value} %</option>
            ))}
          </select>
        </label>
      </section>

      <section className="card accessibility-panel" aria-labelledby="contrast-title">
        <h2 id="contrast-title">Contraste</h2>
        <label>
          <input
            type="checkbox"
            checked={accessibility.highContrast}
            onChange={event => accessibility.setHighContrast(event.target.checked)}
          />
          Alto contraste
        </label>
      </section>

      <section className="card accessibility-panel" aria-labelledby="motion-title">
        <h2 id="motion-title">Movimiento</h2>
        <label>
          <input
            type="checkbox"
            checked={accessibility.reduceMotion}
            onChange={event => accessibility.setReduceMotion(event.target.checked)}
          />
          Reducir animaciones y movimiento
        </label>
      </section>

      <section className="card accessibility-panel" aria-labelledby="voice-title">
        <h2 id="voice-title">Lectura y sonido</h2>
        <label>
          <input
            type="checkbox"
            checked={accessibility.voiceEnabled}
            onChange={event => accessibility.setVoiceEnabled(event.target.checked)}
          />
          Activar avisos por voz durante el entrenamiento
        </label>
      </section>

      <section className="card accessibility-panel" aria-labelledby="reset-title">
        <h2 id="reset-title">Restaurar configuración</h2>
        <p>Vuelve a los valores iniciales de accesibilidad.</p>
        <button onClick={accessibility.reset}>
          Restaurar valores
        </button>
      </section>
    </section>
  );
}

function ProgressView({
  progress,
  totalSessions,
  completedCount,
  planProgress,
  onSelectSession
}: {
  progress: ProgressState;
  totalSessions: number;
  completedCount: number;
  planProgress: number;
  onSelectSession: (week: number, session: number) => void;
}) {
  const completed = progress.history.filter(item => item.status === "completed");
  const abandoned = progress.history.filter(item => item.status === "abandoned");
  const totalMinutes = completed.reduce((sum, item) => sum + item.durationSeconds, 0) / 60;

  return (
    <section aria-labelledby="my-progress-title">
      <header className="card">
        <p><strong>RESUMEN</strong></p>
        <h1 id="my-progress-title">Mi progreso</h1>
        <p>Consulta tus sesiones realizadas y el avance del programa de 10 semanas.</p>
      </header>

      <section className="stats-grid" aria-label="Resumen del progreso">
        <article className="stat-card">
          <span>Sesiones</span>
          <strong>{completedCount} / {totalSessions}</strong>
        </article>
        <article className="stat-card">
          <span>Progreso</span>
          <strong>{planProgress}%</strong>
        </article>
        <article className="stat-card">
          <span>Tiempo entrenando</span>
          <strong>{Math.floor(totalMinutes / 60)} h {Math.round(totalMinutes % 60)} min</strong>
        </article>
        <article className="stat-card">
          <span>Abandonadas</span>
          <strong>{abandoned.length}</strong>
        </article>
      </section>

      <section className="card" aria-labelledby="global-progress-title">
        <h2 id="global-progress-title">Progreso del programa</h2>
        <p><strong>{completedCount} de {totalSessions} sesiones completadas</strong></p>
        <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={planProgress}>
          <div style={{ width: `${planProgress}%` }} />
        </div>
      </section>

      <section className="card" aria-labelledby="weeks-progress-title">
        <h2 id="weeks-progress-title">Progreso por semana</h2>
        <div className="week-progress-list">
          {trainingPlan.weeks.map(week => {
            const weekSessionIds = new Set(week.sessions.map(session => session.id));
            const done = completed.filter(item => weekSessionIds.has(item.sessionId)).length;
            const percent = Math.round((done / week.sessions.length) * 100);

            return (
              <article className="week-progress" key={week.id}>
                <div className="week-progress-header">
                  <strong>Semana {week.number}</strong>
                  <span>{done} / {week.sessions.length} · {percent}%</span>
                </div>
                <div className="progress" role="progressbar" aria-label={`Semana ${week.number}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
                  <div style={{ width: `${percent}%` }} />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="card" aria-labelledby="history-progress-title">
        <h2 id="history-progress-title">Últimas sesiones</h2>

        {progress.history.length === 0 ? (
          <p>Todavía no has terminado ninguna sesión.</p>
        ) : (
          <div className="history-list">
            {progress.history.slice(0, 20).map(record => (
              <article className="history-item" key={record.id}>
                <div>
                  <strong>Semana {record.week} · Sesión {record.session}</strong>
                  <div>
                    {new Date(record.finishedAt).toLocaleDateString("es-ES")} ·{" "}
                    {Math.floor(record.durationSeconds / 60)} min
                  </div>
                </div>

                <div className="history-actions">
                  <strong className={record.status === "completed" ? "status-completed" : "status-abandoned"}>
                    {record.status === "completed" ? "✓ Completada" : "Abandonada"}
                  </strong>
                  <button onClick={() => onSelectSession(record.week, record.session)}>
                    Ver sesión
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}

export default function AppShell() {
  const accessibility = useAccessibility();
  const { speak, stop } = useSpeech(accessibility.voiceEnabled);
  const [weekNumber, setWeekNumber] = useState(1);
  const [sessionNumber, setSessionNumber] = useState(1);
  const [activityIndex, setActivityIndex] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());
  const [startedAt, setStartedAt] = useState<string | null>(null);
  const [view, setView] = useState<"training" | "progress" | "accessibility">("training");

  const week = trainingPlan.weeks[weekNumber - 1];
  const session: Session = week.sessions.find(s => s.number === sessionNumber) ?? week.sessions[0];
  const activity = session.activities[activityIndex];

  const totalSeconds = useMemo(
    () => session.activities.reduce((sum, a) => sum + a.minutes * 60, 0),
    [session]
  );

  const resetTimer = useCallback(() => {
    setRunning(false);
    stop();
    setActivityIndex(0);
    setRemaining(session.activities[0]?.minutes ? session.activities[0].minutes * 60 : 0);
  }, [session.id, session.activities, stop]);

  useEffect(() => {
    resetTimer();
    // Reset only when the selected session changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.id]);

  const complete = useCallback(() => {
    setRunning(false);
    const start = startedAt ?? new Date().toISOString();
    const durationSeconds = Math.max(
      totalSeconds - remaining,
      0
    );

    speak("Sesión completada.");
    setProgress(
      markSessionCompleted(
        session.id,
        weekNumber,
        session.number,
        start,
        durationSeconds
      )
    );
    setStartedAt(null);
  }, [
    session.id,
    session.number,
    speak,
    weekNumber,
    startedAt,
    totalSeconds,
    remaining
  ]);

  useEffect(() => {
    if (!running || !activity || activity.minutes <= 0) return;

    const timer = window.setInterval(() => {
      setRemaining(value => {
        if (value <= 1) {
          const next = activityIndex + 1;
          if (next < session.activities.length) {
            setActivityIndex(next);
            const nextActivity = session.activities[next];
            speak(`Comienza ${nextActivity.type}, ${nextActivity.minutes} minutos${nextActivity.intensity ? `, ${nextActivity.intensity}` : ""}.`);
            return nextActivity.minutes * 60;
          }
          complete();
          return 0;
        }

        if ([300, 120, 60, 30, 10].includes(value)) {
          speak(`Quedan ${value >= 60 ? Math.floor(value / 60) + " minutos" : value + " segundos"}.`);
        }

        return value - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [running, activity, activityIndex, session.activities, speak, complete]);

  const start = () => {
    if (!activity) return;
    if (activity.minutes <= 0) {
      complete();
      return;
    }
    if (remaining <= 0) setRemaining(activity.minutes * 60);
    if (!startedAt) setStartedAt(new Date().toISOString());
    setRunning(true);
    speak(`Comienza ${activity.type}${activity.intensity ? `, ${activity.intensity}` : ""}.`);
  };

  const changeWeek = (value: number) => {
    setWeekNumber(value);
    setSessionNumber(1);
    setActivityIndex(0);
    setRunning(false);
  };

  const changeSession = (value: number) => {
    setSessionNumber(value);
    setActivityIndex(0);
    setRunning(false);
  };

  const completedCount = progress.completedSessions.length;
  const totalSessions = trainingPlan.weeks.reduce((sum, w) => sum + w.sessions.length, 0);
  const planProgress = Math.round((completedCount / totalSessions) * 100);
  const elapsed = Math.max(totalSeconds - remaining, 0);
  const timerProgress = totalSeconds ? Math.round((elapsed / totalSeconds) * 100) : 100;

  const style = {
    fontSize: `${accessibility.fontScale}%`
  } as React.CSSProperties;

  const classes = [
    accessibility.highContrast ? "high-contrast" : "",
    accessibility.reduceMotion ? "reduce-motion" : ""
  ].join(" ");

  return (
    <div className={classes} style={style}>
      <main>
        <nav className="app-nav card" aria-label="Navegación principal">
          <button
            className={view === "training" ? "nav-active" : ""}
            aria-current={view === "training" ? "page" : undefined}
            onClick={() => setView("training")}
          >
            🏃 Entrenamiento
          </button>
          <button
            className={view === "progress" ? "nav-active" : ""}
            aria-current={view === "progress" ? "page" : undefined}
            onClick={() => setView("progress")}
          >
            📊 Mi progreso
          </button>
          <button
            className={view === "accessibility" ? "nav-active" : ""}
            aria-current={view === "accessibility" ? "page" : undefined}
            onClick={() => setView("accessibility")}
          >
            ⚙ Accesibilidad
          </button>
        </nav>



        {view === "training" && (
          <>
         
                  <section className="card" aria-labelledby="plan-title">
                    <h2 id="plan-title">Plan</h2>
                    <div className="grid">
                      <div>
                        <label htmlFor="week">Semana</label>
                        <select id="week" value={weekNumber} onChange={e => changeWeek(Number(e.target.value))}>
                          {trainingPlan.weeks.map(w => <option key={w.id} value={w.number}>Semana {w.number}</option>)}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="session">Sesión</label>
                        <select id="session" value={sessionNumber} onChange={e => changeSession(Number(e.target.value))}>
                          {week.sessions.map(s => <option key={s.id} value={s.number}>Sesión {s.number}</option>)}
                        </select>
                      </div>
                    </div>
                  </section>
          
                  <section className="card" aria-labelledby="progress-title">
                    <h2 id="progress-title">Progreso del plan</h2>
                    <p><strong>{completedCount} de {totalSessions} sesiones completadas · {planProgress}%</strong></p>
                    <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={planProgress}>
                      <div style={{ width: `${planProgress}%` }} />
                    </div>
                  </section>
          
                  <section className="card" aria-labelledby="session-title">
                    <h2 id="session-title">Semana {weekNumber} · Sesión {session.number}</h2>
                    {session.title && <p><strong>{session.title}</strong></p>}
                    <div className="grid">
                      {session.activities.map((item, index) => (
                        <article className="activity" key={item.id}>
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
                    <h2 id="timer-title">Modo entrenamiento</h2>
                    <p className="status" aria-live="polite">{activity?.type.toUpperCase() ?? "FINALIZADO"}</p>
                    <div className="timer-value" aria-live="off">
                      {activity?.minutes === 0 ? "10 Km" : formatTime(remaining)}
                    </div>
                    {activity?.intensity && <p><strong>{activity.intensity}</strong></p>}
                    <p aria-live="polite">
                      {activity?.minutes === 0 ? "Sesión final del programa." : `${remaining} segundos restantes.`}
                    </p>
                    <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={timerProgress}>
                      <div style={{ width: `${timerProgress}%` }} />
                    </div>
                    <div className="controls">
                      <button className="primary" onClick={start} disabled={running}>▶ Iniciar</button>
                      <button onClick={() => setRunning(false)} disabled={!running}>⏸ Pausar</button>
                      <button onClick={resetTimer}>↻ Reiniciar</button>
                      <button
                        className="danger"
                        onClick={() => {
                          if (startedAt && (running || remaining < totalSeconds)) {
                            const durationSeconds = Math.max(totalSeconds - remaining, 0);
                            setProgress(
                              markSessionAbandoned(
                                session.id,
                                weekNumber,
                                session.number,
                                startedAt,
                                durationSeconds
                              )
                            );
                          }
                          setRunning(false);
                          setStartedAt(null);
                          stop();
                        }}
                      >
                        ■ Detener
                      </button>
                    </div>
                  </section>
          
                  <section className="card" aria-labelledby="history-title">
                    <h2 id="history-title">Mi historial</h2>
                    <p>
                      <strong>{progress.history.filter(item => item.status === "completed").length}</strong>
                      {" "}sesiones completadas ·{" "}
                      <strong>{progress.history.filter(item => item.status === "abandoned").length}</strong>
                      {" "}abandonadas
                    </p>
          
                    {progress.history.length === 0 ? (
                      <p>Aún no hay sesiones registradas. Cuando finalices una sesión aparecerá aquí.</p>
                    ) : (
                      <div className="history-list">
                        {progress.history.slice(0, 12).map(record => (
                          <article className="history-item" key={record.id}>
                            <div>
                              <strong>
                                Semana {record.week} · Sesión {record.session}
                              </strong>
                              <div>
                                {new Date(record.finishedAt).toLocaleDateString("es-ES")} ·{" "}
                                {Math.floor(record.durationSeconds / 60)} min
                              </div>
                            </div>
                            <strong className={record.status === "completed" ? "status-completed" : "status-abandoned"}>
                              {record.status === "completed" ? "✓ Completada" : "Abandonada"}
                            </strong>
                          </article>
                        ))}
                      </div>
                    )}
                  </section>
          
                  <section className="card" aria-labelledby="source-title">
                    <h2 id="source-title">Fuente y notas</h2>
                    <p>Fuente: {trainingPlan.source.document}.</p>
                    <p>El documento aconseja consultar con un especialista ante contraindicaciones de salud y considera aconsejable un chequeo médico.</p>
                    <p>También recomienda calentamiento al inicio, estiramientos al finalizar y adaptar los días de entrenamiento a la disponibilidad.</p>
                  </section>
          </>
        )}

        {view === "progress" && (
          <ProgressView
            progress={progress}
            totalSessions={totalSessions}
            completedCount={completedCount}
            planProgress={planProgress}
            onSelectSession={(week, session) => {
              setWeekNumber(week);
              setSessionNumber(session);
              setView("training");
            }}
          />
        )}

        {view === "accessibility" && (
          <AccessibilityView
            accessibility={accessibility}
          />
        )}

      </main>
    </div>
  );
}
