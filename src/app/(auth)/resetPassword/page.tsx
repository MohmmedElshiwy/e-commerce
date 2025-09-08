"use client";
import CustomFormField from "@/components/Form/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { resetPass, ResetPassSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const form = useForm<ResetPassSchema>({
    resolver: zodResolver(resetPass),
  });

  const router = useRouter();

  async function handlePassword(values: ResetPassSchema) {
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Password reset successfully ✅");
        router.push("/login");
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (err) {
      toast.error("Server error, please try again later.");
      console.error(err);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4 text-center">
        Reset Your Password
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handlePassword)} className="space-y-4">
          <CustomFormField
            type="email"
            form={form}
            name="email"
            label="Email"
          />
          <CustomFormField
            type="password"
            form={form}
            name="newPassword"
            label="New Password"
          />
        
          <Button
            type="submit"
            className="cursor-pointer bg-main w-full mt-4"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
