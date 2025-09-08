"use client";
import React from "react";
import { Form } from "../ui/form";
import CustomFormField from "../Form/CustomFormField";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema, PaymentSchema } from "@/schema/payment.schema";
import { checkoutOnline } from "@/paymentAction/action";

type PaymentProps = {
  cartId: string;
};

export default function Payment({ cartId }: PaymentProps) {
  const form = useForm<PaymentSchema>({
    resolver: zodResolver(paymentSchema),
  });

  async function onSubmit(value: PaymentSchema) {
    const shippingAddress = value;
    const res = await checkoutOnline(cartId, "", shippingAddress);
    if(res.status==="success"){
      location.href=res.session.url
    }
    console.log(res);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CustomFormField
          type="text"
          form={form}
          name="details"
          label="Details"
          city=""
          phone=""
          details=""
        />
        <CustomFormField
          type="text"
          form={form}
          name="phone"
          label="Phone"
          city=""
          phone=""
          details=""
        />
        <CustomFormField
          type="text"
          form={form}
          name="city"
          label="City"
          city=""
          phone=""
          details=""
        />

        <Button
          type="submit"
          className="cursor-pointer bg-main ml-auto w-full block"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Processing..." : "Pay Now"}
        </Button>
      </form>
    </Form>
  );
}
