import { Curso } from "src/curso/entities/curso.entity";
import { Oficina } from "src/oficina/entities/oficina.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Proffesor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 9 })
    carnet: string;

    @Column()
    nombre: string;

    @Column()
    departamento: string;

    @OneToOne(() => Oficina, oficina => oficina.proffesor)
    oficina: Oficina;

    @OneToMany(() => Curso, curso => curso.proffesor)
    cursos: Curso[];
}