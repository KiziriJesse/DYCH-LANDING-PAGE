import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  /**
   * /product/schools was the schools deployment page and /schools was the
   * pilot page. They were merged into /schools when the site moved to an
   * industries structure, because a head teacher arriving from either link
   * wanted the same thing and keeping both meant writing every change twice.
   *
   * Permanent, not temporary: the old URL is in the nav of anything already
   * crawled or linked, and the merge is not going to be reversed.
   */
  async redirects() {
    return [
      {
        source: "/product/schools",
        destination: "/schools",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
