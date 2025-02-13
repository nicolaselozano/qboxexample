import React, { useState, MouseEvent, useCallback } from "react";

function throttle(func, delay) {
  let lastCall = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    func(...args);
  };
}

export const TiltEffect = ({ className, image, children }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback(
    throttle((e) => {
      const card = e.currentTarget;
      if (!card) return;

      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const centerX = box.width / 2;
      const centerY = box.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      setRotate({ x: rotateX, y: rotateY });
    }, 100),
    [setRotate]
  );

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      className={`relative w-full h-auto rounded-xl transition-transform duration-500 will-change-transform ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
    >
      {/* Quitar posición absoluta para evitar que se superponga */}
      {image ? (
        <img
          src={image}
          alt="Card Image"
          className="w-full h-auto object-cover rounded-xl"
        />
      ) : (
        <div className="w-full h-auto flex flex-col items-center justify-center bg-gray-200 p-4 rounded-xl">
          {children}
        </div>
      )}
    </div>
  );
};
