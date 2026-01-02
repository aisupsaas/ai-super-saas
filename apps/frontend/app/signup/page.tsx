"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      console.log("Submitting signup", { email });

      const res = await fetch("http://localhost:5001/auth/signup", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email, password }),
});


      console.log("Signup response status:", res.status);

      const data = await res.json();

      if (!res.ok || !data?.success) {
        setMessage(data?.error || "Signup failed");
        return;
      }

      setMessage("✅ Account created! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (err) {
      console.error("Network error:", err);
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 border rounded-lg p-6 bg-white shadow-sm space-y-4">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <p className="text-sm text-gray-600">
        Create an account so you can access your modules.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-black text-white py-2 text-sm font-medium disabled:opacity-60"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>

      {message && <div className="text-sm mt-2">{message}</div>}

      <p className="text-xs text-gray-500 mt-4">
        Already have an account?{" "}
        <a href="/login" className="underline">
          Login
        </a>
      </p>
    </div>
  );
}
