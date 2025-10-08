import React from "react";

const Button = ({ text, onClick, type = "button", loading = false, outline = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`w-full py-3 rounded-[10px] transition cursor-pointer ${
        outline
          ? "border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
          : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)]"
      }`}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};

export default Button;
