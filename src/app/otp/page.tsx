"use client";
import React, { useState, useEffect } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { app } from "../config";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OTPLogin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {},
        "expired-callback": () => {},
      }
    );
  }, [auth]);

  const { toast } = useToast();

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleOTPChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async () => {
    try {
      const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, "")}`;
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        window.recaptchaVerifier
      );
      setConfirmationResult(confirmation);
      setOtpSent(true);
      toast({
        title: "OTP sent successfully",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOTPSubmit = async () => {
    try {
      await confirmationResult.confirm(otp);
      setOtp("");
      toast({
        title: "Login successfully",
      });
      router.push("/otpLogin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-medium mb-10">OTP Login</h1>
      <div className="grid w-full max-w-sm items-center gap-1.5 p-7 bg-white rounded-md shadow-xl">
        <Label htmlFor="email">Phone No.</Label>
        <Input type="tel" id="telephone" placeholder="Phone No." />
        <br />
        <Label htmlFor="otp">OTP</Label>
        <Input type="number" id="otp" placeholder="OTP" />
        <br />
        {!otpSent ? <div id="recaptcha-container"></div> : null}
        <Button type="submit" className="w-full max-w-sm">
          {otpSent ? "Submit OTP" : "Send OTP"}
        </Button>
      </div>
      <Link href="/login">Login with email</Link>
    </div>
  );
}
