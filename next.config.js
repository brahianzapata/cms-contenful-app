/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    loader: "custom",
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: `frame-ancestors 'self' https://app.contentful.com`,
          },
        ],
      },
    ];
  },
};
