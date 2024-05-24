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
import { Continent } from './Continent';
import { Galaxy } from './Galaxy';

@Table({ tableName: 'Planet', timestamps: false })
export class Planet extends Model<Planet> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ primaryKey: true, type: DataType.UUIDV4 })
  @Index({ name: 'PK__Planet__3213E83FD8906AC0', unique: true })
  id!: string;

  @Column({ type: DataType.STRING(100) })
  name!: string;

  @ForeignKey(() => Galaxy)
  @Column({ type: DataType.STRING() })
  GalaxyId!: string;

  @HasMany(() => Continent)
  Continent?: Continent[];

  @BelongsTo(() => Galaxy)
  galaxy?: Galaxy;
}
