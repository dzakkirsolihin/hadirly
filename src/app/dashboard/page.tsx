"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseClient";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

interface Student {
  name: string;
  studentId: string;
  grade: string;
}

interface Attendance {
  name: string;
  studentId: string;
  grade: string;
  status: string;
  date: string;
}

export default function AttendanceTablePage() {
  const [grades, setGrades] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const getTodayInWIB = () => {
    const now = new Date();
    const offsetInMs = 7 * 60 * 60 * 1000; // UTC+7
    const wibDate = new Date(now.getTime() + offsetInMs);
    return wibDate.toISOString().split("T")[0];
  };

  const today = getTodayInWIB();

  useEffect(() => {
    const fetchGrades = async () => {
      const snapshot = await getDocs(collection(db, "students"));
      const uniqueGrades = Array.from(
        new Set(snapshot.docs.map((doc) => doc.data().grade))
      );
      setGrades(uniqueGrades.sort());
    };
    fetchGrades();
  }, []);

  const handleFetchAttendance = async () => {
    if (!selectedDate || !selectedGrade) return;

    setLoading(true);
    setDataLoaded(false);
    const snapshot = await getDocs(collection(db, "students"));
    const filteredStudents = snapshot.docs
      .map((doc) => doc.data() as Student)
      .filter((student) => student.grade === selectedGrade);

    const attendanceResults: Attendance[] = [];

    for (const student of filteredStudents) {
      const attendanceDoc = await getDoc(
        doc(db, "attendance", `${student.studentId}_${selectedDate}`)
      );
      if (attendanceDoc.exists()) {
        attendanceResults.push(attendanceDoc.data() as Attendance);
      } else {
        setAttendances([]);
      }
    }

    setAttendances(attendanceResults);
    setLoading(false);
    setDataLoaded(true);
  };

  return (
    <div className="p-4 md:p-10 max-w-3xl mx-auto space-y-6 font-poppins bg-[var(--background)] min-h-screen transition-colors duration-300">
      <h1 className="text-xl md:text-2xl font-bold text-[var(--primary)] mb-2">Rekap Kehadiran Siswa</h1>

      <div className="flex flex-col md:flex-row gap-4 bg-white/80 dark:bg-[var(--background)]/80 p-4 md:p-0 rounded-xl shadow-md md:shadow-none">
        <div className="relative w-full md:w-40">
          <input
            type="date"
            placeholder="Pilih Tanggal"
            max={today}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-[var(--disable)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] p-3 w-full font-normal rounded-xl placeholder:text-[var(--disable)] placeholder:font-light text-sm bg-transparent text-[var(--foreground)] transition-all custom-date-picker"
          />
        </div>
        <div className="relative w-full md:w-40">
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="appearance-none border border-[var(--disable)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] px-4 py-3 w-full font-normal rounded-xl placeholder:text-[var(--disable)] placeholder:font-light text-sm bg-white dark:bg-[var(--background)] text-[var(--foreground)] transition-all custom-select pr-10"
            title="Pilih Kelas"
          >
            <option className="text-[var(--disable)] bg-white dark:bg-[var(--background)]" value="">
              Pilih Kelas
            </option>
            {grades.map((grade) => (
              <option key={grade} value={grade} className="text-[var(--foreground)] bg-white dark:bg-[var(--background)]">
                Kelas {grade}
              </option>
            ))}
          </select>
          {/* Custom arrow icon */}
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--disable)]">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div className="w-full md:w-40">
          <button
            onClick={handleFetchAttendance}
            className="bg-[var(--primary)] hover:bg-[var(--secondary)] w-full text-white px-4 py-3 rounded-2xl font-bold shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={!selectedDate || !selectedGrade || loading}
          >
            {loading ? "Memuat..." : "Tampilkan"}
          </button>
        </div>
      </div>

      {dataLoaded && (
        <div className="overflow-x-auto">
          {attendances.length === 0 ? (
            <p className="text-[var(--disable)] mt-4">Data Belum Tersedia</p>
          ) : (
            <table className="w-full mt-6 border text-left rounded-xl overflow-hidden shadow-md bg-white dark:bg-[var(--background)]">
              <thead className="bg-[var(--primary)] text-white">
                <tr>
                  <th className="p-2">Nama</th>
                  <th className="p-2">Nomor Induk</th>
                  <th className="p-2">Kelas</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendances.map((a, idx) => (
                  <tr key={a.studentId} className={`even:bg-[var(--accent)]/10 odd:bg-white dark:odd:bg-[#1e293b] hover:bg-[var(--secondary)]/20 transition-colors`}>
                    <td className="p-2 border-b border-[var(--disable)] text-[var(--foreground)]">{a.name}</td>
                    <td className="p-2 border-b border-[var(--disable)] text-[var(--foreground)]">{a.studentId}</td>
                    <td className="p-2 border-b border-[var(--disable)] text-[var(--foreground)]">{a.grade}</td>
                    <td className="p-2 border-b border-[var(--disable)] text-[var(--foreground)]">{a.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
