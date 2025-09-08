"use client";
import Image from "next/image";
import React, { useContext } from "react";
import logo from "../../../public/images/freshcart-logo.svg";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { CartContext, CartContextType } from "@/context/CartContext";


export default function Navbar() {
  const { numberOfItems} = useContext(CartContext) as CartContextType

  const { data: session, status } = useSession();

  if (status === "loading") return null;

  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Cart", path: "/cart" },
    { name: "Categories", path: "/categories" },
    { name: "Brands", path: "/brands" },
    { name: "Wish List", path: "/wishlist" },
  ];

  function logOut() {
    signOut({ callbackUrl: "/login" });
  }

  return (
<nav className="bg-white shadow-md opacity-75 text-gray-800 sticky top-0 left-0 w-full z-50">
      <div className=" w-full md:w-11/12 mx-auto  py-4 flex justify-between ">
        <div className="flex items-center gap-8">
          <div className="logo">
            <Link href="/">
              <Image className="bg-white" src={logo} alt="FreshCart Logo" />
            </Link>
          </div>

          <ul className="flex gap-6">
            {links.map((link) => {
              if (link.name === "Cart" && !session) return null;

              return (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="hover:text-blue-500 text-xl transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="right flex gap-4">
          <ul className="flex gap-4 text-xl">
            {session ? (
              <>
                <li>
                  <h3>Hi {session.user.name}</h3>
                </li>
                <li>
                  <Link href={"/cart"}>
                    <span className="relative">
                      <i className="fa-solid fa-cart-shopping cursor-pointer hover:text-teal-700"></i>{" "}
                     {numberOfItems > 0 &&  <span className="absolute top-[-20px] start-1.5 text-sky-500 ">
                        {numberOfItems}
                      </span>}
                    </span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logOut}
                    className="hover:text-blue-500 cursor-pointer"
                  >
                    Sign out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <i className="fab fa-facebook hover:text-blue-500 cursor-pointer"></i>
                </li>
                <li>
                  <i className="fab fa-twitter hover:text-blue-500 cursor-pointer"></i>
                </li>
                <li>
                  <i className="fab fa-tiktok hover:text-blue-500 cursor-pointer"></i>
                </li>
                <li>
                  <i className="fab fa-linkedin hover:text-blue-500 cursor-pointer"></i>
                </li>
                <li>
                  <Link className="hover:text-blue-500" href="/register">
                    Register
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-blue-500" href="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
