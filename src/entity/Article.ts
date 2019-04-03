import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity("articles")
export class Article extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column("text")
  text: string;

  @Field()
  @CreateDateColumn()
  creation_date: Date;

  @Field()
  @Column("text")
  picture_url: string;

  @Column() user_id: string;

  @ManyToOne(() => User, user => user.articles)
  user: User;

  @Column("text", { array: true })
  tags: string[];

  @Field()
  owner: User;
}
