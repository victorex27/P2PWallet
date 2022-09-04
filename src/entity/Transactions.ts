import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { User } from './User'
import CHANNEL from '../utilities/channel'
import STATUS from '../utilities/status'

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn()
    user: User

    @Column()
    authorizationUrl: string

    @Column()
    paystackId: string

    @Column()
    accessCode: string

    @Column()
    referenceId: string

    @Column('double precision')
    amount: number

    @Column('text')
    status: STATUS

    @Column('text')
    channel: CHANNEL

    @Column('double precision')
    currency: string

    @Column('double precision')
    fees: string

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn()
    recipient: User
}
