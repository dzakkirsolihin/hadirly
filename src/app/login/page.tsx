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
    <div className="flex items-center w-screen h-screen justify-between font-poppins">
      <div className="flex flex-col w-2/5 h-full p-16 gap-16">
        <div className="flex flex-row items-center gap-4">
          <Image src={Logo} alt="Logo" width={120} />
          <div className="flex flex-col">
            <p className="text-2xl text-duniacoding-primary font-bold">
              Hadirly
            </p>
            <p className="text-primary">
              Hadirku, Hadirmu, Hadir Kita Semua
            </p>
          </div>
        </div>
        <h1 className="text-xl font-bold text-primary">
          Masuk <br /> ke Hadirly
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-primary font-semibold">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email"
              className="border px-4 py-3 w-full border-disable rounded-lg placeholder:text-disable placeholder:font-light text-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-primary font-semibold">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan Password"
              className="border px-4 py-3 w-full border-disable rounded-lg placeholder:text-disable placeholder:font-light text-sm"
            />
          </div>
          {error && <p className="text-error text-sm">{error}</p>}
          <div className="flex flex-col gap-2 mt-10">
            <button
              type="submit"
              disabled={loading}
              className="bg-duniakoding-primary text-white px-4 py-2 rounded-2xl font-bold"
            >
              {loading ? "Memuat..." : "Masuk"}
            </button>
            <p>
              Belum punya akun?{" "}
              <Link href="/register" className="text-duniacoding-primary">
                Daftar Sekarang
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className="w-3/5 h-full">
        <Image
          src={Banner}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Login;
