import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 语言前缀路由：`/` 走默认语言，其余由 app/[lang] 承载
  async redirects() {
    return [{ source: "/", destination: "/zh", permanent: false }];
  },
};

export default nextConfig;
