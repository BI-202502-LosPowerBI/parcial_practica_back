import { ApiKey } from "src/api-key/entities/api-key.entity";
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { OneToOne } from "typeorm/browser";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @OneToOne(() => ApiKey, apiKey => apiKey.user)
    @JoinColumn()
    apiKey: ApiKey;
}