import { Module, Global } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ConfigService } from "../config/config.service.js";
import { TypeOrmModule } from "@nestjs/typeorm";

@Global()
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.dbHost,
        port: configService.dbPort,
        username: configService.dbUser,
        password: configService.dbPassword,
        database: configService.dbName,
        entities: [], // add all your entities
        synchronize: false,
        migrations: ["src/common/database/migrations/*.js"],
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
