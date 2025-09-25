"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ComposedChart } from 'recharts';

const examData = [
  { year: 2015, bjcCandidates: 11000, bjcCore: 2179, bjcFivePlus: null, bgcseCandidates: 6714, bgcseCore: 570, bgcseFivePlus: 961 },
  { year: 2016, bjcCandidates: 11000, bjcCore: 2240, bjcFivePlus: 1514, bgcseCandidates: 6453, bgcseCore: 574, bgcseFivePlus: 903 },
  { year: 2017, bjcCandidates: 11157, bjcCore: 2269, bjcFivePlus: 1484, bgcseCandidates: 6400, bgcseCore: 521, bgcseFivePlus: 880 },
  { year: 2018, bjcCandidates: 10753, bjcCore: 2319, bjcFivePlus: 1600, bgcseCandidates: 6714, bgcseCore: 490, bgcseFivePlus: 806 },
  { year: 2019, bjcCandidates: 11157, bjcCore: 2176, bjcFivePlus: 1501, bgcseCandidates: 6454, bgcseCore: 484, bgcseFivePlus: 760 },
  { year: 2020, bjcCandidates: 10753, bjcCore: 949, bjcFivePlus: 1083, bgcseCandidates: 6073, bgcseCore: 255, bgcseFivePlus: 365 },
  { year: 2021, bjcCandidates: 9552, bjcCore: 1045, bjcFivePlus: 1164, bgcseCandidates: 4906, bgcseCore: null, bgcseFivePlus: 550 },
  { year: 2022, bjcCandidates: 9571, bjcCore: 1349, bjcFivePlus: 1361, bgcseCandidates: 5000, bgcseCore: null, bgcseFivePlus: 633 },
  { year: 2023, bjcCandidates: 10933, bjcCore: 1402, bjcFivePlus: 1417, bgcseCandidates: 5393, bgcseCore: null, bgcseFivePlus: 544 },
  { year: 2024, bjcCandidates: 10745, bjcCore: 1298, bjcFivePlus: 1388, bgcseCandidates: 5935, bgcseCore: 431, bgcseFivePlus: 653 },
];

