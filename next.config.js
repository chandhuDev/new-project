module.exports = {
    future: {
        webpack5: true
    },
    webpack(config) {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false
        }

        return config
    },
    images: {
        loader: 'akamai',
        path: '/',
      },
}

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig
