import {
  Model,
  Index,
  Table,
  Column,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';
import { City } from './City';
import { Country } from './Country';

@Table({ tableName: 'State', timestamps: false })
export class State extends Model<State> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ primaryKey: true, type: DataType.UUIDV4 })
  @Index({ name: 'PK__State__3213E83F2124AB8F', unique: true })
  id!: string;

  @Column({ type: DataType.STRING(100) })
  name!: string;

  @ForeignKey(() => Country)
  @Column({ type: DataType.STRING() })
  CountryId!: string;

  @HasMany(() => City)
  City?: City[];

  @BelongsTo(() => Country)
  country?: Country;
}
