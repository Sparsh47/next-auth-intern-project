"use client";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type FormData = z.infer<typeof schema>;

const SignupPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSignup: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post("/api/users/signup", data);
      toast({
        title: "Login successful",
      });
      router.push("/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Signup failed",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-medium mb-10">SignupPage</h1>
      <hr />
      <form
        className="grid w-full max-w-sm items-center gap-1.5 p-7 bg-white rounded-md shadow-xl"
        onSubmit={handleSubmit(onSignup)}
      >
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          placeholder="Username"
          {...register("username")}
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
        <br />
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
          Sign up
        </Button>
      </form>
      <Link href="/login">Already have an account? Login</Link>
    </div>
  );
};

export default SignupPage;
