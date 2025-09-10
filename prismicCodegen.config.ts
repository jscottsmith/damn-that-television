import type { Config } from 'prismic-ts-codegen';

const config: Config = {
  output: './types.generated.ts',
  repositoryName: 'damn-that-television',
  // You can also specify a custom types path if you have local models
  // models: ["./customtypes/**/index.json", "./slices/**/model.json"],
};

export default config;
