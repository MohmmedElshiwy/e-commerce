"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMytoken() {
try{
      const encreptedToken =
    (await cookies()).get(`next-auth.session-token`)?.value ||
    (await cookies()).get(`__Secure-next-auth.session-token`)?.value;

    if(!encreptedToken) {return null}

  const token = await decode({
    token: encreptedToken,
    secret: process.env.AUTH_SECRET!,
  });
  return token?.token || null;
}catch( err){
    return err
}
}
