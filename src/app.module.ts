import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ServiceModule } from './service/service.module';
import { Service } from './service/entities/service.entity';
import { OrganizationModule } from './organization/organization.module';
import { Organization } from './organization/entities/organization.entity';

@Module({
  imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRootAsync({
        imports:[ConfigModule],
        useFactory: async (configService : ConfigService) =>({
          type: 'postgres',
          host: 'localhost',
          port: configService.get<number>('DB_PORT'),
          username:  configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database:  configService.get<string>('DB_NAME'),
          // entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
          entities: [User, Service, Organization],
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
    UserModule,
    AuthModule,
    ServiceModule,
    OrganizationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
