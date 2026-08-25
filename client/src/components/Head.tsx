import { useEffect } from "react";
import { getSeo, applySeo } from "@/lib/seo";

export default function Head({ pathname }: { pathname: string }) {
  const meta = getSeo(pathname);
  useEffect(() => {
    applySeo(meta);
  }, [meta]);
  return null;
}
