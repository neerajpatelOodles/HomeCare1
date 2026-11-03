const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const required = ['JWT_ACCESS_SECRET'];
for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}
if (!process.env.DATABASE_URL && !process.env.DB_HOST) {
  throw new Error('Set DATABASE_URL (or DB_HOST/DB_USER/DB_PASSWORD/DB_NAME) in .env');
}

const num = (v, d) => (v === undefined || v === '' ? d : Number(v));

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: num(process.env.PORT, 5000),
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  // Rate limits protect login, signup and the public job application form.
  // Off only in NODE_ENV=test (or RATE_LIMIT_DISABLED=true) so repeated test runs don't get blocked.
  rateLimitDisabled: process.env.RATE_LIMIT_DISABLED === 'true' || process.env.NODE_ENV === 'test',
  db: {
    connectionString: process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    port: num(process.env.DB_PORT, 5432),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  },
  auth: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessTtlMinutes: num(process.env.ACCESS_TOKEN_TTL_MINUTES, 15),
    refreshTtlDays: num(process.env.REFRESH_TOKEN_TTL_DAYS, 7),
    bcryptRounds: num(process.env.BCRYPT_ROUNDS, 12),
  },
  seedAdmin: {
    email: process.env.SEED_ADMIN_EMAIL || 'admin@homecare.local',
    password: process.env.SEED_ADMIN_PASSWORD || 'Admin@12345',
    firstName: process.env.SEED_ADMIN_FIRST_NAME || 'System',
    lastName: process.env.SEED_ADMIN_LAST_NAME || 'Admin',
  },
  // Default staff, caregiver, client and HR accounts created by `npm run seed`.
  // Set SEED_DEFAULT_USERS=false to skip them (e.g. in production).
  seedDefaultUsers: process.env.SEED_DEFAULT_USERS !== 'false',
  seedStaff: {
    email: process.env.SEED_STAFF_EMAIL || 'staff@homecare.local',
    password: process.env.SEED_STAFF_PASSWORD || 'Staff@12345',
    firstName: process.env.SEED_STAFF_FIRST_NAME || 'Default',
    lastName: process.env.SEED_STAFF_LAST_NAME || 'Staff',
  },
  seedCaregiver: {
    email: process.env.SEED_CAREGIVER_EMAIL || 'caregiver@homecare.local',
    password: process.env.SEED_CAREGIVER_PASSWORD || 'Caregiver@12345',
    firstName: process.env.SEED_CAREGIVER_FIRST_NAME || 'Default',
    lastName: process.env.SEED_CAREGIVER_LAST_NAME || 'Caregiver',
  },
  seedClient: {
    email: process.env.SEED_CLIENT_EMAIL || 'client@homecare.local',
    password: process.env.SEED_CLIENT_PASSWORD || 'Client@12345',
    firstName: process.env.SEED_CLIENT_FIRST_NAME || 'Default',
    lastName: process.env.SEED_CLIENT_LAST_NAME || 'Client',
  },
  seedHr: {
    email: process.env.SEED_HR_EMAIL || 'hr@homecare.local',
    password: process.env.SEED_HR_PASSWORD || 'Hr@12345678',
    firstName: process.env.SEED_HR_FIRST_NAME || 'Default',
    lastName: process.env.SEED_HR_LAST_NAME || 'HR',
  },
  // Private document storage (résumés, licences). Files are never served
  // statically; they are only streamed through authenticated download endpoints.
  storage: {
    driver: process.env.STORAGE_DRIVER || 'local',
    uploadDir: process.env.UPLOAD_DIR || './storage/uploads',
    maxFileMb: num(process.env.MAX_FILE_MB, 10),
  },
  // ---- App ------------------------------------------------------------------
  // Timezone used for "is this visit inside the caregiver's availability".
  appTimezone: process.env.APP_TIMEZONE || 'America/Toronto',
};
