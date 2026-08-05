"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { fetchDevices, fetchDeviceReadings } from "@/lib/api";
import { Reading } from "@/lib/types";

const METRIC_COLORS: Record<string, string> = {
  TempC_SHT: "#2dd4cf",
  Ext_TempC_SHT: "#ff9f45",
  Hum_SHT: "#2dd4cf",
  Ext_Hum_SHT: "#ff9f45",
  Bateria: "#9aa0a8",
};

function toChartData(readings: Reading[]) {
  const byTimestamp: Record<string, any> = {};
  for (const r of readings) {
    if (!byTimestamp[r.timestamp]) {
      byTimestamp[r.timestamp] = { timestamp: r.timestamp };
    }
    byTimestamp[r.timestamp][r.metric_key] = r.value;
  }
  return Object.values(byTimestamp).sort((a, b) =>
    a.timestamp.localeCompare(b.timestamp)
  );
}

type MetricChartProps = {
  metricKey: string;
  readings: Reading[];
};

function MetricChart({ metricKey, readings }: MetricChartProps) {
  const chartData = toChartData(readings);
  const label = readings[0] ?.label ?? metricKey;
  const unit = readings[0] ?.unit ?? "";
  const cor = METRIC_COLORS[metricKey] ?? "#01a19e";

  return (
    <div className="bg-surface rounded-xl shadow-sm border border-border p-5">
      <h3 className="text-lg font-bold text-foreground mb-4">{label}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#30353c" />
          <XAxis dataKey="timestamp" tick={false} stroke="#30353c" />
          <YAxis unit={unit} stroke="#30353c" tick={{ fill: "#9aa0a8", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              background: "#2a2f36",
              border: "1px solid #30353c",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#9aa0a8" }}
            itemStyle={{ color: "#e6e8eb" }}
          />
          <Line
            type="monotone"
            dataKey={metricKey}
            stroke={cor}
            dot={false}
            strokeWidth={2}
            name={label}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function DeviceHistory() {
  const params = useParams();
  const deviceId = Number(params.id);

  const { data: readings, isLoading, error } = useQuery({
    queryKey: ["readings", deviceId],
    queryFn: () => fetchDeviceReadings(deviceId),
    refetchInterval: 5000,
  });

  const { data: devices } = useQuery({
    queryKey: ["devices"],
    queryFn: fetchDevices,
  });

  const device = devices ?.find((d) => d.id === deviceId);
  const deviceName = device ?.name ?? `Dispositivo ${deviceId}`;

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar histórico.</p>;

  const todosReadings = readings ?? [];
  const metricasExibidas = ["TempC_SHT", "Ext_TempC_SHT", "Hum_SHT", "Ext_Hum_SHT", "Bateria"];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">
        Histórico — {deviceName}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {metricasExibidas.map((metricKey) => {
          const readingsDaMetrica = todosReadings.filter(
            (r) => r.metric_key === metricKey
          );
          if (readingsDaMetrica.length === 0) return null;
          return (
            <MetricChart
              key={metricKey}
              metricKey={metricKey}
              readings={readingsDaMetrica}
            />
          );
        })}
      </div>
    </div>
  );
}