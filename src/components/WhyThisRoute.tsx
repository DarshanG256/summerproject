import React, { useState } from "react";

const WhyThisRoute: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-4">
      <button
        className="text-blue-700 underline font-semibold"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        Why this route?
      </button>
      {open && (
        <div className="mt-2 p-4 bg-blue-50 border border-blue-200 rounded-lg text-gray-800">
          <strong>
            This route avoids elevation gain and urban congestion zones,
            reducing fuel consumption and emissions.
          </strong>
          <br />
          <span className="text-sm text-gray-600">
            By optimizing for smoother terrain and less traffic, you save fuel
            and reduce your carbon footprint.
          </span>
        </div>
      )}
    </div>
  );
};

export default WhyThisRoute;
