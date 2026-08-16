import { z } from "zod";

export const LoginShema = z.object({
  email: z.string().email({ message: "inavlid email" }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters long" }),
});

export const RegisterShema = z.object({
  name: z
    .string({
      error: (issue) => {
        if (issue.input === undefined) {
          return "Name is required";
        }

        return "Name must be string";
      },
    })
    .min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "inavlid email" }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters long" }),
});
