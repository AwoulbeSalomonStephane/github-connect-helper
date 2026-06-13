import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.resolve('.'),
  },
}

export default nextConfig
