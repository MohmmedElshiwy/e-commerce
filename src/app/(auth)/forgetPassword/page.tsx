"use client"
import CustomFormField from "@/components/Form/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { forgetPass, forgetPassSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ForgetPassword() {
  const form = useForm<forgetPassSchema>({
    resolver: zodResolver(forgetPass),
  });

  const router = useRouter();

  async function handlePassword(value: forgetPassSchema) {
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Check your email to reset password");
        router.push("/verifyResetCode");
      } else {
        toast.error(data.message || "Something went wrong!");
      }

      return data;
    } catch (err) {
      toast.error("Server error, please try again later.");
      console.error(err);
    }
  }

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Please enter your Email</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handlePassword)}>
          <CustomFormField
            type="email"
            form={form}
            name="email"
            label="Email"
          />

          <Button
            type="submit"
            className="cursor-pointer bg-main ml-auto w-full block mt-4"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Verifying..." : "Verify"}
          </Button>
        </form>
      </Form>
    </>
  );
}
