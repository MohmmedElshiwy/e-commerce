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

  async function handleRegister(data: LoginSchema) {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/",
    });

    console.log("Response:", res);

    if (res?.ok) {
      toast.success("Logged in successfully");
      location.href = "/";
    } else {
      toast.error("The Email or Passwrod Not Match");
    }
  }

  return (
    <div className="flex  justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full  bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Login
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
            <CustomFormField
              type="email"
              form={form}
              name="email"
              label="Email"
              city=""
              phone=""
              details=""
            />
            <CustomFormField
              type="password"
              form={form}
              name="password"
              label="Password"
              city=""
              phone=""
              details=""
            />

            <Button
              type="submit"
              className="cursor-pointer bg-main w-full block my-20"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Login..." : "Login"}
            </Button>

            <div className="text-center">
              <Link
                href={"/forgetPassword"}
                className="text-sm text-blue-600 hover:underline dark:text-blue-400"
              >
                Forget your password?
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
