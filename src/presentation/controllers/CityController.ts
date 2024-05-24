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
import { City } from '../../infrastructure/persistence';

@Controller('City')
export class CityController {
  @Get('count')
  public async count(): Promise<object> {
    const quantity: number = await City.count();
    return { totalItems: quantity };
  }

  @Get()
  public async getAll(): Promise<City[]> {
    return await City.findAll({ raw: true });
  }

  @Get('Pagination')
  public async getAllPaginated(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ): Promise<City[]> {
    return await City.findAll({
      raw: true,
      offset: (parseInt(page, 10) - 1) * parseInt(pageSize, 10),
      limit: parseInt(pageSize, 10),
    });
  }

  @Get(':id')
  public async getById(@Param('id') id: string): Promise<City> {
    return await City.findByPk(id, { raw: true });
  }

  @Post()
  public async create(@Body() data: any): Promise<City> {
    return await City.create(data);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() data: any,
  ): Promise<object> {
    await City.update(data, { where: { id } });
    return { message: 'Entity City updated successfully', rowId: id };
  }

  @Patch(':id')
  public async partialUpdate(
    @Param('id') id: string,
    @Body() data: any,
  ): Promise<object> {
    await City.update(data, { where: { id } });
    return { message: 'Entity City updated partial successfully', rowId: id };
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<object> {
    await City.destroy({ where: { id } });
    return { message: 'Deleted successfully at City', rowId: id };
  }
}
