"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    setLoading(true);
    setMsg(null);

    const redirectTo =
      `${process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin}/auth/verify?email=${encodeURIComponent(email)}`;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    setLoading(false);
    setMsg(error ? error.message : "OTP sent. Check your email.");
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-xl font-semibold">Login (Email OTP)</h1>

        <input
          className="mt-4 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="mt-4 w-full rounded-xl bg-yellow-500 text-black font-semibold py-3 disabled:opacity-50"
          disabled={loading || !email}
          onClick={sendOtp}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>

        {msg && <p className="mt-3 text-sm text-white/80">{msg}</p>}
      </div>
    </main>
  );
}
