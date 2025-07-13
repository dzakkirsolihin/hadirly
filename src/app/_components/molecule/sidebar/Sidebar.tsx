'use client';
import { AttendanceIcon, DashboardIcon, LogoutIcon, RegisterIcon } from '@/app/_assets/icons';
import { auth } from '@/lib/firebaseClient';
import { deleteCookie } from 'cookies-next';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Modal from '../modal/modal';
import Image from 'next/image';

function Sidebar({ open = false, onClose }: { open?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Helper: auto close sidebar on mobile
  const handleMenuClick = (href: string, fn?: () => void) => {
    if (fn) fn();
    if (href) router.push(href);
    if (onClose && typeof window !== 'undefined' && window.innerWidth < 768) {
      onClose();
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      deleteCookie('token', { path: '/' });
      handleCloseLogoutModal();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleShowLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const itemsMenu = [
    {
      category: 'Administrasi',
      items: [
        {
          name: 'Beranda',
          href: '/dashboard',
          icon: DashboardIcon,
          type: 'link',
          function: () => {},
        },
        {
          name: 'Kehadiran',
          href: '/attendance',
          icon: AttendanceIcon,
          type: 'link',
          function: () => {},
        },
        {
          name: 'Pendaftaran Siswa',
          href: '/students',
          icon: RegisterIcon,
          type: 'link',
          function: () => {},
        },
      ],
    },
    {
      category: 'Akun',
      items: [
        {
          name: 'Keluar',
          href: '',
          icon: LogoutIcon,
          type: 'button',
          function: handleShowLogoutModal,
        },
      ],
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/30 z-30 md:hidden transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      {/* Sidebar drawer for mobile, fixed for desktop */}
      <div
        className={`h-screen w-64 font-normal bg-[var(--primary)] fixed py-8 top-0 left-0 flex flex-col gap-10 overflow-y-auto shadow-xl z-40 border-r border-[var(--disable)] transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:top-20 md:z-20 md:fixed`}
        style={{ transitionProperty: 'transform, box-shadow, background-color' }}
      >
        <div className="md:hidden flex justify-end px-4 mb-2">
          <button onClick={onClose} aria-label="Tutup menu sidebar" className="p-2 rounded-lg hover:bg-[var(--accent)]/20">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {itemsMenu.map((item) => (
          <div className="flex flex-col transition-colors" key={item.category}>
            <p className="text-white text-lg font-semibold px-5 mb-2 tracking-wide uppercase">{item.category}</p>
            {item.items.map((menu) =>
              menu.type === 'button' ? (
                <button
                  onClick={() => handleMenuClick(menu.href, menu.function)}
                  className={`flex items-center gap-3 px-5 py-3 text-base rounded-xl transition-all duration-200 font-semibold
                    ${pathname === menu.href ? 'bg-[var(--accent)]/30 text-white' : 'hover:bg-[var(--accent)]/20 hover:text-white text-white'}`}
                  key={menu.name}>
                  {menu.icon && (
                    <Image src={menu.icon} alt={menu.name} className="w-6 h-6" />
                  )}
                  <p>{menu.name}</p>
                </button>
              ) : (
                <button
                  onClick={() => handleMenuClick(menu.href)}
                  className={`flex items-center gap-3 px-5 py-3 text-base rounded-xl transition-all duration-200 font-semibold
                    ${pathname === menu.href ? 'bg-[var(--accent)]/30 text-white' : 'hover:bg-[var(--accent)]/20 hover:text-white text-white'}`}
                  key={menu.name}>
                  {menu.icon && (
                    <Image src={menu.icon} alt={menu.name} className="w-6 h-6" />
                  )}
                  <p>{menu.name}</p>
                </button>
              ),
            )}
          </div>
        ))}
      </div>
      <Modal
        title="Konfirmasi Keluar"
        content="Apakah Anda yakin ingin keluar?"
        type="warning"
        isOpen={showLogoutModal}
        buttonText1="Ya"
        buttonType1="primary"
        buttonText2="Tidak"
        buttonType2="secondary"
        onConfirm={handleLogout}
        onClose={() => setShowLogoutModal(false)}
      />
    </>
  );
}

export default Sidebar;
