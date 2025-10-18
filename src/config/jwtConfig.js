export default {
  accessToken: {
    secret: process.env.JWT_SECRET || (() => { throw new Error('JWT_SECRET não definido') })(),
    expiresIn: '15m',
  },
  refreshToken: {
    secret: process.env.JWT_REFRESH_SECRET || (() => { throw new Error('JWT_REFRESH_SECRET não definido') })(),
    expiresIn: '7d',
  },
};