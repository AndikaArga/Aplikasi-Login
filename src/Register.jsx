import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  return (
    <div className="bg-cover bg-center h-screen bg-[url('image/1169180.jpg')] flex items-center justify-center">
      <div className="backdrop-blur-[20px] p-10 rounded-lg shadow-md w-full sm:w-80 md:w-96 lg:w-2/5 xl:w-1/3">
        <div className="text-4xl font-bold text-[#E3E3E3] mb-6 text-center">
          Register
        </div>
        <div className="mb-4">
          <label className="block text-[#E3E3E3] text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="text"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-transparent border text-[#E3E3E3] rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#E3E3E3] text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-transparent border text-[#E3E3E3] rounded-md"
          />
        </div>
        <div className="mb-6">
          <label className="block text-[#E3E3E3] text-sm font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            placeholder="Masukkan Nama"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 bg-transparent border text-[#E3E3E3] rounded-md"
          />
        </div>
        <button
          className="w-full bg-[#E3E3E3] text-[#101010] font-semibold text-lg py-2 rounded-full mt-5 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
          onClick={async () => {
            const userregister = await fetch(
              "https://shy-cloud-3319.fly.dev/api/v1/auth/register",
              {
                method: "POST",
                body: JSON.stringify({
                  email: email,
                  password: password,
                  name: username,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const jsonRegister = await userregister.json();
            if (userregister?.status === 201) {
              alert("akun berhasil dibuat");
              navigate("/");
            } else {
              alert(jsonRegister.message);
            }
          }}
        >
          Submit
        </button>
        <div className="flex justify-center mt-2 gap-1">
          <p>Kembali ke login ?</p>
          <button
            className="font-medium text-[#E3E3E3]"
            onClick={() => navigate("/user-page")}
          >
            Login
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
