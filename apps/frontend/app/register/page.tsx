"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../_auth/AuthProvider";
import { setStoredAuth } from "../_auth/authClient";

function isValidEmail(x: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x.trim());
}

function passwordScore(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[A-Z]/.test(pw) || /[^a-zA-Z0-9]/.test(pw)) score++;
  return Math.min(score, 4);
}

function strengthLabel(score: number) {
  switch (score) {
    case 0:
    case 1:
      return "Weak";
    case 2:
      return "Okay";
    case 3:
      return "Strong";
    case 4:
      return "Very strong";
    default:
      return "Weak";
  }
}

export default function RegisterPage() {
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

  const score = useMemo(() => passwordScore(password), [password]);
  const strengthPct = useMemo(() => {
    if (!password) return 0;
    return Math.max(10, (score / 4) * 100);
  }, [score, password]);

  const canSubmit = useMemo(() => {
    return isValidEmail(email) && password.length >= 8 && !loading;
  }, [email, password, loading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setMessage(data.error || "Registration failed");
        return;
      }

      if (data.token) {
        // ✅ single source of truth
        setStoredAuth(data.token, email, remember);
      }

      await auth.refresh();

      setMessage("✅ Account created! Redirecting...");
      setTimeout(() => router.push("/"), 700);
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
            <div className="auth-eyebrow">CREATE ACCOUNT</div>
            <h1 className="auth-title">Register</h1>
            <p className="auth-subtitle">
              Register to unlock your dashboard. No wallet needed — token gating comes later.
            </p>

            <div className="auth-benefits">
              <span className="auth-benefit">Register → browse</span>
              <span className="auth-benefit">Hold → unlock</span>
              <span className="auth-benefit">Spend → premium actions</span>
              <span className="auth-benefit">Fast setup</span>
            </div>

            <div className="auth-foot" style={{ marginTop: "1rem" }}>
              Already have an account?{" "}
              <Link className="link-accent" href="/login">
                Sign in →
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
                  <span className="form-hint">8+ characters</span>
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

                {/* Strength */}
                <div className="strength-wrap">
                  <div className="strength-bar" aria-hidden="true">
                    <div className="strength-fill" style={{ width: `${strengthPct}%` }} />
                  </div>
                  <div className="strength-text">
                    {password ? strengthLabel(score) : "Strength"}
                  </div>
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
                  {loading ? "Creating..." : "Create account"}
                </button>

                <Link className="btn" href="/login">
                  Sign in
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
                By registering, you agree to basic platform terms (we’ll add later).
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
