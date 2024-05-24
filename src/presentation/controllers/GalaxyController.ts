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
import { Galaxy } from '../../infrastructure/persistence';

@Controller('Galaxy')
export class GalaxyController {
  @Get('count')
  public async count(): Promise<object> {
    const quantity: number = await Galaxy.count();
    return { totalItems: quantity };
  }

  @Get()
  public async getAll(): Promise<Galaxy[]> {
    return await Galaxy.findAll({ raw: true });
  }

  @Get('Pagination')
  public async getAllPaginated(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ): Promise<Galaxy[]> {
    return await Galaxy.findAll({
      raw: true,
      offset: (parseInt(page, 10) - 1) * parseInt(pageSize, 10),
      limit: parseInt(pageSize, 10),
    });
  }

  @Get(':id')
  public async getById(@Param('id') id: string): Promise<Galaxy> {
    return await Galaxy.findByPk(id, { raw: true });
  }

  @Post()
  public async create(@Body() data: any): Promise<Galaxy> {
    return await Galaxy.create(data);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() data: any,
  ): Promise<object> {
    await Galaxy.update(data, { where: { id } });
    return { message: 'Entity Galaxy updated successfully', rowId: id };
  }

  @Patch(':id')
  public async partialUpdate(
    @Param('id') id: string,
    @Body() data: any,
  ): Promise<object> {
    await Galaxy.update(data, { where: { id } });
    return { message: 'Entity Galaxy updated partial successfully', rowId: id };
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<object> {
    await Galaxy.destroy({ where: { id } });
    return { message: 'Deleted successfully at Galaxy', rowId: id };
  }
}
