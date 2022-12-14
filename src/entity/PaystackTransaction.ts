import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'
import { User } from './User'
import CHANNEL from '../utilities/channel'
import STATUS from '../utilities/status'

@Entity()
export class PaystackTransaction {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn()
    user: User

    @Column({ nullable: true })
    authorizationUrl: string

    @Column({ nullable: true })
    paystackId: string

    @Column({ nullable: true })
    accessCode: string

    @Column({ nullable: true })
    referenceId: string

    @Column('double precision')
    amount: number

    @Column('text')
    status: STATUS

    @Column({ type: 'text', nullable: true })
    channel: CHANNEL

    @Column({ nullable: true, default: 'NGN' })
    currency: string

    @Column({ nullable: true, default: '0', type: 'double precision' })
    fees: string

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    public created_at: Date

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    public updated_at: Date
}
