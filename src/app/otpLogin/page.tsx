"use client";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../config";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function OTPLogin() {
  const auth = getAuth(app);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-gay-900 text-3xl">
        You've Successfully logged in using OTP authentication
      </h1>
      <Button className="m-5 text-2xl p-8" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
