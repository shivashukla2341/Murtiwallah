import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pins the workspace root to this app directory — without this, Next's
  // root-inference walks up and picks up unrelated lockfiles that live in
  // the parent home directory from other, unrelated projects.
  outputFileTracingRoot: path.join(__dirname),
  images: {
    // The whole site is capped at max-w-[1320px], so even a full-bleed hero
    // image at 3x DPR never needs more than ~1920px — the Next.js defaults
    // go up to 3840, which is pure wasted transform cost/egress here.
    unoptimized: true,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
};

export default nextConfig;
