import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm(`Ingin Log-out?`)) {
      localStorage.removeItem("token");
      localStorage.removeItem("nama");
      navigate("/");
    }
  };
  return (
    <div className="backdrop-blur-[20px] bg-[#E3E3E3]/20  flex justify-between mx-[200px] items-center rounded-b-lg">
      <button
        className=" bg-white text-[#101010] rounded-bl-lg px-4 py-2 font-semibold"
        onClick={() => navigate("/")}
      >
        Home
      </button>
      {localStorage.getItem("token") === null ? (
        <div className=" flex">
          <button
            onClick={() => navigate("/user-page")}
            className=" bg-white text-[#101010] rounded-br-lg px-4 py-2 font-semibold"
          >
            Login
          </button>
        </div>
      ) : (
        <div className="flex">
          <div className=" bg-white text-[#101010] px-4 py-2">{`Halo, ${localStorage.getItem(
            "nama"
          )}`}</div>
          <button
            onClick={() => {
              handleLogout();
            }}
            className="bg-white text-[#101010] rounded-br-lg px-4 py-2 font-semibold"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
