import { Curso } from "src/curso/entities/curso.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Estudiante {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 9 })
    carnet: string;

    @Column()
    nombre: string;

    @Column()
    carrera: string;

    @ManyToMany(() => Curso, curso => curso.estudiantes)
    cursos: Curso[];
}