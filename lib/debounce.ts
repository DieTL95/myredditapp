"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function useRebounce(value: string) {
  const [debouncedValue, setDebouncedValue] = useState<string>();

  const debounce = useDebouncedCallback((value: string) => {
    if (value) {
      setDebouncedValue(value);
    }
  }, 1000);
  console.log("DEBOUNCE:", debounce);
  debounce(value);
  return debouncedValue;
}
