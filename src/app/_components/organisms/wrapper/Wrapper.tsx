'use client';
import React, { useState } from 'react';
import Header from '../../molecule/header/header';
import Sidebar from '../../molecule/sidebar/Sidebar';
import { usePathname } from 'next/navigation';
import { publicPaths } from '@/middleware';

interface WrapperProps {
  children: React.ReactNode;
}

function Wrapper(props: Readonly<WrapperProps>) {
  const { children } = props;
  const pathname = usePathname();
  const isPublicPath = publicPaths.includes(pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSidebarToggle = () => setSidebarOpen((v) => !v);
  const handleSidebarClose = () => setSidebarOpen(false);
  return (
    <body className="font-poppins bg-[var(--background)] text-[var(--foreground)] min-h-screen transition-colors duration-300">
      {!isPublicPath && (
        <>
          <Header onSidebarToggle={handleSidebarToggle} />
          <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
        </>
      )}
      <main className={`${!isPublicPath ? 'mt-20 md:ml-64' : ''} transition-all duration-300`}>{children}</main>
    </body>
  );
}

export default Wrapper;
