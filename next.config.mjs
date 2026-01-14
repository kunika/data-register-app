/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
    basePath: isProd ? "/data-register-app" : "",
    output: isProd ? "export" : undefined,
    reactStrictMode: true,
    images: {
        unoptimized: true,
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            sharp$: false,
            'onnxruntime-node$': false,
        };
        return config;
    },
};

export default nextConfig;