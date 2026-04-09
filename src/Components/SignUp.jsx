"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RightPhone from "./RightPhone";
import RightOtp from "./RightOtp";
import RightProfile from "./RightProfile";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { sendOtp, verifyOtp, createProfile } from "@/features/auth/authSlice";
import toast from "react-hot-toast";

const SignUp = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  const [step, setStep] = useState(1);

  const [mobile, setMobile] = useState(""); 
  const [otp, setOtp] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [qualification, setQualification] = useState("");
  const [profileImage, setProfileImage] = useState(null);

 
  const handleSendOTP = async () => {
    if (mobile.length !== 10) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }

    const fullMobile = "+91" + mobile;

    try {
      const res = await dispatch(sendOtp(fullMobile)).unwrap();

      if (res.data.success) {
        toast.success("OTP Sent Successfully!");
        setStep(2);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };


  const handleVerifyOTP = async () => {
    const fullMobile = "+91" + mobile;

    try {
      const res = await dispatch(
        verifyOtp({ mobile: fullMobile, otp })
      ).unwrap();

      if (res.success) {
        if (res.login) {
          toast.success("Login Successful!");
          router.push("/exam-dashboard"); 
        } else {
          toast.success("OTP Verified!");
          setStep(3);
        }
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };


  const handleCreateProfile = async () => {
    if (!profileImage) {
      toast.error("Upload profile picture");
      return;
    }

    const fullMobile = "+91" + mobile;

    try {
      const res = await dispatch(
        createProfile({
          mobile: fullMobile,
          name,
          email,
          qualification,
          profile_image: profileImage,
        })
      ).unwrap();

      if (res.success) {
        toast.success("Profile Created Successfully!");
        router.push("/exam-dashboard"); // ✅ redirect new user
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#0a1435] p-4"
      style={{ backgroundImage: "url('/images/bg.png')" }}
    >
      <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl flex w-full max-w-4xl overflow-hidden">
        <div
          className="w-1/2 p-8 hidden md:flex flex-col items-center justify-center"
          style={{
            background:
              "linear-gradient(180deg, #1C3141 28.73%, #487EA7 233.43%)",
          }}
        >
          <Image
            src="/images/next.png"
            alt="signup illustration"
            width={260}
            height={85}
            className="object-contain"
          />

          <div className="mt-24 text-center">
            <Image
              src="/images/group.svg"
              alt="Logo"
              width={335}
              height={260}
            />
          </div>
        </div>

        {step === 1 && (
          <RightPhone
            mobile={mobile}
            setMobile={setMobile}
            onSubmit={handleSendOTP}
            loading={loading}
          />
        )}

        {step === 2 && (
          <RightOtp
            otp={otp}
            setOtp={setOtp}
            onSubmit={handleVerifyOTP}
            loading={loading}
            onResend={handleSendOTP}
          />
        )}

        {step === 3 && (
          <RightProfile
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            qualification={qualification}
            setQualification={setQualification}
            setProfileImage={setProfileImage}
            onSubmit={handleCreateProfile}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default SignUp;
