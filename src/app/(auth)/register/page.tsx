"use client";
import CustomFormField from "@/components/Form/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { RegisterSchema, registerSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Register() {
  const router = useRouter();
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  async function handleRegister(data: RegisterSchema) {
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await res.json();

      if (res.ok && responseData.message === "success") {
        toast.success("Register Success");
        router.push("/login");
      } else {
        toast.error(responseData.message || "There is an error");
      }
    } catch (err) {
      toast.error(String(err));
    }
  }

  return (
    <div className="flex  min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full  bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Register
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegister)}
            className="space-y-4"
          >
            <CustomFormField
              type="email"
              form={form}
              name="email"
              label="Email"
              city=""
              details=""
              phone=""
            />
            <CustomFormField
              type="text"
              form={form}
              name="name"
              label="Username"
              city=""
              details=""
              phone=""
            />
            <CustomFormField
              type="password"
              form={form}
              name="password"
              label="Password"
              city=""
              details=""
              phone=""
            />
            <CustomFormField
              type="password"
              form={form}
              name="rePassword"
              label="Confirm Password"
              city=""
              details=""
              phone=""
            />
            <CustomFormField
              type="tel"
              form={form}
              name="phone"
              label="Your Phone"
              city=""
              details=""
              phone=""
            />

            <Button
              type="submit"
              className="cursor-pointer bg-main w-full block my-20"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
