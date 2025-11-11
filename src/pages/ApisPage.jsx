import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { getApis } from "../utils/api";

export default function ApisPage() {
  const { data: apis, loading, error } = useFetch(getApis, []);
  const [expandedId, setExpandedId] = useState(null);

  if (loading)
    return <p className="text-gray-500 dark:text-gray-300">Loading APIs...</p>;
  if (error)
    return (
      <p className="text-red-500 dark:text-red-400">Failed to load APIs</p>
    );
  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-[#0f1117]">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Monitored APIs
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {apis.map((api) => {
          const isExpanded = expandedId === api.id;
          return (
            <li
              key={api.id}
              onClick={() => toggleExpand(api.id)}
              className="p-4 border rounded-xl shadow-sm bg-gray-100 dark:bg-gray-800 hover:shadow-md transition hover:shadow-xl transition transform hover:scale-105 duration-300"
            >
              <h2
                className={`font-semibold text-lg text-gray-800 dark:text-gray-200 ${
                  isExpanded ? "whitespace-normal break-words" : "truncate"
                }`}
                title={!isExpanded ? api.name : ""}
              >
                {api.name}
              </h2>
              <p
                 className={`text-sm text-gray-800 dark:text-gray-200 mt-1 ${
                  isExpanded ? "whitespace-normal break-all" : "truncate"
                }`}
                title={api.url}
              >
                {api.url}
              </p>
              <span
                className={`text-xs  mt-2 block text-gray-500 dark:text-gray-400`}
              >
                Method:{" "}
                <span
                  className={`${
                    api.httpMethod == "GET"
                      ? "text-green-500"
                      : "text-yellow-500"
                  } font-semibold text-lg`}
                >
                  {api.httpMethod}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
