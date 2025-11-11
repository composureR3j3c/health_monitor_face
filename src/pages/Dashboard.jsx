import { useFetch } from "../hooks/useFetch";
import { getApis } from "../utils/api";
import ApiCard from "../components/ApiCard";

export default function Dashboard() {
  const { data: apis, loading, error } = useFetch(getApis, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0f1117]">
        <p className="text-gray-600 dark:text-gray-400 animate-pulse">
          Loading APIs...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0f1117]">
        <p className="text-red-600 dark:text-red-400 text-lg font-semibold">
          Failed to load APIs
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0f1117] transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-6">

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apis.map((api) => (
            <ApiCard key={api.id} api={api} />
          ))}
        </div>
      </div>
    </div>
  );
}
