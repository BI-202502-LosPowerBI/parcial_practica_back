import { Proffesor } from "src/proffesor/entities/proffesor.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Oficina {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    edificio: string;

    @Column()
    piso: number;

    @Column({ unique: true, length: 3 })
    numero: string;

    @OneToOne(() => Proffesor, proffesor => proffesor.oficina)
    @JoinColumn()
    proffesor?: Proffesor | null;
}