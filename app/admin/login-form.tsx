"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const { error } = await signIn.email({ email, password });
    if (error) {
      setError(error.message ?? "Wrong email or password");
      return;
    }
    router.refresh();
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-72">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border rounded px-3 py-2"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border rounded px-3 py-2"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="bg-black text-white rounded px-3 py-2">
          Sign in
        </button>
      </form>
    </div>
  );
}
