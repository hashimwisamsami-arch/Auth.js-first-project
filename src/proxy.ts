import { auth as proxy } from "@/auth";

export default proxy((req) => {
  console.log("middleware called for:", req.nextUrl.pathname);
});
export const config = {
  matcher: ["/login", "/register"],
};
