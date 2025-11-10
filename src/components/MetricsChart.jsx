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

export default function ApiCard({ api }) {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([
  { timestamp: "14:13", latency: 649, statusCode: 200 },
  { timestamp: "14:14", latency: 1200, statusCode: 500 },
  { timestamp: "14:15", latency: 530, statusCode: 200 }
]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching metrics for API:", api.id);
    getMetrics(api.id)
      .then(res => {
        console.log("Raw API response:", res.data);

        const data = Array.isArray(res.data) ? res.data : [];
        if (data.length === 0) {
          console.warn("No metrics returned from API");
          setLoading(false);
          return;
        }

        // Calculate uptime
        const upCount = data.filter(m => m.statusCode === 200).length;
        const uptimePercent = ((upCount / data.length) * 100).toFixed(2);

        // Average latency
        const avgLatency = (
          data.reduce((sum, m) => sum + (Number(m.latencyMs) || 0), 0) / data.length
        ).toFixed(2);

        setStats({ uptimePercent, avgLatency });

        // Prepare chart data
        const chart = data.map(m => {
          const time = m.timestamp ? new Date(m.timestamp) : new Date();
          return {
            timestamp: time.toLocaleTimeString(),
            latency: Number(m.latencyMs) || 0,
            statusCode: Number(m.statusCode) || 0
          };
        });
        console.log("Prepared chart data:", chart);
        setChartData(chart);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching metrics:", err);
        setLoading(false);
      });
  }, [api.id]);

  // Custom dot for coloring by status
  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    if (cx == null || cy == null) return null; // skip invalid points
    const color = payload.statusCode === 200 ? "#4caf50" : "#f44336"; // green=up, red=down
    return <circle cx={cx} cy={cy} r={4} fill={color} stroke="none" />;
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition">
      <h2 className="text-lg font-semibold">{api.name}</h2>
      <p className="text-sm text-gray-500">{api.url}</p>

      <div className="mt-3">
        {loading ? (
          <p className="text-gray-400">Loading metrics...</p>
        ) : stats ? (
          <>
            <p>Uptime: <b>{stats.uptimePercent}%</b></p>
            <p>Average Latency: <b>{stats.avgLatency} ms</b></p>
          </>
        ) : (
          <p className="text-gray-400">No metrics available</p>
        )}
      </div>

      {/* Debug info */}
      <div className="mt-2 text-sm text-gray-500">
        <p>Chart points: {chartData.length}</p>
        {chartData.length === 0 && <p>No chart data available</p>}
      </div>

      {/* Latency Chart */}
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
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
