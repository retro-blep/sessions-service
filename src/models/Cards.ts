import { Column, Entity, ObjectIdColumn, ObjectId } from "typeorm";

@Entity()
export class Cards {
    @ObjectIdColumn()
    public _id?: ObjectId | string;

    @Column()
    public hidden?: Boolean;

    @Column()
    public content?: string;

    @Column()
    public createdAt?: Date;

    @Column()
    public updatedAt?: Date;

    @Column()
    public cardId?: string;

    @Column()
    public columnId?: string;

    @Column()
    public sessionId?: string;

    // i'm not sure what the votes are for, i saw them used in some other retro type tools-- could be useful 
    @Column()
    public votes?: number;
}