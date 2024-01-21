"use client";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type FormData = z.infer<typeof schema>;

const LoginPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onLogin: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post("/api/users/login", data);
      toast({
        title: "Login successful",
      });
      router.push("/profile");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-medium mb-10">LoginPage</h1>
      <hr />
      <form
        className="grid w-full max-w-sm items-center gap-1.5 p-7 bg-white rounded-md shadow-xl"
        onSubmit={handleSubmit(onLogin)}
      >
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <br />
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <br />
        <Button type="submit" className="w-full max-w-sm">
          Login
        </Button>
      </form>
      <Link href="/signup">Don&apos;t have an account? Sign up</Link>
      <p>or</p>
      <Link href="/otp">Login with phone number</Link>
    </div>
  );
};

export default LoginPage;
