"use client";

import { useEffect } from "react";

export default function AcHtmlScope() {
  useEffect(() => {
    document.documentElement.classList.add("in-ac");
    return () => {
      document.documentElement.classList.remove("in-ac");
    };
  }, []);

  return null;
}
