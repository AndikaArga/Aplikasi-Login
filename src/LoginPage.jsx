import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("testproduk1@binaracademy.org");
  const [password, setPassword] = useState("Testproduk123");
  
  return (
    <div className="bg-cover bg-center h-screen  bg-[url('image/1169180.jpg')] flex items-center justify-center">
      <div className=" backdrop-blur-[20px] bg-[#E3E3E3]/5  p-10 rounded-lg shadow-md border-[1px] borader-white w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%]">
        <div className="text-4xl font-bold text-[#E3E3E3] mb-6 text-center ">
          Login
        </div>
        <div className="mb-4">
          <label className="block text-[#E3E3E3] text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="text"
            placeholder="Masukkan email anda"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-transparent border text-[#E3E3E3] placeholder-[#E3E3E3] rounded-md focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label className="block text-[#E3E3E3] text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-transparent border text-[#E3E3E3] placeholder-[#E3E3E3] rounded-md focus:outline-none"
          />
        </div>
        <button
          className="w-full bg-[#E3E3E3] text-[#101010] font-semibold text-lg py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400 mt-5"
          onClick={async () => {
            const userLogin = await fetch(
              "https://shy-cloud-3319.fly.dev/api/v1/auth/login",
              {
                method: "POST",
                body: JSON.stringify({
                  email: email,
                  password: password,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const jsonLogin = await userLogin.json();
            if (userLogin?.status === 200) {
              localStorage.setItem("token", jsonLogin?.data?.token);
              navigate("/");
            } else {
              alert(jsonLogin.message);
            }
          }}
        >
          Submit
        </button>
        <div className="flex justify-center mt-2 gap-1">
          <p>Belum punya akun ?</p>
          <button
            className="font-medium text-[#E3E3E3]"
            onClick={() => navigate("/Register")}
          >
            Register
          </button>
        </div>
        <div className="flex justify-center mt-10 text-sm items-center">
          <hr className="flex-grow border-t border-[#E3E3E3] mr-4" />
          <p className=" text-[#E3E3E3]">More Login Methods</p>
          <hr className="flex-grow border-t border-[#E3E3E3] ml-4" />
        </div>
        <div className=" flex justify-center gap-6 mb-4 mt-5 ">
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
}
