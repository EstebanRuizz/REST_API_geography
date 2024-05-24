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
import { Continent } from '../../infrastructure/persistence';

@Controller('Continent')
export class ContinentController {
  @Get('count')
  public async count(): Promise<object> {
    const quantity: number = await Continent.count();
    return { totalItems: quantity };
  }

  @Get()
  public async getAll(): Promise<Continent[]> {
    return await Continent.findAll({ raw: true });
  }

  @Get('Pagination')
  public async getAllPaginated(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ): Promise<Continent[]> {
    return await Continent.findAll({
      raw: true,
      offset: (parseInt(page, 10) - 1) * parseInt(pageSize, 10),
      limit: parseInt(pageSize, 10),
    });
  }

  @Get(':id')
  public async getById(@Param('id') id: string): Promise<Continent> {
    return await Continent.findByPk(id, { raw: true });
  }

  @Post()
  public async create(@Body() data: any): Promise<Continent> {
    return await Continent.create(data);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() data: any,
  ): Promise<object> {
    await Continent.update(data, { where: { id } });
    return { message: 'Entity Continent updated successfully', rowId: id };
  }

  @Patch(':id')
  public async partialUpdate(
    @Param('id') id: string,
    @Body() data: any,
  ): Promise<object> {
    await Continent.update(data, { where: { id } });
    return {
      message: 'Entity Continent updated partial successfully',
      rowId: id,
    };
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<object> {
    await Continent.destroy({ where: { id } });
    return { message: 'Deleted successfully at Continent', rowId: id };
  }
}
