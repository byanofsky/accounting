"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-prose p-2 flex space-x-4">
        <NavLink label="Dashboard" href="/" />
        <NavLink label="Login" href="/login" />
        <NavLink label="Register" href="/register" />
      </div>
    </nav>
  );
}

type NavLinkProps = {
  label: string;
  href: string;
};

const NavLink = ({ label, href }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      className={clsx(
        "text-white rounded-lg p-2 hover:bg-gray-400",
        isActive && "bg-gray-900"
      )}
      href={href}
    >
      {label}
    </Link>
  );
};
