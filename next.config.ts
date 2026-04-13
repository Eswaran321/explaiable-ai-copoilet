import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@supabase/supabase-js'],
  },
}

export default nextConfig
