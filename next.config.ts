import type { NextConfig } from "next";

const securityHeaders = [
  // Stop browsers from guessing content types (MIME sniffing)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send only the origin to other sites, the full URL within this site
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disallow embedding this site in iframes on other origins (clickjacking)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Turn off browser features the site does not use
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
];

const nextConfig: NextConfig = {
  // Automatic memoization, no manual useMemo / useCallback
  reactCompiler: true,

  // Type-check <Link href> and router.push() against the real routes in src/app
  typedRoutes: true,

  // Do not advertise the framework in response headers
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    // Allow only the image hosts you actually use, e.g.
    // { protocol: "https", hostname: "images.unsplash.com" }
    remotePatterns: []
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  }
};

export default nextConfig;
