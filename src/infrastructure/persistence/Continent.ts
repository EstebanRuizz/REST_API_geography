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
import { Country } from './Country';
import { Planet } from './Planet';

@Table({ tableName: 'Continent', timestamps: false })
export class Continent extends Model<Continent> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ primaryKey: true, type: DataType.UUIDV4 })
  @Index({ name: 'PK__Continen__3213E83FA17DC417', unique: true })
  id!: string;

  @Column({ type: DataType.STRING(100) })
  name!: string;

  @ForeignKey(() => Planet)
  @Column({ type: DataType.STRING() })
  PlanetId!: string;

  @HasMany(() => Country)
  Country?: Country[];

  @BelongsTo(() => Planet)
  planet?: Planet;
}
