"use client";
// When animations are switched off in Studio, framer-motion skips movement everywhere on the site.
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

export default function MotionPrefs({ off, children }: { off: boolean; children: ReactNode }) {
  return <MotionConfig reducedMotion={off ? "always" : "user"}>{children}</MotionConfig>;
}
