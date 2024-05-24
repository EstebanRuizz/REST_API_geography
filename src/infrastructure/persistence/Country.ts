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
import { State } from './State';
import { Continent } from './Continent';

@Table({ tableName: 'Country', timestamps: false })
export class Country extends Model<Country> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ primaryKey: true, type: DataType.UUIDV4 })
  @Index({ name: 'PK__Country__3213E83F88AA39CA', unique: true })
  id!: string;

  @Column({ type: DataType.STRING(100) })
  name!: string;

  @ForeignKey(() => Continent)
  @Column({ type: DataType.STRING() })
  ContinentId!: string;

  @HasMany(() => State)
  State?: State[];

  @BelongsTo(() => Continent)
  continent?: Continent;
}
