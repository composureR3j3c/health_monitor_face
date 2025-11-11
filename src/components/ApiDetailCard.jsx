export default function ApiCard({ api }) {
  return (
    <div className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h2 className="text-xl font-semibold">{api.name}</h2>
      <p className="text-sm mt-1">{api.url}</p>
      <p className="mt-2 font-medium">Method: {api.httpMethod}</p>
      <p className="mt-1 text-gray-600 dark:text-gray-300">
        Polling every {api.pollingIntervalSec} seconds
      </p>
    </div>
  );
}
