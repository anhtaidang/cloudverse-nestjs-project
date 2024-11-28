import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import cookieParser from 'cookie-parser';
import RateLimit from 'express-rate-limit';
import helmet from 'helmet';
import compression from 'compression';
import {
  BadRequestException,
  HttpException,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { environment } from './common/enrironment';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const env = environment();

  const logger = new Logger(bootstrap.name);

  app.enableCors({
    credentials: true,
    // all headers that client are allowed to use
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Content-Type',
      'X-Requested-With',
      'apollo-require-preflight',
    ],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  });
  app.use(cookieParser());
  app.use(express.json());
  app.useLogger(logger);

  if (env.isProduction) {
    app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    app.use(compression());
    app.use(helmet());

    app.use(
      RateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      }),
    );
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.reduce((accumulator, error) => {
          accumulator[error.property] = Object.values(error.constraints).join(
            ', ',
          );
          return accumulator;
        }, {});

        throw new BadRequestException(formattedErrors);
      },
    }),
  );

  app.use((req: Request, res: Response, next) => {
    // logger.debug('===TRIGGER GLOBAL MIDDLEWARE===');
    next();
  });

  await app.listen(3000, () => {
    // Logger.log(`Server is running at ${siteUrl}graphql`);
    Logger.log(`Server is running at localhost:${3000} graphql`);
  });
}
bootstrap();
