import * as z from "zod"

export const paymentSchema = z.object({

    details:z.string().min(5),
    phone:z.string(),
    city:z.string()

})

export type PaymentSchema = z.infer<typeof paymentSchema>;
