
      import { Module } from '@nestjs/common';
      import { CityController } from './controllers/CityController';import { ContinentController } from './controllers/ContinentController';import { CountryController } from './controllers/CountryController';import { GalaxyController } from './controllers/GalaxyController';import { PlanetController } from './controllers/PlanetController';import { StateController } from './controllers/StateController';

      @Module({
          controllers: [CityController,ContinentController,CountryController,GalaxyController,PlanetController,StateController],
      })
      export class HttpControllerModule {}
    