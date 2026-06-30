import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 이미지 최적화 설정
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
    ],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 최적화된 이미지를 1년간 캐싱 (재최적화 방지)
    minimumCacheTTL: 31536000,
  },

  webpack: (config, { isServer }) => {
    // 서버 사이드에서 Firebase Admin SDK 관련 이슈 해결
    if (isServer) {
      // Firebase Admin SDK가 필요한 환경 변수가 없을 때 오류 방지
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }

    return config;
  },

  // 빌드 시 Firebase 관련 에러를 무시하도록 설정
  experimental: {
    serverComponentsExternalPackages: ["firebase-admin"],
    esmExternals: true,
  },

  // 환경 변수 로딩 최적화
  env: {
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_PRIVATE_KEY_ID: process.env.FIREBASE_PRIVATE_KEY_ID,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_CLIENT_ID: process.env.FIREBASE_CLIENT_ID,
    FIREBASE_CLIENT_X509_CERT_URL: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  },
};

export default nextConfig;
