const validateConfig = () => {
  const requiredEnvVars = {
    production: [
      'NODE_ENV',
      'PORT',
      'MONGO_URI',
      'JWT_SECRET',
      'JWT_EXPIRE',
      'CORS_ORIGIN',
      'FRONTEND_URL',
      'EMAIL_HOST',
      'EMAIL_PORT',
      'EMAIL_USER',
      'EMAIL_PASS',
      'EMAIL_FROM',
      'LOG_LEVEL'
    ],
    development: [
      'MONGO_URI',
      'JWT_SECRET',
      'JWT_EXPIRE',
      'FRONTEND_URL',
      'EMAIL_HOST',
      'EMAIL_PORT',
      'EMAIL_USER',
      'EMAIL_PASS',
      'EMAIL_FROM'
    ],
    test: [
      'MONGO_URI',
      'JWT_SECRET'
    ]
  };

  const environment = process.env.NODE_ENV || 'development';
  const missing = requiredEnvVars[environment].filter(
    envVar => !process.env[envVar]
  );

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables for ${environment} environment: ${missing.join(', ')}`
    );
  }
};

const config = {
  development: {
    port: parseInt(process.env.PORT || '5000', 10),
    mongoOptions: {
      autoIndex: true
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expire: process.env.JWT_EXPIRE || '30d'
    },
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
    },
    email: {
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587', 10),
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
      from: process.env.EMAIL_FROM
    },
    rateLimit: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '15', 10) * 60 * 1000,
      max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10)
    },
    logLevel: process.env.LOG_LEVEL || 'debug'
  },
  production: {
    port: parseInt(process.env.PORT || '5000', 10),
    mongoOptions: {
      autoIndex: false
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expire: process.env.JWT_EXPIRE || '30d'
    },
    cors: {
      origin: process.env.CORS_ORIGIN
    },
    email: {
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT, 10),
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
      from: process.env.EMAIL_FROM
    },
    rateLimit: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '15', 10) * 60 * 1000,
      max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10)
    },
    logLevel: process.env.LOG_LEVEL || 'error'
  },
  test: {
    port: parseInt(process.env.PORT || '5000', 10),
    mongoOptions: {
      autoIndex: true
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'test-secret',
      expire: '1h'
    },
    cors: {
      origin: process.env.CORS_ORIGIN || '*'
    },
    email: {
      host: 'smtp.ethereal.email',
      port: 587,
      user: 'test@example.com',
      pass: 'test-password',
      from: 'test@example.com'
    },
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 100
    },
    logLevel: 'debug'
  }
};

validateConfig();

module.exports = config[process.env.NODE_ENV || 'development']; 