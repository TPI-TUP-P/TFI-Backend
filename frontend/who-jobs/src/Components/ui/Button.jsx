import React from "react";

const variants = {
  primary: "bg-brand-title text-white",
  accent: "bg-brand-accent text-white",
  outline: "border border-brand-title text-brand-title",
};

const Button = ({ children, variant = "primary",type="button", className = "", ...props }) => {
  return (
    <button type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98] ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;