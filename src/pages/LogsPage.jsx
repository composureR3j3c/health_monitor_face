import React, { useEffect, useState } from "react";
import sampleMetrics from "../data/sampleMetrics.json"; // your demo metrics file

export default function LogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // In demo mode, load from local JSON file
      if (sampleMetrics && typeof sampleMetrics === "object") {
      // Flatten all metric arrays from each API ID
      const allLogs = Object.values(sampleMetrics).flat();
      
      setLogs(allLogs);
      console.log("allLogs"+allLogs);
    }
     else if (Array.isArray(sampleMetrics)) {
    setLogs(sampleMetrics);
  } else if (sampleMetrics && sampleMetrics.data) {
    // If it's wrapped like { data: [...] }
    setLogs(sampleMetrics.data);
  } else {
    console.warn("Unexpected metrics format:", sampleMetrics);
    setLogs([]);
  }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-8 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-teal-700 dark:text-teal-400 mb-6">
          API Response Logs
        </h1>

        {logs.length === 0 ? (
          <p className="text-gray-500">No logs available.</p>
        ) : (
          <div className="space-y-6">
            {logs.map((log) => (
              <div
                key={log.id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 transition hover:shadow-lg"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-semibold">{log.api.name}</h2>
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      log.statusCode === 200
                        ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                        : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                    }`}
                  >
                    {log.statusCode}
                  </span>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                  <b>URL:</b> {log.api.url}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                  <b>Method:</b> {log.api.httpMethod} | <b>Latency:</b>{" "}
                  {log.latencyMs}ms
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-400 mb-4">
                  <b>Timestamp:</b>{" "}
                  {new Date(log.timestamp).toLocaleString()}
                </p>
                <h3 className="text-lg font-semibold mb-2">Response Snippet:</h3>
                <pre className="bg-green-100 dark:bg-gray-900 text-gray-700 dark:text-gray-100 p-4 rounded-lg shadow font-mono text-sm whitespace-pre-wrap break-words">
                  {log.responseSnippet}
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
