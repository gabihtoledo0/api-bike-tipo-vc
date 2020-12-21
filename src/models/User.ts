import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export default class Station {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ length: 100 })
  name: string;
  @Column()
  phone: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  numberCard: number;
  @Column()
  nameCard: string;
  @Column()
  expiry: string;
}
