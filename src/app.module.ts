import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRootAsync({
        imports:[ConfigModule],
        useFactory: async (configService : ConfigService) =>({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password:'admin',
          database: 'PEI',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          retryDelay: 3000,
          retryAttempts:10
        }),
      inject: [ConfigService]
    }),TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
