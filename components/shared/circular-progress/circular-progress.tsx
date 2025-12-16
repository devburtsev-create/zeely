"use client";

import { cn } from "@/lib/utils";

const defaultLabel = (progress: number) => `${progress}%`;

export interface CircularProgressProps {
  value: number;
  label?: string | ((value: number) => string);

  size?: number;
  strokeWidth?: number;
  circleStrokeWidth?: number;
  progressStrokeWidth?: number;

  className?: string;
}

export function CircularProgress({
  value,
  label = defaultLabel,

  size = 100,
  strokeWidth = 10,
  circleStrokeWidth = strokeWidth,
  progressStrokeWidth = strokeWidth,

  className,
}: CircularProgressProps) {
  const radius =
    size / 2 -
    Math.max(strokeWidth, circleStrokeWidth, progressStrokeWidth) / 2;

  const circumference = Math.ceil(3.14 * radius * 2);
  const percentage = Math.ceil(circumference * ((100 - value) / 100));

  return (
    <div className={cn("relative", className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(-90deg)" }}
        className="relative"
      >
        {/* Base Circle */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          strokeWidth={strokeWidth ?? circleStrokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset="0"
          className="stroke-white/20"
        />

        {/* Progress */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeWidth={strokeWidth ?? progressStrokeWidth}
          strokeLinecap="round"
          strokeDashoffset={percentage}
          fill="transparent"
          strokeDasharray={circumference}
          className="stroke-[#5BF0A5]"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-white text-sm">
        {typeof label === "string" ? label : label(value)}
      </div>
    </div>
  );
}
