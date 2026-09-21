'use client';

import { useEffect, useState } from "react";

interface TimerActivity {
  minutes: number;
}

export function useTrainingTimer(activities: TimerActivity[], onActivityChange: (index: number) => void, onComplete: () => void) {
  const [index, setIndex] = useState(0);
  const [remaining, setRemaining] = useState(activities[0]?.minutes ? activities[0].minutes * 60 : 0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || !activities[index] || activities[index].minutes <= 0) return;

    const timer = window.setInterval(() => {
      setRemaining(value => {
        if (value <= 1) {
          const next = index + 1;
          if (next < activities.length) {
            setIndex(next);
            onActivityChange(next);
            return activities[next].minutes * 60;
          }
          setRunning(false);
          onComplete();
          return 0;
        }
        return value - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [running, index, activities, onActivityChange, onComplete]);

  const reset = () => {
    setRunning(false);
    setIndex(0);
    setRemaining(activities[0]?.minutes ? activities[0].minutes * 60 : 0);
  };

  return { index, remaining, running, setRunning, reset };
}
