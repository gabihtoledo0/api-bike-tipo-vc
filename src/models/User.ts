import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export default class Station {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ length: 100 })
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
  @Column()
  dateCard: string;
}
