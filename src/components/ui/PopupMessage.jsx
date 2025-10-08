import React from "react";
import Button from "./Button"; // pastikan path sesuai

const PopupMessage = ({
  image, // optional image path
  title,
  description,
  buttons = [], // array of { text, onClick, outline, loading }
}) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-95 border text-center relative">
        {/* Optional Image */}
        {image && (
          <img
            src={image}
            alt="popup icon"
            className="h-52 mx-auto mb-3"
          />
        )}

        {/* Title */}
        {title && (
          <p className="text-xl font-semibold text-gray-800 mb-1">
            {title}
          </p>
        )}

        {/* Description */}
        {description && (
          <p className="text-[var(--color-gray-dark)] text-xs mb-10">{description}</p>
        )}

        {/* Buttons */}
        <div
          className={`flex ${
            buttons.length === 1 ? "justify-center" : "justify-between"
          } gap-3`}
        >
          {buttons.map((btn, index) => (
            <div key={index} className="flex-1">
              <Button
                text={btn.text}
                onClick={btn.onClick}
                outline={btn.outline}
                loading={btn.loading}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopupMessage;
