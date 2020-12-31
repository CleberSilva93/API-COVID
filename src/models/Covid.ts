// import { uuid } from "uuidv4";
import { Column, Entity, ObjectIdColumn, ObjectID } from "typeorm";

// @PrimaryGeneratedColumn("uuid")
// id: string;

@Entity("dbcovid")
class Covid {
    @ObjectIdColumn()
    public id: ObjectID;

    @Column()
    obitos: string;

    @Column()
    positivados: string;

    @Column()
    tratamento: string;

    @Column()
    suspeitos: string;

    @Column()
    recuperados: string;

    @Column()
    descartados: string;

    @Column("timestamp")
    date: Date;
}

export default Covid;
