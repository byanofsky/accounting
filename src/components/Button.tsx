import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends React.PropsWithChildren {
  type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
}

export default function Button({ type, onClick, children }: ButtonProps) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
