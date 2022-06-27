import { useState, useEffect, MouseEvent } from "react";
import { StyledButton, RippleSpan } from "./Button.style";

type ButtonTypes = {
  children: string;
  btnType?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
};

const Button = ({ children, btnType = "primary", disabled }: ButtonTypes) => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  const handleRippleEffect = (e: MouseEvent<HTMLElement>): void => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <StyledButton btnType={btnType} disabled={disabled} onClick={handleRippleEffect}>
      {children}
      {isRippling && (
        <RippleSpan
        btnType={btnType}
          style={{
            left: coords.x,
            top: coords.y,
          }}
        />
      )}
    </StyledButton>
  );
};

export default Button;
