import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-darkBg dark:text-darkText">
      <Navbar />
      <Dashboard />
    </div>
  );
}
