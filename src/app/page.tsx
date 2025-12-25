export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-xl font-semibold">Supabase Email OTP</h1>
        <p className="text-white/70 mt-2">
          Go to <span className="text-white">/auth/login</span>
        </p>
      </div>
    </main>
  );
}
