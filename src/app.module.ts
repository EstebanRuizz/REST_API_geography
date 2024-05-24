import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ORMConfig } from './infrastructure/ORMConfig';
import { HttpControllerModule } from './presentation/http-controller.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpControllerModule,
    SequelizeModule.forRoot(ORMConfig.sequelizeModuleOptions()),
  ],
  providers: [ORMConfig.sequelizeProvider()],
})
export class AppModule {}
