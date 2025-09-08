"use client"
import CustomFormField from "@/components/Form/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { resetCode, ResetCodeSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function VerifyResetCode() {
  const router = useRouter(); 


  const form = useForm<ResetCodeSchema>({
    resolver: zodResolver(resetCode),
  });

  async function resetPass(value: ResetCodeSchema) {
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        }
      );

      const data = await res.json();
      console.log(data);
      

      if (data.status ==="Success") {
                router.push("/resetPassword"); 

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
      <h1 className="text-xl font-bold mb-4">Please enter your Code</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(resetPass)}>
          <CustomFormField
            type="text"
            form={form}
            name="resetCode"
            label="Code"
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
