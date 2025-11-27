import { ApiKey } from "src/api-key/entities/api-key.entity";
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn, OneToOne } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @OneToOne(() => ApiKey, apiKey => apiKey.user, { cascade: true })
    @JoinColumn()
    apiKey: ApiKey;
}