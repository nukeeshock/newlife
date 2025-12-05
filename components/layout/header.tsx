import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface HeaderProps {
  children?: React.ReactNode;
}

export const SiteHeader = ({ children }: HeaderProps) => (
  <header className="relative z-10 flex items-center justify-between border-b border-[#0A2239]/10 bg-white px-[5%] py-6">
    <Link href="/" passHref className="flex items-center gap-3">
      <Image
        src="/LOGO_NLV.png"
        alt="NLV Logo"
        width={40}
        height={40}
        className="rounded-full"
      />
      <span className="cursor-pointer font-serif text-2xl font-light tracking-wide text-[#0A2239]">
        NEW LIFE VIETNAM
      </span>
    </Link>
    {children && (
      <nav className="flex items-center gap-10 font-sans">
        {children}
      </nav>
    )}
  </header>
);
