import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { Planet } from '../../infrastructure/persistence';

@Controller('Planet')
export class PlanetController {
  @Get('count')
  public async count(): Promise<object> {
    const quantity: number = await Planet.count();
    return { totalItems: quantity };
  }

  @Get()
  public async getAll(): Promise<Planet[]> {
    return await Planet.findAll({ raw: true });
  }

  @Get('Pagination')
  public async getAllPaginated(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ): Promise<Planet[]> {
    return await Planet.findAll({
      raw: true,
      offset: (parseInt(page, 10) - 1) * parseInt(pageSize, 10),
      limit: parseInt(pageSize, 10),
    });
  }

  @Get(':id')
  public async getById(@Param('id') id: string): Promise<Planet> {
    return await Planet.findByPk(id, { raw: true });
  }

  @Post()
  public async create(@Body() data: any): Promise<Planet> {
    return await Planet.create(data);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() data: any,
  ): Promise<object> {
    await Planet.update(data, { where: { id } });
    return { message: 'Entity Planet updated successfully', rowId: id };
  }

  @Patch(':id')
  public async partialUpdate(
    @Param('id') id: string,
    @Body() data: any,
  ): Promise<object> {
    await Planet.update(data, { where: { id } });
    return { message: 'Entity Planet updated partial successfully', rowId: id };
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<object> {
    await Planet.destroy({ where: { id } });
    return { message: 'Deleted successfully at Planet', rowId: id };
  }
}
