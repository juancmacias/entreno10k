'use client';

import { useEffect, useState } from "react";

export function useAccessibility() {
  const [fontScale, setFontScale] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("training-10k-accessibility");
    if (!saved) return;
    try {
      const value = JSON.parse(saved);
      setFontScale(value.fontScale ?? 100);
      setHighContrast(value.highContrast ?? false);
      setReduceMotion(value.reduceMotion ?? false);
      setVoiceEnabled(value.voiceEnabled ?? true);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "training-10k-accessibility",
      JSON.stringify({ fontScale, highContrast, reduceMotion, voiceEnabled })
    );
  }, [fontScale, highContrast, reduceMotion, voiceEnabled]);

  const reset = () => {
    setFontScale(100);
    setHighContrast(false);
    setReduceMotion(false);
    setVoiceEnabled(true);
  };

  return {
    fontScale,
    setFontScale,
    highContrast,
    setHighContrast,
    reduceMotion,
    setReduceMotion,
    voiceEnabled,
    setVoiceEnabled,
    reset
  };
}
