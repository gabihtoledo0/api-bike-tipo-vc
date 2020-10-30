import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("stations")
export default class Station {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  name: string;
  @Column()
  latitude: number;
  @Column()
  longitude: number;
  @Column()
  bikeAvailable: number;
  @Column()
  bikeUnavailable: number;
  @Column()
  code: number;
}
