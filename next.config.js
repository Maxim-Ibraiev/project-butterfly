module.exports = {
  future: {
    webpack5: true,
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  serverRuntimeConfig: {
    imageCloudConfig: {
      cloud_name: 'butterfly-project',
      api_key: '276225481278987',
      api_secret: 'QP9VQR7Oz09FPNP9PqgOVxWeNPc',
    },
    sessionOptions: {
      cookieName: 'BFProject_auth',
      password: 'sPV0DGY9ZztpiRjE7DXD0fadzoPv0MAt',
      // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
      cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
}
