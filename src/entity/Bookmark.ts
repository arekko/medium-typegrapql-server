import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

@ObjectType()
@Entity("bookmarks")
export class Bookmark extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  bid: number;

  @Field(() => ID)
  userId: number;

  @Field(() => ID)
  articleId: number;

  @Field()
  @CreateDateColumn()
  creation_date: Date;
}
