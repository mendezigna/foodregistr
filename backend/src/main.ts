import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
// eslint-disable-next-line no-duplicate-imports
import { ServiceAccount } from 'firebase-admin';
import * as serviceAccount from '../foodregistr-96935-firebase-adminsdk-y8qx8-dce917d883.json';
async function bootstrap() {
  admin.initializeApp({
    credential:  admin.credential.cert(<ServiceAccount>serviceAccount),
    databaseURL: 'https://foodregistr-96935.firebaseio.com'
  });
  
  const app = await NestFactory.create(AppModule);
  await app.enableCors();
  await app.listen(8080);
}
bootstrap();
