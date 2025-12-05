import { Column, Entity, ObjectIdColumn, ObjectId } from "typeorm";
import { SessionSettings } from "./SessionSettings";
import { Columns } from "./Columns";
import { Participants } from "./Participants";

@Entity()
export class Session {
 @ObjectIdColumn()
  public _id?: ObjectId;

  @Column()
  public id!: string;           // UUID used in APIs

  @Column({ nullable: true })
  public roomCode?: string;     // Could be used in a URL to rejoin? Or shared

  @Column({ nullable: true })
  public subName?: string;      // This could be descriptons, Sprint Goals, whatever. It's just a subheading to the session title

  @Column({ nullable: true })
  public status?: string;       // Locked? Active? Archived? 

  @Column({ nullable: true })
  public columns?: Columns[];   // Default 3-4, "What went well", "What didn't go well", "Action items", and "Appreciations"

  @Column({ nullable: true })
  public settings?: SessionSettings;

  @Column()
  public name?: string;          // Session title, ie. "Team Bravo, Sprint #69"

@Column({ update: false })
  public createdAt!: Date;

  @Column()
  public updatedAt!: Date;

  @Column({ nullable: true })
  public archivedAt?: Date;

  @Column({ nullable: true })
  public lockedAt?: Date;

  @Column({ default: [] })
  public participants?: Participants[];
}