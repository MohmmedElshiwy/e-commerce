import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 shadow-inner mt-12">
      <div className="w-11/12 max-w-screen-xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              width={40}
              height={40}
              src="https://flowbite.com/docs/images/logo.svg"
              alt="FreshCart Logo"
            />
            <span className="self-center text-xl font-semibold text-gray-800 dark:text-white">
              FreshCart
            </span>
          </Link>

          <span className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
            © 2025{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Kiro
            </a>
            . All Rights Reserved.
          </span>

          <div className="flex space-x-5 rtl:space-x-reverse text-gray-600 dark:text-gray-400">
            <a href="#" className="hover:text-blue-600">
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a href="#" className="hover:text-sky-400">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" className="hover:text-pink-600">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" className="hover:text-blue-700">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
