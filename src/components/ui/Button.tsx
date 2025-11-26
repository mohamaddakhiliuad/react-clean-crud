"use client";
import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

export function Button({ variant = "primary", className = "", ...props }: Props) {
  const base = "px-4 py-2 rounded transition disabled:opacity-60";
  const styles =
    variant === "primary"
      ? "bg-black text-white hover:bg-black/90"
      : "border hover:bg-black/5";
  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
