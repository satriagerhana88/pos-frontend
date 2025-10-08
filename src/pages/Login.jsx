import React, { useState } from "react";
import api from "../services/api";

import Logo from "../assets/image/Logo.svg";
import IcEmail from "../assets/icon/ic-email.svg";
import IcPassword from "../assets/icon/ic-password.svg";
import LogoSentrix from "../assets/image/sentrix-logo.svg";
import PopupMessage from "../components/ui/PopupMessage"; 
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";

import LoginError from '../assets/icon/error.svg'

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showPopup, setShowPopup] = useState(false); 
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      onLogin(token);
    } catch (err) {
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-login relative">
      {/* ✅ Popup muncul di atas konten */}
      {showPopup && (
        <PopupMessage
          image={LoginError}
          title="Oops! Something went wrong"
          description="Double check your email and password looks like one of them might be off!"
          buttons={[
            {
              text: "OK",
              onClick: () => setShowPopup(false),
            },
          ]}
        />
      )}

      <form
        onSubmit={submit}
        className="w-96 bg-white p-7 rounded-3xl shadow-2xl flex flex-col items-center gap-2"
      >
        <img src={Logo} alt="nuevansesia" className="w-30 h-30 mb-5" />

        <div className="flex flex-col items-center text-center w-[80%]">
          <p className="text-[24px] font-bold text-black">Sign in with email</p>
          <p className="text-[#7F8690] text-xs mb-5 mt-1">
            Make a new doc to bring your words, data and teams together.
          </p>
        </div>

 <div className="w-full gap-1">
          <InputField
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={IcEmail}
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={IcPassword}
            showPasswordToggle
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          text={loading ? "Logging in..." : "Login"}
          loading={loading}
        />

        <div className="w-full flex mt-10 items-center justify-center gap-2">
          <p className="text-[var(--color-gray-dark)] text-xs">Powered By</p>
          <img src={LogoSentrix} alt="sentrix" className="w-30" />
        </div>
      </form>
    </div>
  );
};

export default Login;
