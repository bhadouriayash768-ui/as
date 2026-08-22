/** Luminous Systems Atelier: pearl space, charcoal editorial contrast, Aurelis Gold depth, asymmetric plates, and calm pointer-responsive layers. */
import { ReactNode } from "react";
import "./StarBorder.css";

export default function StarBorder({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`star-border ${className}`.trim()}><i /><i /><span className="star-border__inner">{children}</span></span>;
}
