import React, { useState } from "react";

const StarRating = ({ value, onChange, readOnly = false, size = "text-2xl" }) => {
  const [hovered, setHovered] = useState(0);

  const displayValue = hovered || value;

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(0)}
          className={`${size} leading-none transition ${
            readOnly ? "cursor-default" : "cursor-pointer"
          } ${star <= displayValue ? "text-yellow-400" : "text-brand-border"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default StarRating;