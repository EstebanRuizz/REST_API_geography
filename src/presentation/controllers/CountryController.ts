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
import { Country } from '../../infrastructure/persistence';

@Controller('Country')
export class CountryController {
  @Get('count')
  public async count(): Promise<object> {
    const quantity: number = await Country.count();
    return { totalItems: quantity };
  }

  @Get()
  public async getAll(): Promise<Country[]> {
    return await Country.findAll({ raw: true });
  }

  @Get('Pagination')
  public async getAllPaginated(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ): Promise<Country[]> {
    return await Country.findAll({
      raw: true,
      offset: (parseInt(page, 10) - 1) * parseInt(pageSize, 10),
      limit: parseInt(pageSize, 10),
    });
  }

  @Get(':id')
  public async getById(@Param('id') id: string): Promise<Country> {
    return await Country.findByPk(id, { raw: true });
  }

  @Post()
  public async create(@Body() data: any): Promise<Country> {
    return await Country.create(data);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() data: any,
  ): Promise<object> {
    await Country.update(data, { where: { id } });
    return { message: 'Entity Country updated successfully', rowId: id };
  }

  @Patch(':id')
  public async partialUpdate(
    @Param('id') id: string,
    @Body() data: any,
  ): Promise<object> {
    await Country.update(data, { where: { id } });
    return {
      message: 'Entity Country updated partial successfully',
      rowId: id,
    };
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<object> {
    await Country.destroy({ where: { id } });
    return { message: 'Deleted successfully at Country', rowId: id };
  }
}
