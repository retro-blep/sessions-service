import { Column, Entity, ObjectIdColumn, ObjectId } from "typeorm";
import { SessionSettings } from "./SessionSettings";
import { Columns } from "./Columns";
import { Participants } from "./Participants";

@Entity()
export class Session {
 @ObjectIdColumn()
  public _id?: ObjectId;

  @Column()
  public id!: string; // UUID used in APIs

  @Column({ nullable: true })
  public roomCode?: string;

  @Column({ nullable: true })
  public subName?: string;

  @Column({ nullable: true })
  public status?: string;

  @Column({ nullable: true })
  public columns?: Columns[];

  @Column({ nullable: true })
  public settings?: SessionSettings;

  @Column()
  public name!: string;

  @Column()
  public createdAt!: Date;

  @Column()
  public updatedAt!: Date;

  @Column({ nullable: true })
  public archivedAt?: Date;

  @Column({ nullable: true })
  public lockedAt?: Date;

  @Column({ nullable: true })
  public participants?: Participants[];
}