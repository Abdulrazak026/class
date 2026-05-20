import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

export function CircularProgress({ value, size = 120, strokeWidth = 10, label }: { value: number; size?: number; strokeWidth?: number; label?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  const [currentValue, setCurrentValue] = useState(0);
  const startValueRef = useRef(0);

  useEffect(() => {
    const duration = 1000;
    const startValue = startValueRef.current;
    startValueRef.current = value;
    const increment = value - startValue;
    let startTime: number | null = null;
    let rafId: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCurrentValue(startValue + increment * easeOutQuart);
      if (progress < 1) rafId = requestAnimationFrame(animate);
      else setCurrentValue(value);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [value]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle strokeWidth={strokeWidth} stroke="currentColor" fill="transparent" r={radius} cx={size / 2} cy={size / 2} className="text-slate-200" />
        <motion.circle
          strokeWidth={strokeWidth} strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx={size / 2} cy={size / 2}
          className="text-indigo-600"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center pointer-events-none">
        <span className="text-2xl font-bold text-slate-800 tracking-tight">{Math.round(currentValue)}%</span>
        {label && <span className="text-xs text-slate-500 font-medium uppercase mt-0.5">{label}</span>}
      </div>
    </div>
  );
}
