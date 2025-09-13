"use client";

import { useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Container } from "./ui/Container";
import { researchContent } from "@/lib/researchContent";

// Transform data for Recharts
const chartData = researchContent.charts.coreProficiencyBars.reduce((acc, curr) => {
  const existingGroup = acc.find(item => item.metric === curr.metric);
  if (existingGroup) {
    existingGroup[curr.exam.toLowerCase()] = curr.percent;
  } else {
    acc.push({
      metric: curr.metric,
      [curr.exam.toLowerCase()]: curr.percent,
    });
  }
  return acc;
}, [] as any[]);

export function ChartCoreProficiency() {
  const chartRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20">
      <Container>
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Core Proficiency Comparison
            </h2>
            <p className="mt-2 text-muted-foreground">
              BJC vs BGCSE performance across key metrics
            </p>
          </div>

          <div ref={chartRef} className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis
                  dataKey="metric"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis
                  tickFormatter={(value) => `${value}%`}
                  domain={[0, 100]}
                />
                <Tooltip
                  formatter={(value) => [`${value}%`, ""]}
                  labelStyle={{ color: "#000" }}
                />
                <Bar
                  dataKey="bjc"
                  name="BJC"
                  fill="hsl(var(--primary))"
                  opacity={0.8}
                />
                <Bar
                  dataKey="bgcse"
                  name="BGCSE"
                  fill="hsl(var(--primary))"
                  opacity={0.4}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Container>
    </section>
  );
}