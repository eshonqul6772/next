const ENV = process.env as Record<string, string | undefined>;

const API_BASE_URL = ENV.NEXT_PUBLIC_API_BASE_URL || ENV.VITE_API_BASE_URL || '';
const APP_ENV = ENV.NEXT_PUBLIC_APP_ENV || ENV.VITE_APP_ENV || 'development';
const APP_DEBUG = (ENV.NEXT_PUBLIC_APP_DEBUG || ENV.VITE_APP_DEBUG) === 'true';
const LOG_LEVEL = ENV.NEXT_PUBLIC_APP_LOG_LEVEL || ENV.VITE_APP_LOG_LEVEL || 'info';

const DEFAULT_PER_PAGE = 5;
const PAGE_SIZE_5 = 5;
const PAGE_SIZE_10 = 10;
const PAGE_SIZE_20 = 20;
const PAGE_SIZE_50 = 50;
const DEFAULT_PAGE_SIZES = [PAGE_SIZE_5, PAGE_SIZE_10, PAGE_SIZE_20, PAGE_SIZE_50] as const;

const config = {
  app: {
    env: APP_ENV,
    isDev: APP_ENV === 'local' || APP_ENV === 'development',
    isProd: APP_ENV === 'production',
    debug: APP_DEBUG,
    logLevel: LOG_LEVEL,
    version: '1.0.0'
  },
  api: {
    baseUrl: API_BASE_URL
  },
  language: {
    key: 'language',
    initial: 'uz',
    list: ['uz', 'ru', 'en']
  },
  list: {
    perPage: DEFAULT_PER_PAGE,
    pageSize: DEFAULT_PAGE_SIZES
  }
};

export default config;
