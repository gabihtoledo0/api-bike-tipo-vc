import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import User from "./User";

@Entity("travels")
export default class Travel {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  id_user: string;
  @Column()
  id_initial_station: string;
  @Column({ nullable: true })
  id_finished_station: string;
  @Column()
  name_station: string;
  @Column()
  initial_date: string;
  @Column()
  initial_time: string;
  @Column({ nullable: true })
  finish_date: number;
  @Column({ nullable: true, default: null  })
  finish_time: string;
  @OneToOne((type) => User)
  @JoinColumn({ name: "id_user" })
  user: User;
}
