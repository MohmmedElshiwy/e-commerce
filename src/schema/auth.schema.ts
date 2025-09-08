import * as z from "zod";

export const registerSchema = z.object({

    name:z.string().nonempty("Name is required").min(3,"Name must be at least 3 characters"),
    email:z.string().nonempty("Email is required").email("Invalid email address"),
    password:z.string().nonempty("Password is required").min(6,"Password must be at least 6 characters"),
    rePassword:z.string().nonempty("Confirm Password is required"),
phone:z.string().nonempty("Phone is required").min(11,"Phone must be at least 11 characters").regex(/^01[0251][0-9]{8}$/),
}).refine(data=>data.password===data.rePassword,{

    path:["rePassword"],
    error:"Passwords & rePassword not match"


})


export type RegisterSchema = z.infer<typeof registerSchema>;


// login
export const loginSchema = z.object({

    email:z.string().nonempty("Email is required").email("Invalid email address"),
    password:z.string().nonempty("Password is required").min(6,"Password must be at least 6 characters"),

})

export type LoginSchema = z.infer<typeof loginSchema>;



// forgetPass

export const forgetPass = z.object({

    email:z.string().nonempty("Email is required").email("Invalid email address"),

})
export type forgetPassSchema = z.infer<typeof forgetPass>;



// resetCode


export const resetCode = z.object({

    resetCode:z.string()

})
export type ResetCodeSchema = z.infer<typeof resetCode>;


// resetPass


    
    export const resetPass = z.object({

    email:z.string().nonempty("Email is required").email("Invalid email address"),
    newPassword:z.string()

})
export type ResetPassSchema = z.infer<typeof resetPass>;