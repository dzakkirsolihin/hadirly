"use client";
import { useState } from "react";
import { db } from "@/lib/firebaseClient";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Modal from "../_components/molecule/modal/modal";

export default function RegisterStudentPage() {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [grade, setGrade] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const formatPhoneNumber = (phone: string) => {
    if (phone.startsWith("0")) {
      return "62" + phone.slice(1);
    }
    return phone;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const ref = doc(db, "students", studentId);
      const existing = await getDoc(ref);

      if (existing.exists()) {
        setError("Nomor Induk sudah terdaftar.");
        return;
      }

      await setDoc(ref, {
        name,
        studentId,
        grade,
        parentPhone: formatPhoneNumber(parentPhone),
      });

      setShowModal(true);
      setName("");
      setStudentId("");
      setGrade("");
      setParentPhone("");
    } catch (err: any) {
      setError(err.message ?? "Gagal mendaftarkan siswa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-full flex justify-center items-start">
        <form onSubmit={handleSubmit} className="p-4 md:p-10 space-y-4 max-w-md w-full bg-white dark:bg-[var(--background)] rounded-2xl shadow-xl border border-[var(--disable)] mt-8 transition-colors duration-300">
          <h1 className="text-xl font-bold text-[var(--primary)] mb-4">Tambah Siswa</h1>

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-[var(--foreground)] font-semibold text-sm mb-1">Nama Siswa</label>
            <input
              name="name"
              type="text"
              placeholder="Masukkan Nama Siswa"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-[var(--disable)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] px-4 py-3 w-full rounded-xl placeholder:text-[var(--disable)] placeholder:font-light text-sm bg-transparent text-[var(--foreground)] transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="studentId" className="text-[var(--foreground)] font-semibold text-sm mb-1">Nomor Induk Siswa</label>
            <input
              name="studentId"
              type="number"
              placeholder="Masukkan 5 digit Nomor Induk Siswa"
              maxLength={5}
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
              className="border border-[var(--disable)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] px-4 py-3 w-full rounded-xl placeholder:text-[var(--disable)] placeholder:font-light text-sm bg-transparent text-[var(--foreground)] transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="grade" className="text-[var(--foreground)] font-semibold text-sm mb-1">Kelas</label>
            <select
              name="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="border border-[var(--disable)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] px-4 py-3 w-full rounded-xl placeholder:text-[var(--disable)] placeholder:font-light text-sm bg-white dark:bg-[var(--background)] text-[var(--foreground)] transition-all"
              title="Pilih Kelas"
            >
              <option value="" disabled>
                Pilih Kelas
              </option>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n} className="text-[var(--foreground)] bg-white dark:bg-[var(--background)]">
                  Kelas {n}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="parentPhone" className="text-[var(--foreground)] font-semibold text-sm mb-1">No. Telp Orang Tua</label>
            <input
              name="parentPhone"
              type="number"
              placeholder="Max 13 digit, awali dengan 0"
              maxLength={13}
              value={parentPhone}
              onChange={(e) => setParentPhone(e.target.value)}
              required
              className="border border-[var(--disable)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] px-4 py-3 w-full rounded-xl placeholder:text-[var(--disable)] placeholder:font-light text-sm bg-transparent text-[var(--foreground)] transition-all"
            />
          </div>

          {error && <p className="text-[var(--danger)] text-sm font-semibold mt-2">{error}</p>}
          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--primary)] hover:bg-[var(--secondary)] w-full text-white px-4 py-3 rounded-2xl font-bold shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Menyimpan..." : "Simpan Siswa"}
            </button>
          </div>
        </form>
      </div>
      <Modal
        title="Sukses"
        content="Berhasil mendaftarkan siswa baru."
        type="success"
        isOpen={showModal}
        buttonText1="OK"
        buttonType1="primary"
        onConfirm={() => setShowModal(false)}
      />
    </>
  );
}
