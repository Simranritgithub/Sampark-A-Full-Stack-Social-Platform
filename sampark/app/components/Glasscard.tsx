import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

const GlassCard = ({ children, className = "" }: GlassCardProps) => {
  return (
    <div
      className={`
        bg-white/90
        backdrop-blur-lg
        border border-white/40
        rounded-3xl
        shadow-[0_18px_35px_-15px_rgba(0,0,0,0.15)]
        p-8
        transition-all duration-300
        hover:bg-white/90
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;
