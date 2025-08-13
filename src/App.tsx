import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import RouteForm from "./components/RouteForm";
import MapView from "./components/MapView";
import RouteStats from "./components/RouteStats";
import EmissionComparison from "./components/EmissionComparison";
import LoadingSpinner from "./components/LoadingSpinner";
import { calculateEcoRoute } from "./services/routeService";
import { RouteData, RouteRequest } from "./types";
import Chatbot from "./components/Chatbot";

function App() {
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Accept mode from RouteForm and pass to calculateEcoRoute
  const handleRouteCalculation = async (
    request: RouteRequest & { mode: "lowest" | "balanced" | "fastest" }
  ) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const result = await calculateEcoRoute(request);
      setRouteData(result);
    } catch (err) {
      setError(
        "Failed to calculate route. Please check your inputs and try again."
      );
      console.error("Route calculation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Route Form */}
          <div className="lg:col-span-1">
            <RouteForm onSubmit={handleRouteCalculation} />

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl"
                >
                  <p className="text-red-800 text-sm">{error}</p>
                </motion.div>
              )}

              {routeData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 space-y-6"
                >
                  <RouteStats data={routeData} />
                  <EmissionComparison emissions={routeData.emissions} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Panel - Map and Loading */}
          <div className="lg:col-span-2">
            <div className="relative h-[600px] lg:h-[700px] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              {loading && <LoadingSpinner />}
              <MapView routeData={routeData} />
            </div>
          </div>
        </div>
      </main>

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
}

export default App;
