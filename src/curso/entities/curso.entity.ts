import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Proffesor } from "src/proffesor/entities/proffesor.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Curso {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 8 })
    codigo: string;

    @Column()
    nombre: string;

    @Column()
    creditos: number;

    @ManyToOne(() => Proffesor, proffesor => proffesor.cursos)
    proffesor: Proffesor;

    @ManyToMany(() => Estudiante, estudiante => estudiante.cursos)
    @JoinTable()
    estudiantes: Estudiante[];
}