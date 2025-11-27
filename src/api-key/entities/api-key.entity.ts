import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToOne(() => User, user => user.apiKey)
    user: User;
}