"use client";
import * as React from "react";
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className = "", ...props }, ref
) {
  return (
    <input
      ref={ref}
      className={`border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 ${className}`}
      {...props}
    />
  );
});
