import { Column, Entity, ObjectIdColumn, ObjectId, BeforeInsert } from "typeorm";

@Entity()
export class SessionSettings {
    @ObjectIdColumn()
    public _id?: ObjectId | string;
    
    @Column() // To attach the settings to a session? 
    public sessionId?: string;

    @Column({ default: '0' })
    public durationMinutes?: string;
    

    // Do we even need a maxParticipants field? 
    @Column({ default: '10'})
    public maxParticipants?: number;

    @Column({ default: false })
    public isPasswordProtected?: boolean;

    // need to figure out a nicer way to handle passwords securely later
    // something that is more hands off for the user, but still secure
    @Column({ default: null })
    public psswd?: any;

    @Column({ default: true }) 
    public votingEnabled?: boolean;


    @Column()
    public lockedAt?: Date;
}

