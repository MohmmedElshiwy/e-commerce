"use client";
import CustomFormField from "@/components/Form/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { loginSchema, LoginSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import Link from "next/link";


export default function Login() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function handleRegister(data:LoginSchema ) {

const res= await signIn("credentials",{
  email:data.email,
  password:data.password,
  redirect:false,
  callbackUrl:"/",



})
console.log('Response:', res);

  if(res?.ok){
    toast.success("Logged in successfully");
    location.href="/"
  }else{
    toast.error( "The Email or Passwrod Not Match" );
  }


    
  }

  return (
    <div className="w-11/12 my-5 mx-auto">
      <h1>Login</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)}>
          <CustomFormField type="email" form={form} name="email" label="Email"  city="" phone="" details=""/>
          <CustomFormField type="password" form={form} name="password" label="Password" city="" phone="" details=""/>
      
          <Button
            type="submit"
            className="cursor-pointer bg-main ml-auto w-full block"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Login..." : "Login"}
          </Button>
          <Link href={"/forgetPassword"}>Forget your password</Link>
        </form>
      </Form>
    </div>
  );
}
