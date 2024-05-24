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
import { Planet } from './Planet';

@Table({ tableName: 'Galaxy', timestamps: false })
export class Galaxy extends Model<Galaxy> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ primaryKey: true, type: DataType.UUIDV4 })
  @Index({ name: 'PK__Galaxy__3213E83F83FD0DE9', unique: true })
  id!: string;

  @Column({ type: DataType.STRING(100) })
  name!: string;

  @HasMany(() => Planet)
  Planet?: Planet[];
}
