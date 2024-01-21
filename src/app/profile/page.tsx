"use client";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast({
        title: "Logout Successfully",
      });
      router.push("/login");
    } catch (e: any) {
      toast({
        title: "Error Logging Out",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-gay-900 text-3xl">
        You've Successfully logged in using email
      </h1>
      <Button className="m-5 text-2xl p-8" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}
