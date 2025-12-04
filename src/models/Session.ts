import { Column, Entity, ObjectIdColumn, ObjectId } from "typeorm";
import { SessionSettings } from "./SessionSettings";
import { Columns } from "./Columns";
import { Participants } from "./Participants";

@Entity()
export class Session {
  @ObjectIdColumn()
  public _id?: ObjectId | string;

  @Column()
  public id?: string;

  @Column()
  public roomCode?: string;

  @Column()
  public subName?: string;

  // locked? active? archived?
  @Column()
  public status?: string;

  @Column()
  public columns?: Columns[];

  @Column()
  public settings?: SessionSettings;

  @Column()
  public name?: string;

  @Column()
  public createdAt?: Date;

  @Column()
  public updatedAt?: Date;

  @Column()
  public archivedAt?: Date;

  @Column()
  public lockedAt?: Date;

  @Column()
  public participants?: Participants[];
}