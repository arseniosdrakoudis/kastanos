import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  variant?: "reversed" | "normal";
}

export function Logo({ width = 140, height = 50, className, variant = "normal" }: LogoProps) {
  // reversed = white logo for dark backgrounds/hero
  // normal = dark logo on light backgrounds
  const logoSrc = variant === "reversed" 
    ? "/kastanos-logo-reversed.png" 
    : "/kastanos-logo-normal.png";

  return (
    <Image
      src={logoSrc}
      alt="Kastanos Jewellery"
      width={width}
      height={height}
      className={cn("object-contain", className)}
      priority
    />
  );
}
