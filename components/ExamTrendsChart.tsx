"use client";

import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
  ReferenceArea,
} from "recharts";
import { examData, rate } from "@/lib/examData";

const SERIES = [
  {
    key: "bjcMathEngSci",
    label: "BJC — C or better in Math, English and a science",
    color: "#2a78d6",
    dash: undefined,
  },
  {
    key: "bgcseMathEngSci",
    label: "BGCSE — C or better in Math, English and a science",
    color: "#eb6834",
    dash: "5 4",
  },
] as const;

type Mode = "rate" | "count";

function toMode(
  count: number | null,
  candidates: number | null,
  mode: Mode
): number | null {
  if (count == null) return null;
  return mode === "rate" ? rate(count, candidates) : count;
}

function CustomLegend() {
  return (
    <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-3 text-xs text-muted-foreground">
      {SERIES.map((s) => (
        <span key={s.key} className="flex items-center gap-1.5">
          <span
            className="inline-block"
            style={{
              width: 12,
              height: 3,
              background: s.dash
                ? `repeating-linear-gradient(90deg, ${s.color} 0 4px, transparent 4px 7px)`
                : s.color,
            }}
          />
          {s.label}
        </span>
      ))}
    </div>
  );
}

export function ExamTrendsChart() {
  const [mode, setMode] = useState<Mode>("rate");

  const chartData = useMemo(
    () =>
      examData.map((row) => ({
        year: row.year,
        bjcCandidates: row.bjc.candidates,
        bgcseCandidates: row.bgcse.candidates,
        bjcMathEngSci: toMode(row.bjc.mathEngSci, row.bjc.candidates, mode),
        bgcseMathEngSci: toMode(
          row.bgcse.mathEngSci,
          row.bgcse.candidates,
          mode
        ),
      })),
    [mode]
  );

  return (
    <section className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-0 pb-8">
      <div className="mb-8 text-center">
        <h2 className="text-lg font-bold tracking-tight mb-4">
          Exam Performance Trends (2015–2025)
        </h2>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <div className="flex flex-col items-center gap-3 mb-2">
          <div className="inline-flex rounded-md border text-sm">
            <button
              onClick={() => setMode("rate")}
              className={`px-3 py-1.5 rounded-l-md transition-colors ${
                mode === "rate"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              % of candidates
            </button>
            <button
              onClick={() => setMode("count")}
              className={`px-3 py-1.5 rounded-r-md transition-colors ${
                mode === "count"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              Number of students
            </button>
          </div>
          <CustomLegend />
        </div>

        <ResponsiveContainer width="100%" height={340}>
          <ComposedChart
            data={chartData}
            margin={{ top: 8, right: 16, bottom: 8, left: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--chart-grid)"
              strokeWidth={1}
            />

            <XAxis
              dataKey="year"
              interval={0}
              tickLine={false}
              axisLine={{ stroke: "var(--chart-axis)" }}
              tick={{ fill: "var(--chart-text)", fontSize: 11 }}
            />
            <YAxis
              domain={mode === "rate" ? [0, 24] : [0, "auto"]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--chart-text)", fontSize: 11 }}
              tickFormatter={(v: number) =>
                mode === "rate" ? `${v}%` : v.toLocaleString()
              }
              label={{
                value:
                  mode === "rate" ? "% of candidates" : "Number of students",
                angle: -90,
                position: "insideLeft",
                offset: -5,
                style: {
                  fill: "var(--chart-text)",
                  fontSize: 11,
                  textAnchor: "middle",
                },
              }}
            />

            <ReferenceArea
              x1={2020}
              x2={2020}
              fill="var(--chart-text)"
              fillOpacity={0.06}
              label={{
                value: "2020 — exam disruption",
                position: "top",
                style: { fill: "var(--chart-text)", fontSize: 11 },
              }}
            />

            {mode === "count" && (
              <>
                <Bar
                  dataKey="bjcCandidates"
                  fill="var(--chart-grid)"
                  barSize={14}
                  name="BJC candidates"
                  isAnimationActive={false}
                />
                <Bar
                  dataKey="bgcseCandidates"
                  fill="var(--chart-grid)"
                  barSize={14}
                  name="BGCSE candidates"
                  isAnimationActive={false}
                />
              </>
            )}

            {SERIES.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                stroke={s.color}
                strokeWidth={2}
                strokeDasharray={s.dash}
                strokeLinecap="round"
                strokeLinejoin="round"
                dot={{ r: 3, fill: s.color, strokeWidth: 0 }}
                activeDot={{
                  r: 5,
                  stroke: "var(--chart-surface)",
                  strokeWidth: 2,
                }}
                connectNulls={false}
                isAnimationActive={false}
                name={s.label}
              />
            ))}

            <Tooltip
              contentStyle={{
                background: "var(--chart-surface)",
                border: "0.5px solid var(--chart-axis)",
                borderRadius: 8,
                fontSize: 13,
              }}
              formatter={(v: number | null, name: string) =>
                v == null
                  ? ["—", name]
                  : mode === "rate"
                    ? [`${v.toFixed(1)}%`, name]
                    : [v.toLocaleString(), name]
              }
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-6 text-sm text-muted-foreground text-center max-w-3xl mx-auto">
        Eleven years, two exams, and the line barely moves. The 2020 disruption
        cut both rates sharply; both returned to where they had been — which was
        never good enough.
      </p>

      <p className="mt-4 text-sm text-muted-foreground text-center max-w-3xl mx-auto">
        Nesta currently covers Math and Science. English is central to the
        national picture and to our roadmap; grading written work well is a
        harder problem, and we&apos;d rather solve it properly than quickly.
      </p>
    </section>
  );
}
