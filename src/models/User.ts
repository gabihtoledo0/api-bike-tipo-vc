import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity("users")
export default class Station {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  name: string;
  @Column()
  phone: number;
  @Column()
  email: string;
  @Column()
  senha: string;
  @Column()
  numberCard: number;
  @Column()
  nameCard: string;
  @CreateDateColumn()
  dateCard: Date;
}
