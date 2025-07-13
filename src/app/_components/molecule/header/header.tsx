import { Logo } from '@/app/_assets/icons';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';

function Header({ onSidebarToggle }: { onSidebarToggle?: () => void }) {
  const [displayName, setDisplayName] = useState<string | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(user.displayName);
      } else {
        setDisplayName(null);
      }
    });
  }, []);

  return (
    <header className="w-full h-20 bg-[var(--background)]/90 backdrop-blur-md px-4 md:px-8 py-4 flex items-center justify-between shadow-md fixed top-0 left-0 z-30 border-b border-[var(--disable)] transition-colors duration-300">
      <div className="flex items-center gap-3 md:gap-4">
        {/* Hamburger for mobile */}
        <button
          className="md:hidden mr-2 p-2 rounded-lg hover:bg-[var(--disable)]/30 focus:outline-none"
          onClick={onSidebarToggle}
          aria-label="Buka menu sidebar"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[var(--primary)]">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Image src={Logo} alt="Logo" width={44} height={44} className="rounded-lg bg-[var(--primary)] p-1.5" />
        <div className="flex flex-col">
          <p className="text-lg md:text-2xl font-bold text-[var(--primary)] leading-tight tracking-tight">Hadirly</p>
          <p className="text-xs md:text-sm text-[var(--secondary)] font-medium">Hadirku, Hadirmu, Hadir Kita Semua</p>
        </div>
      </div>
      <div>
        <p className="text-[var(--foreground)] text-xs md:text-sm font-normal">
          Halo,{' '}
          <span className="text-[var(--primary)] font-semibold">
            {displayName || 'Unknown User'}
          </span>{' '}
        </p>
      </div>
    </header>
  );
}

export default Header;
