import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imageUrl from './image/images.png';

function GoogleLogin({ buttonText }) {
  const navigate = useNavigate();
  const registerLoginWithGoogleAction = async (accessToken) => {
    // console.log("token ", accessToken);
    try {
      let data = JSON.stringify({
        access_token: accessToken,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://shy-cloud-3319.fly.dev/api/v1/auth/google`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;
      // console.log("response.data ", response?.data);
      localStorage.setItem("token", token);
      navigate("/", { state: { token: token } });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return;
      }
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) => {
      registerLoginWithGoogleAction(responseGoogle.access_token);
    },
  });

  return (
    <button
      onClick={() => loginWithGoogle()}
      className="w-10 h-10 rounded-full"
    >
      <img
        src={imageUrl}
        alt="Your image"
        className="w-full h-full rounded-full object-cover"
      />
    </button>
  );
}

export default GoogleLogin;
