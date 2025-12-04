import { Column, Entity, ObjectIdColumn, ObjectId, BeforeInsert } from "typeorm";

@Entity()
export class SessionSettings {
    @ObjectIdColumn()
    public _id?: ObjectId | string;
    
    @Column()
    durationMinutes?: string;

    // Do we even need a maxParticipants field? 
    @Column()
    maxParticipants?: number;

    @Column()
    isPasswordProtected?: boolean;

    // need to figure out a nicer way to handle passwords securely later
    // something that is more hands off for the user, but still secure
    @Column()
    psswd?: any;

   @Column()
   votingEnabled?: boolean;

        
    @Column()
    lockedAt?: Date;

    @Column()
    public sessionId?: string;


}

