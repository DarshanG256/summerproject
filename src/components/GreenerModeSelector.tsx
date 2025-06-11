import React from "react";

interface GreenerModeSelectorProps {
  value: "lowest" | "balanced" | "fastest";
  onChange: (mode: "lowest" | "balanced" | "fastest") => void;
}

const modes = [
  {
    key: "lowest",
    label: "🌿 Lowest Emission",
    color: "bg-green-100 text-green-800 border-green-300 hover:bg-green-200",
  },
  {
    key: "balanced",
    label: "🕒 Balanced",
    color:
      "bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200",
  },
  {
    key: "fastest",
    label: "⚡ Fastest",
    color: "bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200",
  },
] as const;

const GreenerModeSelector: React.FC<GreenerModeSelectorProps> = ({
  value,
  onChange,
}) => (
  <div className="flex gap-3 my-4">
    {modes.map((mode) => (
      <button
        key={mode.key}
        type="button"
        className={`px-4 py-2 rounded-lg border font-semibold transition ${
          mode.color
        } ${
          value === mode.key
            ? "ring-2 ring-offset-2 ring-black/20 scale-105"
            : ""
        }`}
        onClick={() => onChange(mode.key)}
      >
        {mode.label}
      </button>
    ))}
  </div>
);

export default GreenerModeSelector;