export function ExamTrendsChart() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 pl-12 md:pl-24">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-left">
            BJC and BGCSE Exam Performance Trends (2015–2024)
          </h2>
          <p 
            className="text-left text-lg text-muted-foreground max-w-4xl"
            style={{ fontFamily: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace' }}
          >
            Historical data showing the number of candidates along with achievement rates across core subjects and >5 subjects.
          </p>
        </div>
        
        <div className="bg-card rounded-lg border p-6 relative">
          <ResponsiveContainer width="100%" height={500}>
            <ComposedChart data={examData} margin={{ top: 20, right: 30, left: 80, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis 
                dataKey="year" 
                stroke="hsl(var(--foreground))"
                style={{ fontFamily: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace' }}
              />
              <YAxis 
                stroke="hsl(var(--foreground))"
                style={{ fontFamily: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace' }}
                label={{ 
                  value: 'Number of Students', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', x: -80 }
                }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  fontFamily: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace'
                }}
                formatter={(value, name, props) => {
                  if (value === null || value === undefined) return ['N/A', name];
                  
                  // Calculate percentages for achievement data
                  let displayValue = value.toLocaleString();
                  
                  if (name.includes('≥C in Core') && props.payload) {
                    const totalCandidates = name.includes('BJC') ? props.payload.bjcCandidates : props.payload.bgcseCandidates;
                    if (totalCandidates && totalCandidates > 0) {
                      const percentage = ((value / totalCandidates) * 100).toFixed(1);
                      displayValue = `${value.toLocaleString()} (${percentage}%)`;
                    }
                  } else if (name.includes('≥C in 5+') && props.payload) {
                    const totalCandidates = name.includes('BJC') ? props.payload.bjcCandidates : props.payload.bgcseCandidates;
                    if (totalCandidates && totalCandidates > 0) {
                      const percentage = ((value / totalCandidates) * 100).toFixed(1);
                      displayValue = `${value.toLocaleString()} (${percentage}%)`;
                    }
                  }
                  
                  return [displayValue, name];
                }}
              />
              
              {/* Background bars for total candidates - subtle context */}
              <Bar 
                dataKey="bjcCandidates" 
                fill="#d1d5db" 
                opacity={0.4}
                name="BJC Total Candidates (Background)"
                radius={[2, 2, 0, 0]}
                stackId="bjc"
              />
              <Bar 
                dataKey="bgcseCandidates" 
                fill="#9ca3af" 
                opacity={0.4}
                name="BGCSE Total Candidates (Background)"
                radius={[2, 2, 0, 0]}
                stackId="bgcse"
              />
              
              {/* Achievement trend lines - main focus */}
              <Line 
                type="monotone" 
                dataKey="bjcCore" 
                stroke="#10b981" 
                strokeWidth={3}
                name="BJC ≥C in Core Subjects"
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="bgcseCore" 
                stroke="#ef4444" 
                strokeWidth={3}
                name="BGCSE ≥C in Core Subjects"
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="bjcFivePlus" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                name="BJC ≥C in 5+ Subjects"
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="bgcseFivePlus" 
                stroke="#06b6d4" 
                strokeWidth={3}
                name="BGCSE ≥C in 5+ Subjects"
                dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                connectNulls={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        {/* Custom Legend Below Chart */}
        <div className="mt-6 flex justify-center">
          <div className="bg-card rounded-lg border p-4 shadow-sm">
            <div className="flex flex-col gap-3">
              {/* Context Note */}
              <div className="text-center mb-2">
                <p className="text-xs text-muted-foreground" style={{ fontFamily: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace' }}>
                  Background bars show total number of candidate that year.
                </p>
              </div>
              
              {/* Row 1: Core Subjects */}
              <div className="flex justify-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-green-500"></div>
                  <span className="text-sm" style={{ fontFamily: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace' }}>
                    BJC ≥C in Core Subjects
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-red-500"></div>
                  <span className="text-sm" style={{ fontFamily: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace' }}>
                    BGCSE ≥C in Core Subjects
                  </span>
                </div>
              </div>
              
              {/* Row 2: 5+ Subjects */}
              <div className="flex justify-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-purple-500"></div>
                  <span className="text-sm" style={{ fontFamily: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace' }}>
                    BJC ≥C in 5+ Subjects
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-cyan-500"></div>
                  <span className="text-sm" style={{ fontFamily: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace' }}>
                    BGCSE ≥C in 5+ Subjects
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-center">
              What The Numbers Tell Us:
            </h3>
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-border md:left-1/2" />

              <div className="space-y-12">
                <div className="relative grid gap-8 md:grid-cols-2">
                  <div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary">
                        1
                      </div>
                      <div className="flex-1 max-w-lg">
                        <h4 className="font-medium mb-2">Persistent Achievement Gap</h4>
                        <p 
                          className="text-sm text-muted-foreground"
                          style={{ fontFamily: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace' }}
                        >
                          Despite tens of thousands of exam entries annually, only about 10–13% of students earn a grade C or better in five or more subjects—a graduation benchmark.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative grid gap-8 md:grid-cols-2">
                  <div className="md:col-start-2">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary">
                        2
                      </div>
                      <div className="flex-1 max-w-lg">
                        <h4 className="font-medium mb-2">Core Proficiency Remains Low</h4>
                        <p 
                          className="text-sm text-muted-foreground"
                          style={{ fontFamily: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace' }}
                        >
                          Across both BJC and BGCSE, fewer than 15% of candidates consistently secure a grade C or higher in all core subjects (Math, English, & Science), with that number dropping as low as 5–6% for BGCSE core proficiency in recent years.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative grid gap-8 md:grid-cols-2">
                  <div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary">
                        3
                      </div>
                      <div className="flex-1 max-w-lg">
                        <h4 className="font-medium mb-2">Marginal Gains, Ongoing Challenges</h4>
                        <p 
                          className="text-sm text-muted-foreground"
                          style={{ fontFamily: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace' }}
                        >
                          While there have been small improvements in A to C-grade attainment recently, overall performance remains stagnant, reinforcing the need for substantial, targeted interventions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
