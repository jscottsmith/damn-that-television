import type { Config } from 'prismic-ts-codegen';
import { config as dotenvConfig } from 'dotenv';

// Load environment variables from .env.local
dotenvConfig({ path: '.env.local' });

const config: Config = {
  output: './types/prismic-generated.ts',
  repositoryName: 'damn-that-television',
  customTypesAPIToken: process.env.PRISMIC_CUSTOM_TYPES_API_TOKEN,
  models: {
    fetchFromRepository: true,
  },
};

export default config;
