import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // 50: tummalla overlaylla peitetyt taustakuvat, 75: oletus
    qualities: [50, 75],
  },

  // Suomi on oletuskieli ilman etuliitettä: /fi ja /fi/* ohjataan pysyvästi (308)
  // lopullisiin osoitteisiin. Ajetaan ennen next-intl-middlewarea, joka ohjaisi 307:llä.
  async redirects() {
    return [
      { source: "/fi", destination: "/", permanent: true },
      { source: "/fi/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
