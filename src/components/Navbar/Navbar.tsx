"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import logo from "../../../public/images/freshcart-logo.svg";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { CartContext, CartContextType } from "@/context/CartContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { numberOfItems } = useContext(CartContext) as CartContextType;
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (status === "loading") return null;

  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "Brands", path: "/brands" },
    { name: "Wish List", path: "/wishlist" },
  ];

  function logOut() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 left-0 w-full z-50">
      <div className="w-11/12 mx-auto py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image src={logo} alt="FreshCart Logo" className="w-32" />
        </Link>

        {/* Burger button (mobile only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl focus:outline-none cursor-pointer"
        >
          <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 text-lg font-medium">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`transition-colors duration-200 ${
                  pathname === link.path
                    ? "text-main font-semibold"
                    : "hover:text-main"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right section (Desktop only) */}
        <div className="hidden md:flex items-center gap-6 text-lg">
          {session ? (
            <>
              <h3 className="font-semibold">Hi, {session.user?.name}</h3>
              <Link href="/cart" className="relative">
                <i className="fa-solid fa-cart-shopping text-xl cursor-pointer hover:text-teal-700"></i>
                {numberOfItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {numberOfItems}
                  </span>
                )}
              </Link>
              <button
                onClick={logOut}
                className="hover:text-blue-500 transition-colors cursor-pointer"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/register" className="hover:text-blue-500 cursor-pointer">
                Register
              </Link>
              <Link href="/login" className="hover:text-blue-500 cursor-pointer">
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 shadow-inner">
          <ul className="flex flex-col gap-4 p-4 text-lg font-medium">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`block transition-colors duration-200 ${
                    pathname === link.path
                      ? "text-blue-600 font-semibold"
                      : "hover:text-blue-500"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <hr />
            {session ? (
              <>
                <li className="text-gray-600">Hi, {session.user?.name}</li>
                <li>
                  <Link
                    href="/cart"
                    className="hover:text-blue-500"
                    onClick={() => setIsOpen(false)}
                  >
                    Cart ({numberOfItems})
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logOut();
                      setIsOpen(false);
                    }}
                    className="hover:text-blue-500"
                  >
                    Sign out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/register"
                    className="hover:text-blue-500"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="hover:text-blue-500"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
