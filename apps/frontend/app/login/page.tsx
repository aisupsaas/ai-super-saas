"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../_auth/AuthProvider";
import { setStoredAuth } from "../_auth/authClient";

function isValidEmail(x: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x.trim());
}

export default function LoginPage() {
  const router = useRouter();
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);

  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("authEmail");
    if (saved) setEmail(saved);
  }, []);

  const canSubmit = useMemo(() => {
    return isValidEmail(email) && password.length > 0 && !loading;
  }, [email, password, loading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setMessage("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setMessage(data.error || "Login failed");
        return;
      }

      if (data.token) {
        // ✅ single source of truth
        setStoredAuth(data.token, email, remember);
      }

      await auth.refresh();

      setMessage("✅ Signed in! Redirecting...");
      setTimeout(() => router.push("/"), 600);
    } catch (err) {
      console.error(err);
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <section className="surface auth-aurora">
        <div className="auth-shell">
          {/* Left */}
          <div className="auth-left">
            <div className="auth-eyebrow">WELCOME BACK</div>
            <h1 className="auth-title">Sign in</h1>
            <p className="auth-subtitle">
              Access your dashboard and unlock modules based on your level (Register / Hold / Spend).
            </p>

            <div className="auth-benefits">
              <span className="auth-benefit">Live modules</span>
              <span className="auth-benefit">Fast access</span>
              <span className="auth-benefit">Token gating later</span>
              <span className="auth-benefit">Secure sessions</span>
            </div>

            <div className="auth-foot" style={{ marginTop: "1rem" }}>
              Need an account?{" "}
              <Link className="link-accent" href="/register">
                Register →
              </Link>
            </div>

            <div className="auth-foot">
              Back to{" "}
              <Link className="link-accent" href="/">
                dashboard
              </Link>
              .
            </div>
          </div>

          {/* Right */}
          <div className="auth-right">
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "0.95rem" }}
            >
              {/* Email */}
              <div className="form-row">
                <div className="form-label-row">
                  <label className="form-label">Email</label>
                  <span className="form-hint">
                    {email ? (isValidEmail(email) ? "Looks valid" : "Check format") : ""}
                  </span>
                </div>

                <input
                  className="input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled={loading}
                  required
                />
              </div>

              {/* Password + show */}
              <div className="form-row">
                <div className="form-label-row">
                  <label className="form-label">Password</label>
                  <span className="form-hint">Your account password</span>
                </div>

                <div className="input-row">
                  <input
                    className="input input-with-action"
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    className="input-action"
                    onClick={() => setShowPw((v) => !v)}
                    disabled={loading}
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="remember-row">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    disabled={loading}
                  />
                  Remember me
                </label>

                <div className="form-hint">
                  {remember ? "Stored on this device" : "Session only"}
                </div>
              </div>

              {/* Actions */}
              <div className="auth-actions">
                <button type="submit" className="btn btn-primary" disabled={!canSubmit}>
                  {loading ? "Signing in..." : "Sign in"}
                </button>

                <Link className="btn" href="/register">
                  Register
                </Link>
              </div>

              {message && (
                <div
                  className="surface"
                  style={{
                    padding: "0.75rem",
                    borderRadius: "var(--r-md)",
                    background: "var(--bg-card)",
                  }}
                >
                  <div style={{ fontSize: "0.85rem", color: "var(--text-soft)" }}>
                    {message}
                  </div>
                </div>
              )}

              <div className="auth-foot">
                No wallet required to sign in. Token checks come later.
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
