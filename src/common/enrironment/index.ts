import dotenv from 'dotenv';
import { join } from 'path';
import { IEnvironment } from './environment.interface';

export const environment = () => {

  if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: `${process.cwd()}/.env.production` });
  } else {
    dotenv.config();
  }

  return {
    siteUrl: process.env.SITE_URL,
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',

    // Graphql
    graphql: {
      playground: process.env.GRAPHQL_PLAYGROUND.toLowerCase() === 'true',
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      uploads: {
        maxFileSize: 20_000_000, // 20 MB
        maxFiles: 5
      },
      tracing: false
    },
  } as IEnvironment;
};
