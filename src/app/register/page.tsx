"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Logo } from "../_assets/icons";
import Link from "next/link";
import { Banner2 } from "../_assets/images";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebaseClient";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import TextInput from "../_components/molecule/textinput";

function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      await setDoc(doc(db, "users", uid), {
        name,
        email,
        role: "teacher",
      });

      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
      router.push("/login");
    } catch (error: any) {
      setError(error.message);
    }
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
        <form onSubmit={handleRegister} className="space-y-4">
          <h1 className="text-xl md:text-2xl font-bold text-black md:text-[var(--foreground)] mb-2">Daftar <br className="hidden md:block" /> ke Hadirly</h1>
          <TextInput
            name="name"
            label={<span className="text-black md:text-[var(--foreground)] font-semibold">Nama</span>}
            placeholder="Masukkan nama"
            value={name}
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
          <TextInput
            name="email"
            label={<span className="text-black md:text-[var(--foreground)] font-semibold">Email</span>}
            placeholder="Masukkan email"
            value={email}
            type="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <TextInput
            name="password"
            label={<span className="text-black md:text-[var(--foreground)] font-semibold">Password</span>}
            placeholder="Masukkan password"
            value={password}
            type="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          {error && <p className="text-[var(--danger)] text-sm">{error}</p>}
          <div className="flex flex-col gap-4 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--primary)] hover:bg-[var(--secondary)] w-full text-white px-4 py-3 rounded-2xl font-bold shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Mohon Tunggu..." : "Daftar"}
            </button>
            <p className="text-sm text-[var(--foreground)] font-medium">
              Sudah punya akun?{" "}
              <Link href="/login" className="font-bold text-[var(--primary)] hover:underline">Masuk sekarang</Link>
            </p>
          </div>
        </form>
      </div>
      {/* Right/Banner Section */}
      <div className="hidden md:block w-3/5 h-full relative">
        <Image
          src={Banner2}
          alt="Banner"
          className="w-full h-full object-cover rounded-l-3xl"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/30 to-[var(--accent)]/10 rounded-l-3xl" />
      </div>
    </div>
  );
}

export default Register;
