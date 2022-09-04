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
export class FundTransfer {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn()
    user: User


    @Column('double precision')
    amount: number

    @Column('text')
    status: STATUS

    @Column({ type: 'text', default: CHANNEL.WALLET})
    channel: CHANNEL

    @Column({nullable: true, default:'NGN'})
    currency: string

    @Column({nullable: true, default:'0', type:'double precision'})
    fees: string

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn()
    recipient: User
}
