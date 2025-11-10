import { useFetch } from "../hooks/useFetch";
import { getApis,getMetrics } from "../utils/api";
import ApiCard from "../components/ApiCard";

export default function Dashboard() {
  const { data: apis, loading, error } = useFetch(getApis, []);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Failed to load APIs</p>;

  return (
    <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {apis.map(api => (
        <ApiCard key={api.id} api={api} />
      ))}
    </div>
  );
}
