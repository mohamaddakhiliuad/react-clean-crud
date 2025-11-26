"use client";
import * as React from "react";
export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className = "", ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={`border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 ${className}`}
        {...props}
      />
    );
  }
);
