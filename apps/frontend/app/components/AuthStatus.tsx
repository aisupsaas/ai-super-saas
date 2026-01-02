"use client";

import { useEffect, useState } from "react";

export default function AuthStatus() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("authEmail");
      setEmail(storedEmail);
    }
  }, []);

  if (!email) {
    return (
      <p className="text-sm text-gray-600">
        Not logged in. <a href="/login" className="underline">Login</a> or{" "}
        <a href="/signup" className="underline">sign up</a>.
      </p>
    );
  }

  return (
    <div className="text-sm text-gray-700">
      Logged in as: <span className="font-semibold">{email}</span>{" "}
      <button
        className="ml-2 text-xs underline"
        onClick={() => {
          localStorage.removeItem("authToken");
          localStorage.removeItem("authEmail");
          window.location.reload();
        }}
      >
        Logout
      </button>
    </div>
  );
}
