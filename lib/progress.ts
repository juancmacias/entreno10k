'use client';

export type SessionStatus = "completed" | "abandoned";

export interface SessionRecord {
  id: string;
  sessionId: string;
  week: number;
  session: number;
  status: SessionStatus;
  startedAt: string;
  finishedAt: string;
  durationSeconds: number;
}

export interface ProgressState {
  completedSessions: string[];
  lastWeek: number;
  lastSession: number;
  history: SessionRecord[];
}

const KEY = "training-10k-progress";

const emptyState: ProgressState = {
  completedSessions: [],
  lastWeek: 1,
  lastSession: 1,
  history: []
};

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return emptyState;

  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyState;

    const parsed = JSON.parse(raw) as Partial<ProgressState>;

    return {
      completedSessions: parsed.completedSessions ?? [],
      lastWeek: parsed.lastWeek ?? 1,
      lastSession: parsed.lastSession ?? 1,
      history: parsed.history ?? []
    };
  } catch {
    return emptyState;
  }
}

export function saveProgress(state: ProgressState) {
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(state));
  }
}

export function saveSessionRecord(record: SessionRecord): ProgressState {
  const current = loadProgress();

  const history = [
    record,
    ...current.history.filter(item => item.id !== record.id)
  ];

  const completedSessions =
    record.status === "completed"
      ? Array.from(new Set([...current.completedSessions, record.sessionId]))
      : current.completedSessions;

  const next: ProgressState = {
    completedSessions,
    lastWeek: record.week,
    lastSession: record.session,
    history
  };

  saveProgress(next);
  return next;
}

export function markSessionCompleted(
  sessionId: string,
  week: number,
  session: number,
  startedAt: string,
  durationSeconds: number
): ProgressState {
  return saveSessionRecord({
    id: `${sessionId}-${Date.now()}`,
    sessionId,
    week,
    session,
    status: "completed",
    startedAt,
    finishedAt: new Date().toISOString(),
    durationSeconds
  });
}

export function markSessionAbandoned(
  sessionId: string,
  week: number,
  session: number,
  startedAt: string,
  durationSeconds: number
): ProgressState {
  return saveSessionRecord({
    id: `${sessionId}-${Date.now()}`,
    sessionId,
    week,
    session,
    status: "abandoned",
    startedAt,
    finishedAt: new Date().toISOString(),
    durationSeconds
  });
}
