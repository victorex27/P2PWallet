import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({ type: 'double precision', default: 0, nullable: true })
    balance: number
}
