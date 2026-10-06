"use client";

import { Area, AreaChart, CartesianGrid, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import type { TrendPoint } from "../types";

type Metric = { key: keyof TrendPoint; label: string; color: string; suffix?: string; currency?: boolean };

export function TrendChart({ title, description, points, metrics }: {
  title: string;
  description: string;
  points: TrendPoint[];
  metrics: Metric[];
}) {
  const formatValue = (value: number, metricName?: string) => {
    const metric = metrics.find((item) => item.label === metricName);
    return metric?.currency
      ? new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(value)
      : `${value}${metric?.suffix ?? ""}`;
  };
  const chartConfig = metrics.reduce<ChartConfig>((config, metric) => {
    config[String(metric.key)] = { label: metric.label, color: metric.color };
    return config;
  }, {});

  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle><CardDescription>{description}</CardDescription></CardHeader>
      <CardContent>
        <div className="h-[260px] w-full">
          <ChartContainer config={chartConfig} className="h-full w-full aspect-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={points} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => value} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="min-w-[14rem]"
                      labelFormatter={(value) => String(value)}
                      valueFormatter={(value, name) => formatValue(Number(value), String(name))}
                    />
                  }
                />
                {metrics.map((metric) => (
                  <Area
                    key={`fill-${String(metric.key)}`}
                    dataKey={metric.key as string}
                    type="monotone"
                    stroke="none"
                    fill={metric.color}
                    fillOpacity={0.12}
                    tooltipType="none"
                    connectNulls={false}
                    isAnimationActive={false}
                  />
                ))}
                {metrics.map((metric) => (
                  <Line
                    key={String(metric.key)}
                    dataKey={metric.key as string}
                    name={metric.label}
                    type="monotone"
                    stroke={metric.color}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    connectNulls={false}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
