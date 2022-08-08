export default () => ({
  app_host: process.env.APP_HOST || 'localhost',
  app_port: parseInt(process.env.PORT, 10) || 5432,
  jwt: {
    secret: process.env.JWT_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
  },
  database: {
    mongodb_uri: process.env.MONGODB_URI,
  },
});
