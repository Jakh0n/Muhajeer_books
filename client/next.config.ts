import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'utfs.io', pathname: '**' },
			{ protocol: 'https', hostname: 'res.cloudinary.com', pathname: '**' },
		],
	},
	output: 'standalone',
}

export default nextConfig
