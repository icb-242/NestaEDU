"use client";

import { useRef } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Container } from "./ui/Container";
import { researchContent } from "@/lib/researchContent";

const data = researchContent.charts.participationVsProficiency;

export function ChartParticipationVsProficiency() {
  const chartRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20">
      <Container>
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Participation vs Proficiency
            </h2>
            <p className="mt-2 text-muted-foreground">
              Growth in participation compared to core proficiency rates
            </p>
          </div>

          <div ref={chartRef} className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis
                  yAxisId="left"
                  tickFormatter={(value) => `${value}%`}
                  domain={[0, 15]}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={(value) => `${value}%`}
                  domain={[0, 15]}
                />
                <Tooltip
                  formatter={(value) => [`${value}%`, ""]}
                  labelStyle={{ color: "#000" }}
                />
                <Bar
                  yAxisId="left"
                  dataKey="coreProficiencyPct"
                  name="Core Proficiency"
                  fill="hsl(var(--primary))"
                  opacity={0.4}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="participationGrowthPct"
                  name="Participation Growth"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Container>
    </section>
  );
}