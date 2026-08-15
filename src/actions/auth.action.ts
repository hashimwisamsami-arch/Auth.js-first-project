"use server";
import { LoginShema, RegisterShema } from "@/utils/validationSchemas";
import { z } from "zod";

type LoginDto = z.infer<typeof LoginShema>;
type RegisterDto = z.infer<typeof RegisterShema>;

//login action
export const loginAction = async (data: LoginDto) => {
  const validation = LoginShema.safeParse(data);
  if (!validation.success) {
    return { error: "Invalid credentials" };
  }
  console.log(data);
  return { success: "Logged is successfully" };
};

//register action
export const registerAction = async (data: RegisterDto) => {
  const validation = LoginShema.safeParse(data);
  if (!validation.success) {
    return { error: "Invalid credentials" };
  }
  console.log(data);
  return { success: "user created is successfully" };
};
