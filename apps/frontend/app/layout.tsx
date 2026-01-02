import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import "./_styles/design-system.css";
import { AuthProvider } from "./_auth/AuthProvider";
import HeaderAuth from "./_auth/HeaderAuth";

export const metadata: Metadata = {
  title: "AI Super SaaS",
  description: "Multi-module AI platform for appointments, rights, ops & more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
        <div className="app-shell">
          <header className="app-header">
            <div className="app-header-inner">
              <div className="app-header-brand">
                <span className="app-header-dot" />
                AI SUP SAAS
              </div>
              <nav className="app-nav">
              <Link href="/" className="btn">
                 Dashboard
              </Link>
          <HeaderAuth />
        </nav>

            </div>
          </header>

          <main className="app-main">
            <div className="app-main-inner">{children}</div>
          </main>
        </div>
        </AuthProvider>
      </body>
    </html>
  );
}
