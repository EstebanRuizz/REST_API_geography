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

@Table({ tableName: 'City', timestamps: false })
export class City extends Model<City> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ primaryKey: true, type: DataType.UUIDV4 })
  @Index({ name: 'PK__City__3213E83F09A16722', unique: true })
  id!: string;

  @Column({ type: DataType.STRING(100) })
  name!: string;

  @ForeignKey(() => State)
  @Column({ type: DataType.STRING() })
  StateId!: string;

  @BelongsTo(() => State)
  state?: State;
}
