import React from "react";

export default function DescriptionPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-8 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-teal-700 dark:text-teal-400 mb-6">
          System Overview
        </h1>

        <p className="text-lg leading-relaxed">
          This application is a unified monitoring dashboard designed to track the health,
          latency, and uptime of APIs deployed across different business domains such as
          <b> banking</b>, <b>e-commerce</b>, and <b>fraud detection</b>. It provides
          real-time visibility into each API’s performance and serves as a foundation for
          intelligent service observability.
        </p>

        <h2 className="text-2xl font-semibold mt-10">Architecture & Deployment</h2>
        <div className="bg-gray-200 dark:bg-gray-800 rounded-xl p-6 shadow-md space-y-3">
          <p>
            The backend is powered by a <b>Spring Boot</b> application that exposes
            RESTful endpoints. These endpoints aggregate metrics
            from multiple services and periodically poll third-party or internal APIs.
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <b>Frontend:</b> React + TailwindCSS (with dark mode and responsive layout).
            </li>
            <li>
              <b>Backend:</b> Spring Boot application exposing REST endpoints for metrics
              aggregation.
            </li>
            <li>
              <b>Data Layer:</b> Metrics collected from multiple domains (banking, e-commerce,
              fraud detection) and cached for faster visualization.
            </li>
            
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-10">Key Features</h2>
        <ul className="list-disc ml-6 space-y-3">
          <li>
            <b>Real-time Monitoring:</b> Tracks API latency, response codes, and uptime.
          </li>
          <li>
            <b>Domain Segmentation:</b> Separates APIs by their operational domain for better
            organization and insight.
          </li>
          <li>
            <b>Fallback Mode:</b> When live APIs are offline, the system reads sample data from
            local JSON files to maintain demo usability.
          </li>
          <li>
            <b>Dark Mode Support:</b> Unified styling across pages and persisted user preference.
          </li>
          <li>
            <b>Pluggable Architecture:</b> New services can be added dynamically through the
            Settings page or future integrations.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10">Extentions</h2>
        <ul className="list-disc ml-6 space-y-3">
          <li>
            <b>Kafka-based Observability:</b> Stream log4j based logs directly to the
            dashboard for live diagnostics.
          </li>
          <li>
            <b>Fraud Detection Insights:</b> Integrate drift-aware analytics modules to
            identify abnormal API behaviors.
          </li>
          <li>
            <b>Historical Trend Analysis:</b> Store metrics and visualize latency evolution
            over time.
          </li>
          <li>
            <b>Alerting System:</b> Trigger notifications when SLA thresholds are breached.
          </li>
        </ul>

        <p className="mt-8 text-sm italic text-gray-500 dark:text-gray-400">
          Note: In demo mode, the dashboard simulates live metrics using predefined JSON data
          to demonstrate functionality even when the backend is offline.
        </p>
      </div>
    </div>
  );
}
