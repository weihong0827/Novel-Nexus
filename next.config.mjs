/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: "pfnu7ntawzmpgumu.public.blob.vercel-storage.com"

    }]
  }
};

export default nextConfig;
