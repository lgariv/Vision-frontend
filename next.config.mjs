/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "media.licdn.com",
				pathname: "/dms/image/v2/**",
			},
		],
	},
};

export default nextConfig;
