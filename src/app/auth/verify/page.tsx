"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function VerifyPage() {
  const params = useSearchParams();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const e = params.get("email");
    if (e) setEmail(e);
  }, [params]);

  const verify = async () => {
    setLoading(true);
    setMsg(null);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });

    setLoading(false);

    if (error) return setMsg(error.message);

    router.push("/");
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-xl font-semibold">Verify OTP</h1>

        <input
          className="mt-4 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="mt-3 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 tracking-[0.4em] text-center outline-none"
          placeholder="123456"
          value={otp}
          onChange={(e) => setOtp(e.target.value.trim())}
        />

        <button
          className="mt-4 w-full rounded-xl bg-yellow-500 text-black font-semibold py-3 disabled:opacity-50"
          disabled={loading || !email || otp.length < 6}
          onClick={verify}
        >
          {loading ? "Verifying..." : "Verify & Login"}
        </button>

        {msg && <p className="mt-3 text-sm text-white/80">{msg}</p>}
      </div>
    </main>
  );
}
