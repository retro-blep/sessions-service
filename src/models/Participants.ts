import { Column, Entity, ObjectIdColumn, ObjectId, BeforeInsert } from "typeorm";
import { SessionSettings } from "./SessionSettings";

@Entity()
export class Participants {
    @ObjectIdColumn()
    public _id?: ObjectId | string;

    @Column()
    public id?: string;

    @Column()
    public role?: string;

    @Column()
    public displayName?: string;

    // most likely auto generated, unless i decide to allow user registration, which is silly and inlikely, not needed on a retro type tool 
    @Column()
    public userId?: string;

    // will be used for some user admin stuff like banning abusers while not storing any identifying info.
    @Column()
    public ipHash?: string;

    @Column()
    public joinedAt?: Date;

    @Column()
    public leftSession?: Boolean

    // Room code would be easier to use here, for now at least. 
    @Column()
    public sessionsParticipatedIn?: string[];

    @Column()
    public banned?: Boolean;

    @Column()
    public defaultSessionSettings?: SessionSettings; // How viable is this though, if these guys are non-account users..

}