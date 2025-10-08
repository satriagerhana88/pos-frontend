import React, { useState } from "react";

const InputField = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  icon,
  showPasswordToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="relative w-full mb-3">
      {icon && (
        <img
          src={icon}
          alt=""
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60"
        />
      )}

      <input
        type={type === "password" && showPassword ? "text" : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-[#EFF2F7] py-3 pl-10 pr-10 rounded-[10px] text-[#7F8690] text-sm w-full focus:outline-orange-100"
      />

      {type === "password" && showPasswordToggle && (
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <img
            src={showPassword ? "/src/assets/icon/ic-eye.svg" : "/src/assets/icon/ic-eye-slash.svg"}
            alt="toggle visibility"
            className="w-5 h-5 opacity-70 hover:opacity-100 cursor-pointer"
          />
        </button>
      )}
    </div>
  );
};

export default InputField;
