module.exports = {
  future: {
    webpack5: true,
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  serverRuntimeConfig: {
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
