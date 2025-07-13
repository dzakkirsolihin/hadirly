"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Logo } from "../_assets/icons";
import { Banner } from "../_assets/images";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseClient";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();

      setAuth(token);
      redirectToDashboard();
    } catch (err: any) {
      setError(err.message ?? "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  const redirectToDashboard = () => {
    router.push("/dashboard");
  };

  const setAuth = (token: string) => {
    setCookie("token", token, {
      maxAge: 60 * 60 * 24, // 1 hari
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-center w-full min-h-screen justify-center md:justify-between font-poppins bg-[var(--background)] transition-colors duration-300">
      {/* Left/Form Section */}
      <div className="flex flex-col w-full md:w-2/5 h-full p-6 md:p-16 gap-8 md:gap-16 bg-white md:bg-transparent shadow-lg md:shadow-none rounded-none md:rounded-3xl z-10">
        <div className="flex flex-row items-center gap-4 mb-4">
          <Image src={Logo} alt="Logo" width={56} height={56} className="rounded-xl bg-[var(--primary)] p-2" />
          <div className="flex flex-col">
            <p className="text-2xl text-[var(--primary)] font-bold tracking-tight">Hadirly</p>
            <p className="text-sm font-medium text-[var(--primary)]/80 md:text-[var(--secondary)]">Hadirku, Hadirmu, Hadir Kita Semua</p>
          </div>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-black md:text-[var(--foreground)] mb-2">Masuk <br className="hidden md:block" /> ke Hadirly</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-black md:text-[var(--foreground)] font-semibold">Email</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email"
              className="border border-[var(--disable)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] px-4 py-3 w-full rounded-xl placeholder:text-[var(--disable)] placeholder:font-light text-sm bg-transparent text-black md:text-[var(--foreground)] transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-black md:text-[var(--foreground)] font-semibold">Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan Password"
              className="border border-[var(--disable)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] px-4 py-3 w-full rounded-xl placeholder:text-[var(--disable)] placeholder:font-light text-sm bg-transparent text-black md:text-[var(--foreground)] transition-all"
            />
          </div>
          {error && <p className="text-[var(--danger)] text-sm">{error}</p>}
          <div className="flex flex-col gap-2 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--primary)] hover:bg-[var(--secondary)] text-white px-4 py-3 rounded-2xl font-bold shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Memuat..." : "Masuk"}
            </button>
            <p className="text-sm text-[var(--foreground)]">
              Belum punya akun?{" "}
              <Link href="/register" className="text-[var(--primary)] font-semibold hover:underline">Daftar Sekarang</Link>
            </p>
          </div>
        </form>
      </div>
      {/* Right/Banner Section */}
      <div className="hidden md:block w-3/5 h-full relative">
        <Image
          src={Banner}
          alt="Banner"
          className="w-full h-full object-cover rounded-l-3xl"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/30 to-[var(--accent)]/10 rounded-l-3xl" />
      </div>
    </div>
  );
}

export default Login;
