import { Column, Entity, ObjectIdColumn, ObjectId } from "typeorm";

@Entity()
export class Columns {
    @ObjectIdColumn()
    public _id?: ObjectId | string;

    @Column()
    public name?: string;

    // column id to link cards to  !
    @Column()
    public columnId?: string;

    // a bunch of these properties would probably be used to maintain a frontend state, like color and column position
    @Column()
    public position?: number;

    @Column()
    public color?: string;

    @Column()
    public isHidden?: boolean;

    // in case it's useful to link cards to specific sessions later?
    @Column()
    public sessionId?: string;
}