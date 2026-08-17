import NextAuth, { type DefultSession } from "next-auth";
import { Role } from "@/generated/prisma/client";

declare module "next-auth" {
  interface Session {
    user: DefultSession["user"] & { role: Role };
  }
}
