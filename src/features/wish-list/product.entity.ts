import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({ default: false })
  checked: boolean;

  @Column()
  imageUrl: string;

  @Column('text', { nullable: true })
  checkedBy?: string | null;

  @Column('timestamp', { nullable: true })
  checkedAt?: Date | null;
}
