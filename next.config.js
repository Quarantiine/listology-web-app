/** @type {import('next').NextConfig} */

module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: "https://",
				hostname: "unsplash.com/photos",
				port: "",
				pathname: "/unsplash.com/photos/**",
			},
		],
	},
};
