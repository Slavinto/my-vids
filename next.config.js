/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "i.ytimg.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "yt3.ggpht.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "play.google.com",
                pathname: "**",
            },
        ],
    },
};

module.exports = nextConfig;
