import { useState, useEffect } from "react";
import { getMetrics } from "../utils/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function ApiCard({ api, pollingInterval = 10000 }) {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Polling for lively dashboard ---
  useEffect(() => {
    let intervalId;

    const fetchMetrics = async () => {
      try {
        const res = await getMetrics(api.id);
        const data = Array.isArray(res.data) ? res.data : [];
        if (!data.length) return;

        // --- Stats ---
        const upCount = data.filter(m => m.statusCode === 200).length;
        const uptimePercent = ((upCount / data.length) * 100).toFixed(2);
        const avgLatency = (
          data.reduce((sum, m) => sum + (Number(m.latencyMs) || 0), 0) / data.length
        ).toFixed(2);
        setStats({ uptimePercent, avgLatency });

        // --- Chart Data ---
        const chart = data.map(m => ({
          timestamp: new Date(m.timestamp).toLocaleTimeString(),
          latency: Number(m.latencyMs) || 0,
          statusCode: Number(m.statusCode) || 0
        }));
        setChartData(chart);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching metrics:", err);
      }
    };

    fetchMetrics();
    intervalId = setInterval(fetchMetrics, pollingInterval); // poll every 10 sec

    return () => clearInterval(intervalId);
  }, [api.id, pollingInterval]);

  // --- Custom Dot for lively effect ---
  const CustomDot = ({ cx, cy, payload }) => {
    if (cx == null || cy == null) return null;
    const color = payload.statusCode === 200 ? "#4caf50" : "#f44336";
    return (
      <circle
        cx={cx}
        cy={cy}
        r={payload === chartData[chartData.length - 1] ? 6 : 4} // pulse last point
        fill={color}
        stroke="#fff"
        strokeWidth={payload === chartData[chartData.length - 1] ? 2 : 0}
        style={{ transition: "r 0.3s, stroke-width 0.3s" }}
      />
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 hover:shadow-xl transition transform hover:scale-105 duration-300">
      <h2 className="text-lg font-semibold">{api.name}</h2>
      <p className="text-sm text-gray-500">{api.url}</p>

      <div className="mt-3 flex justify-between items-center">
        {stats ? (
          <>
            <div>
              <p>
                Uptime:{" "}
                <b className={stats.uptimePercent < 100 ? "text-red-500" : "text-green-500"}>
                  {stats.uptimePercent}%
                </b>
              </p>
              <p>Avg Latency: <b>{stats.avgLatency} ms</b></p>
            </div>
          </>
        ) : (
          <p className="text-gray-400">Loading metrics...</p>
        )}
      </div>

      {/* --- Chart --- */}
      {chartData.length > 0 && (
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="latency"
                stroke="#e8a926"
                strokeWidth={2}
                dot={<CustomDot />}
                isAnimationActive={true}
                animationDuration={500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
