import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ApiKey {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    key: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: 20 })
    attempts: number;
}