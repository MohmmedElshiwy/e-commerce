import { getMytoken } from "@/utilities/getMytoken";



type shippingAddress={
           "details": string,
        "phone": string,
        "city": string
}

export async function checkoutOnline(cartId: string, url= process.env.NEXTAUTH_URL, shippingAddress: shippingAddress) {
        const token = await getMytoken();
        if (!token || typeof token !== "string") {
            throw new Error("Please login Again");
        }
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
            method: "POST",
            body: JSON.stringify({ shippingAddress }),
            headers: {
                "Content-Type": "application/json",
                token: token,
            },
        });
    if (!res.ok) {
        const errorPayload = await res.json();
        throw new Error(errorPayload?.message || "Checkout failed");
    }
    const payload = await res.json();
    return payload;
}