import React, { useEffect, useMemo, useRef, useState } from "react";

interface Step {
  text: string;
  seconds?: number;
}

interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  steps: Step[];
  time_minutes: number;
  difficulty: string;
  allergens: string[];
  image?: string;
}

interface CookingModeProps {
  recipe: Recipe;
}

export default function CookingMode({ recipe }: CookingModeProps) {
  const [idx, setIdx] = useState(0);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const step = recipe.steps[idx];

  useEffect(() => {
    if (remaining === null) return;
    if (remaining <= 0) {
      beep();
      setRemaining(null);
      return;
    }
    timerRef.current = setTimeout(() => setRemaining(remaining - 1), 1000);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [remaining]);

  useEffect(() => {
    if (speaking && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(step.text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    } else if (!speaking) {
      speechSynthesis.cancel();
    }
  }, [speaking, step.text]);

  function beep() {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = 880; // A5
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      setTimeout(() => {
        o.stop();
        ctx.close();
      }, 400);
    } catch {}
  }

  const progress = useMemo(() => ((idx + 1) / recipe.steps.length) * 100, [idx, recipe.steps.length]);

  const markStepComplete = (stepIndex: number) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
  };

  const isStepComplete = (stepIndex: number) => completedSteps.has(stepIndex);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Recipe Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>⏱️ {recipe.time_minutes} min</span>
          <span>💪 {recipe.difficulty}</span>
          {recipe.allergens.length > 0 && (
            <span>⚠️ Contains: {recipe.allergens.join(", ")}</span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Step {idx + 1} of {recipe.steps.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>

      {/* Current Step */}
      <div className="mb-6 p-6 rounded-2xl shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Current Step</h3>
          <button
            onClick={() => markStepComplete(idx)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isStepComplete(idx)
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200"
            }`}
          >
            {isStepComplete(idx) ? "✓ Completed" : "Mark Complete"}
          </button>
        </div>
        <div className="text-xl leading-relaxed text-gray-700 mb-4">{step.text}</div>
        
        {step.seconds && (
          <div className="text-sm text-gray-600">
            Estimated time: {Math.round(step.seconds / 60)} minutes
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <button
          className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
          disabled={idx === 0}
        >
          ← Previous
        </button>

        <button
          className="px-6 py-3 rounded-xl bg-black text-white hover:opacity-90 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setIdx((i) => Math.min(recipe.steps.length - 1, i + 1))}
          disabled={idx === recipe.steps.length - 1}
        >
          Next →
        </button>

        <button
          className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:opacity-90 font-medium transition-colors"
          onClick={() => setSpeaking((s) => !s)}
        >
          {speaking ? "🔇 Mute Voice" : "🔊 Speak Step"}
        </button>

        {remaining === null ? (
          <button
            className="ml-auto px-6 py-3 rounded-xl bg-green-600 text-white hover:opacity-90 font-medium transition-colors"
            onClick={() => setRemaining(step.seconds ?? 60)}
          >
            ⏰ Start Timer{step.seconds ? ` (${Math.round(step.seconds / 60)}m)` : ""}
          </button>
        ) : (
          <div className="ml-auto flex items-center gap-3">
            <div className="text-2xl font-mono font-bold text-red-600">
              {fmt(remaining)}
            </div>
            <button 
              className="px-4 py-2 rounded-xl bg-red-600 text-white hover:opacity-90 font-medium transition-colors" 
              onClick={() => setRemaining(null)}
            >
              Stop Timer
            </button>
          </div>
        )}
      </div>

      {/* Ingredients Checklist */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Ingredients Checklist</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {recipe.ingredients.map((ingredient, i) => (
            <label key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input 
                type="checkbox" 
                className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500"
              />
              <span className="text-gray-700">{ingredient}</span>
            </label>
          ))}
        </div>
      </div>

      {/* All Steps Overview */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">All Steps</h2>
        <div className="space-y-3">
          {recipe.steps.map((s, i) => (
            <div 
              key={i} 
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                i === idx 
                  ? "border-blue-500 bg-blue-50" 
                  : isStepComplete(i)
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
              onClick={() => setIdx(i)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    i === idx 
                      ? "bg-blue-500 text-white" 
                      : isStepComplete(i)
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}>
                    {isStepComplete(i) ? "✓" : i + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Step {i + 1}</div>
                    <div className="text-gray-600">{s.text}</div>
                    {s.seconds && (
                      <div className="text-sm text-gray-500 mt-1">
                        ⏱️ {Math.round(s.seconds / 60)} minutes
                      </div>
                    )}
                  </div>
                </div>
                {isStepComplete(i) && (
                  <div className="text-green-600 font-medium">✓ Complete</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
}
