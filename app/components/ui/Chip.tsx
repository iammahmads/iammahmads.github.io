import React from "react";

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  label: string;
  count?: number;
}

export function Chip({
  label,
  active = false,
  count,
  className = "",
  onClick,
  ...props
}: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
        active
          ? "bg-[#3DF2E0] text-[#170B2B] font-semibold shadow-[0_0_12px_rgba(61,242,224,0.3)]"
          : "bg-[#241346] text-[#B9A7FF] hover:text-[#F3F1FA] hover:border-[#3DF2E0]/40 border border-[#241346]"
      } ${className}`}
      {...props}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={`text-[10px] px-1.5 py-0.2 rounded-full ${
            active ? "bg-[#170B2B]/20 text-[#170B2B]" : "bg-[#170B2B] text-[#8E82A9]"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

