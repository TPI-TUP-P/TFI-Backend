import React from "react";

const RatingDisplay = ({ average = 0, count, size = "text-lg" }) => {
  const clamped = Math.max(0, Math.min(5, average || 0));
  const fillPercent = (clamped / 5) * 100;

  return (
    <div className="flex items-center gap-2">
      <div className="relative inline-flex leading-none">
        <div className={`flex gap-0.5 ${size} text-brand-border`}>
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i}>★</span>
          ))}
        </div>
        <div
          className={`absolute inset-0 flex gap-0.5 overflow-hidden ${size} text-brand-accent`}
          style={{ width: `${fillPercent}%` }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i}>★</span>
          ))}
        </div>
      </div>

      <span className="text-sm font-semibold text-brand-title">
        {clamped.toFixed(1)}
        {typeof count === "number" && (
          <span className="ml-1 text-xs font-normal text-brand-muted">
            ({count})
          </span>
        )}
      </span>
    </div>
  );
};

export default RatingDisplay;