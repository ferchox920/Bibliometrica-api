import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configureService = app.get(ConfigService)
  console.log(configureService.get('DB_NAME'))
  console.log(configureService.get('DB_PORT'))
  console.log(configureService.get('DB_USER'))
  console.log(configureService.get('DB_PASSWORD'))
  await app.listen(3000);
}
bootstrap();
