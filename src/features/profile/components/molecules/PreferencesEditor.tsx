// src/features/profile/components/molecules/PreferencesEditor.tsx
"use client";

import * as React from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

/* -------------------------------------------------------------------------- */
/*                                  Utilities                                 */
/* -------------------------------------------------------------------------- */

/**
 * Converts an object of key-value pairs into an array of editable rows.
 * Each row gets a unique id for stable React rendering.
 */
function toRows(obj?: Record<string, string>): Row[] {
  if (!obj) return [];
  return Object.entries(obj).map(([k, v]) => ({
    id: crypto.randomUUID(),
    key: k,
    value: v,
  }));
}

/**
 * Converts the editable row array back to an object.
 * - Ignores empty keys
 * - Ensures values are always strings
 */
function toObject(rows: Row[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const r of rows) {
    if (r.key.trim() !== "") out[r.key] = r.value ?? "";
  }
  return out;
}

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type Row = { id: string; key: string; value: string };

type PreferencesEditorProps = {
  /** Current preferences object (key-value pairs) */
  value?: Record<string, string>;
  /** Callback fired whenever the preferences change */
  onChange: (next: Record<string, string>) => void;
};

/* -------------------------------------------------------------------------- */
/*                             PreferencesEditor                              */
/* -------------------------------------------------------------------------- */

/**
 * PreferencesEditor
 * --------------------------------------------------------------------------
 * Allows users to dynamically edit a list of key-value pairs.
 * - Each row represents a preference key and value.
 * - Synchronizes changes upward via `onChange`.
 * - Supports adding/removing rows dynamically.
 */
export function PreferencesEditor({ value, onChange }: PreferencesEditorProps) {
  // Local editable state (derived from parent value)
  const [rows, setRows] = React.useState<Row[]>(() => toRows(value));

  /* ---------------------------------------------------------------------- */
  /*                        Sync when parent value changes                  */
  /* ---------------------------------------------------------------------- */
  React.useEffect(() => {
    setRows(toRows(value));
  }, [value]);

  /* ---------------------------------------------------------------------- */
  /*                                Handlers                                */
  /* ---------------------------------------------------------------------- */

  const add = React.useCallback(() => {
    setRows((prev) => [
      ...prev,
      { id: crypto.randomUUID(), key: "", value: "" },
    ]);
  }, []);

  const remove = React.useCallback(
    (id: string) => {
      setRows((prev) => {
        const next = prev.filter((r) => r.id !== id);
        onChange(toObject(next));
        return next;
      });
    },
    [onChange]
  );

  const update = React.useCallback(
    (id: string, prop: "key" | "value", val: string) => {
      setRows((prev) => {
        const next = prev.map((r) =>
          r.id === id ? { ...r, [prop]: val } : r
        );
        onChange(toObject(next));
        return next;
      });
    },
    [onChange]
  );

  /* ---------------------------------------------------------------------- */
  /*                                 Render                                 */
  /* ---------------------------------------------------------------------- */

  return (
    <div className="grid gap-3">
      {/* Header row */}
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">Preferences</div>
        <Button type="button" variant="outline" onClick={add}>
          Add Row
        </Button>
      </div>

      {/* Editable rows */}
      <div className="grid gap-2">
        {rows.length === 0 ? (
          <div className="text-sm text-gray-500">No preferences yet.</div>
        ) : (
          rows.map((row) => (
            <div key={row.id} className="flex gap-2 items-center">
              <Input
                placeholder="key (e.g., theme)"
                value={row.key}
                onChange={(e) => update(row.id, "key", e.target.value)}
                className="flex-1"
              />
              <Input
                placeholder="value (e.g., light)"
                value={row.value}
                onChange={(e) => update(row.id, "value", e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => remove(row.id)}
              >
                Remove
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
