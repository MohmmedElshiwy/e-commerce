"use server"
import { getMytoken } from "@/utilities/getMytoken";

export async function getLogedUserCart() {
  const token = await getMytoken();
  if (!token || typeof token !== "string") {
    throw new Error("User not logged in");
  }

  const res = await fetch(`${process.env.API}/cart`, {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    cache: "no-store", 
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch cart: ${res.status} ${res.statusText}`);
  }

  const payload = await res.json();
  return payload;
}
