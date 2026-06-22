"use client";

import type { AuditSection } from "@/types/audit";

const CHART_SIZE = 360;
const CENTER = CHART_SIZE / 2;
const MAX_RADIUS = 118;

function polarPoint(angle: number, radius: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function shortLabel(title: string) {
  if (title.length <= 14) return title;
  return title.replace(" & ", " ").split(" ").slice(0, 2).join(" ");
}

export function AuditRadarChart({ sections }: { sections: AuditSection[] }) {
  const count = sections.length;
  const angleStep = 360 / count;

  const gridLevels = [0.25, 0.5, 0.75, 1];
  const dataPoints = sections.map((section, index) => {
    const angle = index * angleStep;
    const radius = (section.score / 10) * MAX_RADIUS;
    return polarPoint(angle, radius);
  });

  const polygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="rounded-[18px] border border-[#2A2D4A] bg-[#191A35] p-6 sm:p-8">
      <h2 className="text-[22px] leading-none text-white BenzinSemibold sm:text-[26px]">
        Performance Overview
      </h2>
      <p className="mt-2 text-[14px] text-[#9EA2C5]">
        Category scores across your full website audit
      </p>

      <div className="mt-6 flex justify-center">
        <svg
          viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}
          className="h-auto w-full max-w-[380px]"
          role="img"
          aria-label="Audit category radar chart"
        >
          {gridLevels.map((level) => {
            const points = Array.from({ length: count }, (_, index) => {
              const angle = index * angleStep;
              return polarPoint(angle, MAX_RADIUS * level);
            });
            const path = points.map((p) => `${p.x},${p.y}`).join(" ");

            return (
              <polygon
                key={level}
                points={path}
                fill="none"
                stroke="#2E315F"
                strokeWidth="1"
              />
            );
          })}

          {sections.map((section, index) => {
            const angle = index * angleStep;
            const outer = polarPoint(angle, MAX_RADIUS);
            const labelPoint = polarPoint(angle, MAX_RADIUS + 22);

            return (
              <g key={section.id}>
                <line
                  x1={CENTER}
                  y1={CENTER}
                  x2={outer.x}
                  y2={outer.y}
                  stroke="#2E315F"
                  strokeWidth="1"
                />
                <text
                  x={labelPoint.x}
                  y={labelPoint.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#A6ABCC"
                  fontSize="9"
                  fontWeight="500"
                >
                  {shortLabel(section.title)}
                </text>
              </g>
            );
          })}

          <polygon
            points={polygon}
            fill="rgba(244, 91, 37, 0.22)"
            stroke="#F45B25"
            strokeWidth="2"
          />

          {dataPoints.map((point, index) => (
            <circle
              key={sections[index].id}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#FF7A37"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
