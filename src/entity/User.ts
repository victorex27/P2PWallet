import { IsAlpha, IsAlphanumeric, IsEmail, MinLength } from 'class-validator'
import {
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
    UpdateDateColumn
} from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    @MinLength(3)
    username: string

    @Column()
    @IsAlpha()
    firstName: string

    @Column()
    @IsAlpha()
    lastName: string

    @Column({ unique: true })
    @IsEmail()
    email: string

    @Column()
    @IsAlphanumeric()
    password: string

    @Column({ type: 'double precision', default: 0, nullable: true })
    balance: number

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
}
