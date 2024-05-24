import { Provider } from '@nestjs/common';

import { Dialect } from 'sequelize';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

import { Galaxy, Planet, Continent, Country, State, City } from './persistence';

export class ORMConfig {
  public static sequelizeModuleOptions(): SequelizeModuleOptions {
    const configService: ConfigService = new ConfigService();
    return {
      dialect: configService.get<string>('database_dialect') as Dialect,
      host: configService.get<string>('database_host'),
      port: configService.get<number>('database_port'),
      username: configService.get<string>('database_username'),
      password: configService.get<string>('database_password'),
      database: configService.get<string>('database_database_name'),
      synchronize: configService.get<boolean>('database_synchronize'),
      autoLoadModels: configService.get<boolean>('database_autoLoadModels'),
      models: [Galaxy, Planet, Continent, Country, State, City],
    };
  }

  public static sequelizeProvider(): Provider {
    return {
      provide: 'SEQUELIZE',
      useValue: new Sequelize(ORMConfig.sequelizeModuleOptions()),
    };
  }
}
