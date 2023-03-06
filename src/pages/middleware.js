import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

export default function middleware(req) {
  const token = localStorage.getItem("token");
  const url = req.url;

  if (!token && url.includes("/dashboard")) {
    return NextResponse.redirect("/login");
  }

  // Check if jwt token is valid
  console.log("VERIFY:", verify(token, process.env.NEXT_APP_JWT_SECRET));
}
