/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async redirects() {
        return [
            {
                source: '/discord',
                destination: 'https://discord.gg/apply',
                permanent: true,
            },
            {
                source: '/support',
                destination: 'https://discord.gg/apply',
                permanent: true,
            },
            {
                source: '/cmds',
                destination: '/commands',
                permanent: true,
            },
            {
                source: '/help',
                destination: '/commands',
                permanent: true,
            },
            {
                source: '/invite',
                destination: 'https://discord.com/oauth2/authorize?client_id=1420609343283531776&scope=bot+applications.commands&permissions=8',
                permanent: true,
            },
            {
                source: '/embeds',
                destination: '/embed',
                permanent: true,
            },
            {
                source: '/docs',
                destination: 'https://docs.warm.lat',
                permanent: true,
            },
            {
                source: '/variables',
                destination: 'https://docs.warm.lat/embeds/variables',
                permanent: true,
            },
            {
                source: '/beta',
                destination: '/apply',
                permanent: true,
            }
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
