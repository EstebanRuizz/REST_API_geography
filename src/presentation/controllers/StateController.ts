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
import { State } from '../../infrastructure/persistence';

@Controller('State')
export class StateController {
  @Get('count')
  public async count(): Promise<object> {
    const quantity: number = await State.count();
    return { totalItems: quantity };
  }

  @Get()
  public async getAll(): Promise<State[]> {
    return await State.findAll({ raw: true });
  }

  @Get('Pagination')
  public async getAllPaginated(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ): Promise<State[]> {
    return await State.findAll({
      raw: true,
      offset: (parseInt(page, 10) - 1) * parseInt(pageSize, 10),
      limit: parseInt(pageSize, 10),
    });
  }

  @Get(':id')
  public async getById(@Param('id') id: string): Promise<State> {
    return await State.findByPk(id, { raw: true });
  }

  @Post()
  public async create(@Body() data: any): Promise<State> {
    return await State.create(data);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() data: any,
  ): Promise<object> {
    await State.update(data, { where: { id } });
    return { message: 'Entity State updated successfully', rowId: id };
  }

  @Patch(':id')
  public async partialUpdate(
    @Param('id') id: string,
    @Body() data: any,
  ): Promise<object> {
    await State.update(data, { where: { id } });
    return { message: 'Entity State updated partial successfully', rowId: id };
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<object> {
    await State.destroy({ where: { id } });
    return { message: 'Deleted successfully at State', rowId: id };
  }
}
