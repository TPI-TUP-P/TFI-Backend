import React from 'react'
import { useId } from 'react';

const Input = ({nameLabel, error , type = "text",classname= "",...props}) => {
   const id = useId();

    return (
    <div className="flex w-full flex-col gap-1.5">
      {nameLabel && (
        <label
          htmlFor={id}
          className="font-mono text-[11px] uppercase tracking-[0.15em] text-brand-muted"
        >
          {nameLabel}
        </label>
      )}
 
      <input
        id={id}
        type={type}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border bg-brand-card px-4 py-3 font-body text-sm text-brand-title outline-none transition-all duration-200 placeholder:text-brand-muted/50 focus:ring-2 ${
          error
            ? "border-red-400 focus:border-red-400 focus:ring-red-400/25"
            : "border-brand-border focus:border-brand-title focus:ring-brand-title/15"
        } ${classname}`}
        {...props}
      />
 
      {error && (
        <p id={`${id}-error`} className="font-mono text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

export default Input