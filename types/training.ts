export type ActivityType = "caminar" | "trotar" | "correr" | "prueba";

export interface Activity {
  id: string;
  type: ActivityType;
  minutes: number;
  intensity?: string;
  note?: string;
}

export interface Session {
  id: string;
  number: number;
  title?: string;
  activities: Activity[];
}

export interface Week {
  id: string;
  number: number;
  sessions: Session[];
}

export interface TrainingPlan {
  id: string;
  title: string;
  description: string;
  source: {
    document: string;
    page?: string;
  };
  weeks: Week[];
}
